export const sortBooks = (books, sortBy, sortDirection) => {
  const sortedBooks = books.sort((item1, item2) => {
    if (sortBy === "author.name") {
      if (item1.author.name < item2.author.name) {
        return sortDirection === "ASC" ? -1 : 1;
      }
      if (item1.author.name === item2.author.name) {
        return 0;
      }
      if (item1.author.name > item2.author.name) {
        return sortDirection === "ASC" ? 1 : -1;
      }
    }
    if (item1[sortBy] < item2[sortBy]) {
      return sortDirection === "ASC" ? -1 : 1;
    }
    if (item1[sortBy] === item2[sortBy]) {
      return 0;
    }
    if (item1[sortBy] > item2[sortBy]) {
      return sortDirection === "ASC" ? 1 : -1;
    }
    return sortedBooks;
  });
  postMessage({ sortedBooks });
};
