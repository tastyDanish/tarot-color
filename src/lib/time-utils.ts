export const getNextMidnight = (): Date => {
  const now = new Date();
  now.setHours(24, 0, 0, 0);
  return now;
};
