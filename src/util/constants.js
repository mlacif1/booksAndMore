export const AVAILABLE_LANGUAGES = ["en", "ro", "hu", "es"];
export const AVAILABLE_SORT_BY = {
  NONE: "none", // sorting depends on the data order from the server
  BOOK_NAME: "name",
  AUTHOR_NAME: "author.name",
};
export const AVAILABLE_FILTER_BY = {
  BOOK_GENRE: { dataType: "text", dataKey: "genre", dataLabel: "Book Genre" },
  // AUTHOR_GENDER: {
  //   dataType: "checkbox",
  //   dataKey: "author.gender",
  //   dataLabel: "Author Is Male?",
  // },
};
export const SORT_DIRECTIONS = {
  ASC: "ASC",
  DESC: "DESC",
};
