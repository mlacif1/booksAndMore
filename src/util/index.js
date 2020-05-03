export const lastFridayForMonth = (monthMoment) => {
  const lastDay = monthMoment.endOf('month').startOf('day');
  switch (lastDay.day()) {
    case 6:
      return lastDay.subtract(1, 'days');
    default:
      return lastDay.subtract(lastDay.day() + 2, 'days');
  }
};
