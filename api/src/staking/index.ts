import { config, logger } from '../utils';
import { activeEra, TotalNominations } from './overview';
import { nodeProvider, promiseWithTimeout } from '../utils';
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: config.sentryDns,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      root: global.__dirname,
    }),
  ],
});


const StakingApi = async () => {
  const eraState = await activeEra(nodeProvider);
  const totalNomState = await TotalNominations(nodeProvider, eraState?.stat.activeEra ? eraState?.stat.activeEra : 0);

  return [eraState, totalNomState] as const;
};

Promise.resolve()
  .then(async () => {
    await nodeProvider.initializeProviders();
  })
  .then(StakingApi)
  .then(async () => {
    await nodeProvider.closeProviders();
    logger.info('Finished');
    process.exit();
  })
  .catch(async (error) => {
    logger.error(error);
    Sentry.captureException(error);

    try {
      await promiseWithTimeout(nodeProvider.closeProviders(), 200, Error('Failed to close proivders!'));
    } catch (err) {
      Sentry.captureException(err);
    }

    logger.error('Finished');
    Sentry.close(2000).then(() => {
      process.exit(-1);
    });
  });
