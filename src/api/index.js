import axios from "axios";

const BOOKS = "data"; // this is the folder in the public folder where the books are

export const getBooks = () => {
  return axios.get(`${BOOKS}/data.json`, {
    crossdomain: true,
  });
};

// // Updat to use correct book addition endpoint
// export const addBooks = (book) => {
//   return axios.post(`${BOOKS}`, book, {
//     crossdomain: true,
//   });
// };

// // Same as above, the endpoint should be updated
// export const deleteBook = (bookId) => {
//   return axios.delete(`${BOOKS}/${bookId}`, {
//     crossdomain: true,
//   });
// };

// // If the endpoint exists, we can use it
// export const getBookById = (bookId) => {
//   return axios.get(`${BOOKS}/${bookId}`, {
//     crossdomain: true,
//   });
// };
