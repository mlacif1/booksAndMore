import { lastFridayForMonth } from "../../util";

const moment = require("moment");

export const filterBooks = (books, filterByArray) => {
  console.log('filtering', filterByArray);
  const filteredBooks = books.filter((book) => {
    let bookIsGood = true;
    for (let i=0; i<filterByArray.length; ++i) {
      const filterBy = filterByArray[i];
      if (filterBy.key === "genre") {
        if (filterBy.value !== "" && filterBy.value.toLowerCase().indexOf(book.genre.toLowerCase()) === -1) {
          bookIsGood = false;
          break;
        }
      }
      if (filterBy.key === "author.gender") {
        const isMale = book.author.gender === "male";
        if (filterBy.value !== isMale) {
          bookIsGood = false;
          break;
        }
      }
      if (filterBy.key === "date") {
        if (filterBy.value === "friday") {
          console.log(moment(book.date), lastFridayForMonth(book.date));
          if (moment(book.date).isSame(lastFridayForMonth(book.date))) {
            bookIsGood = false;
            break;
          }
        }
        if (filterBy.value === "halloween") {
          const b = moment(book.date);
          if (b.month() + 1 !== 10) {
            bookIsGood = false;
            break;
          }
          if (b.date() !== 31) {
            bookIsGood = false;
            break;
          }
        }
      }
    }

    return bookIsGood;
  });
  postMessage({ filteredBooks });
};
