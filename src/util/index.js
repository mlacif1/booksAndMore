export const lastFridayForMonth = (monthMoment) => {
  const lastDay = monthMoment.endOf('month').startOf('day');
  switch (lastDay.day()) {
    case 6:
      return lastDay.subtract(1, 'days');
    default:
      return lastDay.subtract(lastDay.day() + 2, 'days');
  }
};

// this method should be used once to create the graphql data
// this method is used to create a json file with the book entries
// like this:
// {
//   books: arrayOfBooks
// }
export const download = (content, fileName, contentType) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(content, null, 2)], {
    type: contentType
  }));
  a.setAttribute("download", fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
