import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import BN from 'bn.js';
import { config, logger, nodeProvider, NodeProviderType } from '../../../utils';
import { GetTotalNorminatorStaking, GetTotalNorminatorCount } from '../../support';


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

const nominatorsStat = async (nodeProvider: NodeProviderType, activeEra: BN | Number) => {
  try {
    let totalNominators = 0;

    const [totalNominatorsCount, exposures] = await Promise.all([
      nodeProvider.getProvider().api.query.staking.counterForNominators(),
      nodeProvider.getProvider().api.query.staking.erasStakers.entries(activeEra),
    ]);

    exposures.forEach(([_key, exposure]) => {
      const activeNominators = JSON.parse(exposure.toString());
      const totalNorminatorCount = GetTotalNorminatorCount(activeNominators);
      totalNominators = totalNominators + totalNorminatorCount;
    });

    const totalNominatorsState = {
      label: 'Total Nominators',
        stat: {
          totalActiveNominators: new BN(totalNominatorsCount.toString()),
          totaltotalNominatorsCount: new BN(totalNominators),
        },
      };
      return totalNominatorsState;
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};
  
export default nominatorsStat;