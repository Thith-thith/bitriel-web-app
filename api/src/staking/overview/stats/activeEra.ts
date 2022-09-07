import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger, NodeProviderType } from '../../../utils';
import { getEraTimeLeft } from '../../support';
import BN from 'bn.js';

/* eslint "no-underscore-dangle": "off" */
Sentry.init({
  dsn: config.sentryDns,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
     root: global.__dirname,
    }),
  ],
});

const activeEraState = async (nodeProvider: NodeProviderType) => {
  try {
    const session = await nodeProvider.getProvider().api.derive.session.progress();

    const eraTimeLeft = getEraTimeLeft(session.eraLength, session.eraProgress);
    const eraState = {
      label: 'Active Era',
        stat: {
          activeEra: new BN(session.activeEra.toString()),
          eraTimeLeft: eraTimeLeft,
        },
      };
    return eraState;
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};
  
export default activeEraState;
