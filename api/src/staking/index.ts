import { config, logger } from '../utils';
import { activeEraState, nominationsState, inflationState, accountState } from './overview';
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
  // const eraState = await activeEraState(nodeProvider);
  // const totalNomState = await nominationsState(nodeProvider, eraState?.stat.activeEra ? eraState?.stat.activeEra : 0);
  // const inflation = await inflationState(nodeProvider);
  // console.log(inflation?.idealInterest)

  await accountState(nodeProvider, "5DM7PJEFPbcYViEzFXu5GjF96JgoSJ3rb6jfXLsmXqrPVG2o")
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
