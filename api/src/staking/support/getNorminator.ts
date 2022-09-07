export const GetTotalNorminatorStaking = (nominators: any) => {
 for(let i = 0; i < nominators['others'].length; i++){
    const activeNominatorAccount = nominators['others'][i]['who'];
    const activeNominatorsStaking = nominators['others'][i]['value'];

    return [activeNominatorAccount, activeNominatorsStaking] as const;
 }
}

export const GetTotalNorminatorCount = (nominators: any) => {
  return nominators['others'].length
}
   
   