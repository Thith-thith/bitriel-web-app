import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger, NodeProviderType } from '../../utils';
import { getEraTimeLeft } from '../support';
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

const accountState = async (nodeProvider: NodeProviderType, address: string) => {
  try {
    const { data: { free, reserved, miscFrozen, feeFrozen } }  = await nodeProvider.getProvider().api.query.system.account(address);
    const existentialAmount = nodeProvider.getProvider().api.consts.balances.existentialDeposit;

    // amount of compulsary reserve balance
    const reserveFeeAmount = new BN(10).pow(new BN(config.networkDecimal)).div(new BN(4));

    // minimum reserve for submitting extrinsics
    const minReserve: BN = reserveFeeAmount.add(existentialAmount);

    let freeAfterReserve = new BN(free).sub(minReserve);
      freeAfterReserve = freeAfterReserve.lt(new BN(0))
        ? new BN(0)
        : freeAfterReserve;

    return {
      free,
      freeAfterReserve,
      reserved,
      miscFrozen,
      feeFrozen,   
      existentialAmount,
      reserveFeeAmount,
      minReserve
    }

  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};
  
export default accountState;
