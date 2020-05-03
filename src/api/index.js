import axios from "axios";

const BOOKS = "data"; // this is the folder in the public folder where the books are
const GRAPHQL_BASE = "http://localhost:3000/?";

export const getBooks = () => {
  return axios.get(`${BOOKS}/data.json`, {
    crossdomain: true,
  });
};

export const getBooksGraphql = (data) => {
  return axios.post(`${GRAPHQL_BASE}`, data, {
        crossdomain: true,
        header: {
          'Content-Type': 'application/json'
        }
      });
};

// // Update to use correct book addition endpoint
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
