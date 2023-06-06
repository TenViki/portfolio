export const formatNumber = (num: number): string => {
  // format number to 1 decimal place with the ending "k", "mil"

  if (num >= 10000000) {
    return (num / 1000000).toFixed(0) + "mil";
  }

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "mil";
  }
  if (num >= 10000) {
    return (num / 1000).toFixed(0) + "k";
  }

  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};
