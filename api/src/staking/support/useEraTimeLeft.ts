import { config } from '../../utils';

export const getEraTimeLeft = (eraLength: any, eraProgress: any) => {
  const eraBlocksLeft = eraLength - eraProgress;
  const eraTimeLeftSeconds = eraBlocksLeft * config.expectedBlockTime;
  return eraTimeLeftSeconds;
};