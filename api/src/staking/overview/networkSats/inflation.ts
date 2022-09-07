import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger, NodeProviderType } from '../../../utils';
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

const calculateInflation = (totalStaked: BN, totalIssuance: BN) => {
  const BN_MILLION = new BN('1000000');
  const stakedFraction = totalStaked.isZero() || totalIssuance.isZero()
      ? 0
      : totalStaked.mul(BN_MILLION).div(totalIssuance).toNumber() / BN_MILLION.toNumber();
  const idealStake = config.inflationConfig.stakeTarget;
  const idealInterest = config.inflationConfig.maxInflation / idealStake;
  const inflation = 100 *
      (config.inflationConfig.minInflation + (stakedFraction <= idealStake
        ? stakedFraction * (idealInterest - config.inflationConfig.minInflation / idealStake)
        : (idealInterest * idealStake - config.inflationConfig.minInflation) * 2 
        ** ((idealStake - stakedFraction) / config.inflationConfig.falloff)));
  
  return {
    idealInterest,
    idealStake,
    inflation,
    stakedFraction,
    stakedReturn: stakedFraction ? inflation / stakedFraction : 0,
  }
}


const inflationState = async (nodeProvider: NodeProviderType) => {
  try {
    const current_era = await nodeProvider.getProvider().api.query.staking.activeEra();

    const [lastTotalStake, totalIssuance] = await Promise.all([
        nodeProvider.getProvider().api.query.staking.erasTotalStake(JSON.parse(current_era.toString())['index'] - 1),
        nodeProvider.getProvider().api.query.balances.totalIssuance(),
    ])

    // total supply as percent
    let supplyStakedAsPercent = 0;
    if (totalIssuance.gt(new BN(0))) {
        supplyStakedAsPercent = lastTotalStake
        .div(totalIssuance.div(new BN(100)))
        .toNumber();
    }

    const {
      idealInterest,
      idealStake,
      inflation,
      stakedFraction,
      stakedReturn
    } = calculateInflation(lastTotalStake, totalIssuance);

    return {
      idealInterest,
      idealStake,
      inflation,
      stakedFraction,
      stakedReturn,
      supplyStakedAsPercent,
      totalIssuance
    }

  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};
    
export default inflationState;
  