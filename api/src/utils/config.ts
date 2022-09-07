import 'dotenv/config';

const toNumber = (defaultValue: number, value?: string): number => {
  if (!value) {
    return defaultValue;
  }
  return parseInt(value, 10);
};

const defaultNodeUrls = ['ws://127.0.0.1:9944'];

export default {
  nodeUrls: process.env.NODE_PROVIDER_URLS ? JSON.parse(process.env.NODE_PROVIDER_URLS) as string[] : defaultNodeUrls,
  sentryDns: process.env.SENTRY_DNS || '',
  expectedBlockTime:  toNumber(6000, process.env.EXPECTED_BLOCK_TIME),
  networkDecimal:  toNumber(12, process.env.NETWORK_DECIMAL),
  maxNominatorRewardedPerValidator: toNumber(256, process.env.MAX_NOMINATOR_REWARDED_PER_VALIDATOR),
  inflationConfig : {
    falloff: toNumber(0.05, process.env.FALLOFF),
    maxInflation: toNumber(0.025, process.env.MAX_INFLATION),
    minInflation: toNumber(0.0025, process.env.MIN_INFLATION),
    stakeTarget: toNumber(0.50, process.env.STAKE_TARGET),
  }
}
