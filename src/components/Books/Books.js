import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@material-ui/core";
import Navigation from "../Navigation/Navigation";
import { getBooks, getBooksGraphql } from "../../api";
import VirtualizedTable from "../VirtualizedTable/VirtualizedTable";
import { Column } from "react-virtualized";
import BookSkeleton from "../BookSkeleton/BookSkeleton";
import Paginator from "./Paginator";
import {
  AVAILABLE_SORT_BY,
  SORT_DIRECTIONS,
  AVAILABLE_FILTER_BY,
} from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/fontawesome-free-solid";
import sortWorker from "workerize-loader!./sortWorker"; // eslint-disable-line import/no-webpack-loader-syntax
import filterWorker from "workerize-loader!./filterWorker"; // eslint-disable-line import/no-webpack-loader-syntax
import { useSelector, useDispatch } from "react-redux";
import { setFilterBy } from "../../actions/bookAction";
import { lastFridayForMonth } from "../../util";
// this import is used to generate the graphql json
// import { download } from "../../util";

const moment = require("moment");

const Books = (props) => {
  const styles = useStyles();

  const [books, setBooks] = useState([]);
  const [booksToUse, setBooksToUse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [allPagesCount, setAllPagesCount] = useState(0);
  const [globalCurrentPage, setGlobalCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;
  const [scrollIndex, setScrollIndex] = useState(undefined);

  const [sortBy, setSortBy] = useState(AVAILABLE_SORT_BY.NONE);
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASC);

  const filterByArray = useSelector((state) => state.filterBy.filterBy);
  const dispatch = useDispatch();

  let sortWorkerInstance = null;
  const [filterWorkerInstance, setFilterWorkerInstance] = useState(null);

  useEffect(() => {
    setLoading(true);

    const request = {
      query: `
        query allBooks {
          allBooks(page: ${globalCurrentPage}, perPage: 1000) {
            name
            genre
            image
            date
            author
          },
          _allBooksMeta {
            count
          }
        }`,
    };
    getBooksGraphql(request)
      .then(({ data }) => {
        setBooks(data.data.allBooks);
        setBooksToUse(data.data.allBooks);
        setAllPagesCount(data.data._allBooksMeta.count);
        setLoading(false);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        }
        setLoading(false);
      });

    // Old way to load all the data
    // getBooks()
    //   .then(({ data }) => {
    //     console.log(data);
    //     setBooks(data);
    //     setBooksToUse(data);
    //     setLoading(false);
    //     // to generate the json file fro graphql, uncomment this
    //     // const jsonObject = {
    //     //   "books": data
    //     // };
    //     // download(jsonObject, 'books.json', 'application/json');
    //   })
    //   .catch((e) => {
    //     if (e.response) {
    //       console.log(e.response);
    //     }
    //     setLoading(false);
    //   });

    if (window.Worker) {
      sortWorkerInstance = sortWorker();
      sortWorkerInstance.addEventListener("message", (message) => {
        if (message.data.sortedBooks) {
          setBooksToUse(message.data.sortedBooks);
          setProcessing(false);
        }
      });

      const newfilterWorkerInstance = filterWorker();
      newfilterWorkerInstance.addEventListener("message", (message) => {
        console.log("filter finished", message.data);
        if (message.data.filteredBooks) {
          setBooksToUse(message.data.filteredBooks);
          setProcessing(false);
        }
      });
      setFilterWorkerInstance(newfilterWorkerInstance);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const request = {
      query: `
        query allBooks {
          allBooks(page: ${globalCurrentPage}, perPage: 1000) {
            name
            genre
            image
            date
            author
          }
        }`,
    };
    getBooksGraphql(request)
      .then(({ data }) => {
        setBooksToUse(data.data.allBooks);
        setLoading(false);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        }
        setLoading(false);
      });
  }, [globalCurrentPage]);

  const onRowsScroll = (props) => {
    const nextPage = Math.ceil(props.stopIndex / booksPerPage);
    setCurrentPage(nextPage);
    setScrollIndex(undefined);
  };

  const rowHeight = 100;
  const headerHeight = 40;
  const tableHeight = rowHeight * booksPerPage + headerHeight;

  const ImageCell = ({ cellData }) => (
    <Box
      className={styles.image}
      style={{ backgroundImage: `url(${cellData})` }}
    ></Box>
  );

  const DateCell = ({ cellData }) => (
    <Box>{moment(cellData).format("YYYY MMM DD")}</Box>
  );

  const AuthorCell = (props) => {
    return <Box>{props.rowData.author.name}</Box>;
  };

  const onPageChange = (pageNumber) => {
    const newScrollToIndex = (pageNumber - 1) * booksPerPage;
    setCurrentPage(pageNumber);
    setScrollIndex(newScrollToIndex);
  };

  const onGlobalPageChange = (pageNumber) => {
    setGlobalCurrentPage(pageNumber);
  };

  const onSort = (sortBy, sortDirection) => {
    if (Object.values(AVAILABLE_SORT_BY).indexOf(sortBy) > -1) {
      setProcessing(true);
      setSortBy(sortBy);
      setSortDirection(sortDirection);
      doSortBooks(sortBy, sortDirection);
    }
  };

  const doSortBooks = (sortBy, sortDirection) => {
    if (sortWorkerInstance) {
      sortWorkerInstance.sortBooks(books, sortBy, sortDirection);
    } else {
      const sortedBooks = books.sort((item1, item2) => {
        if (sortBy === AVAILABLE_SORT_BY.AUTHOR_NAME) {
          if (item1.author.name < item2.author.name) {
            return sortDirection === SORT_DIRECTIONS.ASC ? -1 : 1;
          }
          if (item1.author.name === item2.author.name) {
            return 0;
          }
          if (item1.author.name > item2.author.name) {
            return sortDirection === SORT_DIRECTIONS.ASC ? 1 : -1;
          }
        }
        if (item1[sortBy] < item2[sortBy]) {
          return sortDirection === SORT_DIRECTIONS.ASC ? -1 : 1;
        }
        if (item1[sortBy] === item2[sortBy]) {
          return 0;
        }
        if (item1[sortBy] > item2[sortBy]) {
          return sortDirection === SORT_DIRECTIONS.ASC ? 1 : -1;
        }
        return 0;
      });

      setBooksToUse(sortedBooks);
      setProcessing(false);
    }
  };

  const headerRenderer = (name, dataKey, sortBy, sortDirection) => {
    return (
      <Box>
        {name}
        {sortBy === dataKey && (
          <FontAwesomeIcon
            className={styles.icon}
            icon={
              sortDirection === SORT_DIRECTIONS.ASC ? faCaretUp : faCaretDown
            }
          />
        )}
      </Box>
    );
  };

  const onFilterByChange = (newValue, filterKey) => {
    const newFilterByRedux = filterByArray.map((f) => {
      return {
        ...f,
        value: f.key === filterKey ? newValue : f.value,
      };
    });
    if (!newFilterByRedux.find((f) => f.key === filterKey)) {
      console.log(newFilterByRedux, filterKey);
      newFilterByRedux.push({
        key: filterKey,
        value: newValue,
      });
    }
    dispatch(setFilterBy(newFilterByRedux));
  };

  const filterList = Object.keys(AVAILABLE_FILTER_BY).map((filterByKey, i) => {
    const currentFilter = AVAILABLE_FILTER_BY[filterByKey];
    const currentFilterByRedux =
      filterByArray &&
      filterByArray.length > 0 &&
      filterByArray.find((f) => f.key === currentFilter.dataKey);

    switch (currentFilter.dataType) {
      case "text":
        return (
          <TextField
            key={i}
            id="standard-search"
            className={styles.filterControl}
            label={currentFilter.dataLabel}
            type="search"
            value={currentFilterByRedux ? currentFilterByRedux.value : ""}
            onChange={(e) =>
              onFilterByChange(e.target.value, currentFilter.dataKey)
            }
          />
        );
      case "checkbox":
        const isChecked = currentFilterByRedux
          ? currentFilterByRedux.value
          : false;
        return (
          <FormControlLabel
            key={i}
            className={styles.filterControl}
            control={
              <Checkbox
                checked={isChecked}
                onChange={() =>
                  onFilterByChange(!isChecked, currentFilter.dataKey)
                }
                value={isChecked}
                color="primary"
              />
            }
            label={currentFilter.dataLabel}
          />
        );
      default:
        return null;
    }
  });

  const onFilterClick = () => {
    // Filtering done on graphql"
    setProcessing(true);

    const genreFilter = filterByArray.find((f) => f.key === "genre");
    const genreBooksFilter =
      genreFilter && genreFilter.value
        ? `, filter: { ${genreFilter.key}: "${genreFilter.value}" }`
        : "";

    const request = {
      query: `
        query allBooks {
          allBooks(page: 1, perPage: 1000 ${genreBooksFilter}) {
            name
            genre
            image
            date
            author
          }
        }`,
    };
    getBooksGraphql(request)
      .then(({ data }) => {
        setBooksToUse(data.data.allBooks);
        setLoading(false);
        setProcessing(false);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        }
        setLoading(false);
        setProcessing(false);
      });

    // this is the old way to filter using Web workers
    // if (books && books.length > 0 && filterWorkerInstance) {
    //   if (processing) {
    //     console.log("about to terminate");
    //     filterWorkerInstance.terminate();
    //   }
    //   setProcessing(true);
    //   console.log("starting to filter");
    //   filterWorkerInstance.filterBooks(books, filterByArray);
    // }
  };

  const onSetFilters = (newFilters) => {
    // Filtering done on graphql"
    setProcessing(true);

    const genreFilter = newFilters.find((f) => f.key === "genre");
    const dateFilter = newFilters.find((f) => f.key === "date");
    const genreBooksFilter =
      genreFilter && genreFilter.value
        ? `, filter: { ${genreFilter.key}: "${genreFilter.value}" }`
        : "";

    const request = {
      query: `
        query allBooks {
          allBooks(page: 1, perPage: 1000 ${genreBooksFilter}) {
            name
            genre
            image
            date
            author
          }
        }`,
    };
    getBooksGraphql(request)
      .then(({ data }) => {
        // here we need to filter based on date
        // in graphql this is not available yet
        if (dateFilter) {
          const filteredAllBooks = data.data.allBooks.filter((book) => {
            let bookIsGood = true;
            if (dateFilter.value === "friday") {
              if (moment(book.date).isSame(lastFridayForMonth(book.date))) {
                bookIsGood = false;
              }
            }
            if (dateFilter.value === "halloween") {
              const b = moment(book.date);
              if (b.month() + 1 !== 10) {
                bookIsGood = false;
              }
              if (b.date() !== 31) {
                bookIsGood = false;
              }
            }
            return bookIsGood;
          });
          setBooksToUse(filteredAllBooks);
        } else {
          setBooksToUse(data.data.allBooks);
        }
        setLoading(false);
        setProcessing(false);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        }
        setLoading(false);
        setProcessing(false);
      });

    // this is the old way
    // if (books && books.length > 0 && filterWorkerInstance) {
    //   if (processing) {
    //     console.log("about to terminate");
    //     filterWorkerInstance.terminate();
    //   }
    //   setProcessing(true);
    //   console.log("starting to filter");
    //   filterWorkerInstance.filterBooks(books, newFilters);
    // }
  };

  return (
    <Box className={styles.booksContainer}>
      <Navigation selectedTab="books" />
      <Box className={styles.app}>
        <Paper elevation={5} className={styles.mainContainer}>
          {!loading && books && books.length > 0 && (
            <Box>
              <Paginator
                currentPage={globalCurrentPage}
                onPageChange={(number) => onGlobalPageChange(number)}
                pageCount={parseInt(allPagesCount / 1000 - 1, 10)}
              />
              <Box className={styles.tableContainer}>
                <Box className={styles.filterContainer}>
                  {filterList}
                  <Button
                    className={styles.filterBtn}
                    onClick={() => onFilterClick()}
                  >
                    Filter
                  </Button>
                </Box>
                <Box className={styles.filterContainer}>
                  <Button
                    className={styles.filterBtn}
                    onClick={() =>
                      onSetFilters([
                        {
                          key: "genre",
                          value: "Horror",
                        },
                        {
                          key: "date",
                          value: "halloween",
                        },
                      ])
                    }
                  >
                    Halloween Horror
                  </Button>
                  <Button
                    className={styles.filterBtn}
                    onClick={() =>
                      onSetFilters([
                        {
                          key: "genre",
                          value: "Finance",
                        },
                        {
                          key: "date",
                          value: "friday",
                        },
                      ])
                    }
                  >
                    Friday Finance
                  </Button>
                </Box>
                <Box className={styles.headerContainer}>
                  <Paginator
                    currentPage={currentPage}
                    onPageChange={(number) => onPageChange(number)}
                    pageCount={parseInt(booksToUse.length / booksPerPage, 10)}
                  />
                  {processing && (
                    <Box className={styles.progressBox}>
                      <Typography>Operation in progress...</Typography>
                      <Typography>
                        Feel free to use the data while we are working on this.
                      </Typography>
                    </Box>
                  )}
                </Box>
                <VirtualizedTable
                  rowHeight={rowHeight}
                  headerHeight={headerHeight}
                  height={tableHeight}
                  rowCount={booksToUse.length}
                  rows={booksToUse}
                  onRowsRendered={(props) => onRowsScroll(props)}
                  scrollToIndex={scrollIndex}
                  scrollToAlignment="start"
                  sort={({ sortBy, sortDirection }) =>
                    onSort(sortBy, sortDirection)
                  }
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                >
                  <Column
                    label=""
                    dataKey="image"
                    width={80}
                    height={80}
                    disableSort={true}
                    cellRenderer={ImageCell}
                  />
                  <Column
                    label="Name"
                    dataKey="name"
                    width={200}
                    headerRenderer={({ dataKey, sortBy, sortDirection }) =>
                      headerRenderer("Name", dataKey, sortBy, sortDirection)
                    }
                  />
                  <Column
                    label="Genre"
                    dataKey="genre"
                    width={150}
                    disableSort={true}
                  />
                  <Column
                    label="Author"
                    dataKey="author.name"
                    width={200}
                    cellRenderer={AuthorCell}
                    headerRenderer={({ dataKey, sortBy, sortDirection }) =>
                      headerRenderer("Author", dataKey, sortBy, sortDirection)
                    }
                  />
                  <Column
                    label="Date"
                    dataKey="date"
                    width={100}
                    disableSort={true}
                    cellRenderer={DateCell}
                  />
                </VirtualizedTable>
              </Box>
            </Box>
          )}
          {!loading && booksToUse && booksToUse.length === 0 && (
            <Box className={styles.notFoundBox}>
              <Typography>No Books are availabel. Sorry.</Typography>{" "}
            </Box>
          )}
          {loading && (
            <Box>
              <BookSkeleton />
              <BookSkeleton />
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default withRouter(Books);

const useStyles = makeStyles((theme) => ({
  booksContainer: {
    width: "100%",
    height: "100%",
  },
  app: {
    padding: "0 8%",
  },
  mainContainer: {
    marginBottom: 20,
    padding: 12,
  },
  button: {
    marginRight: theme.spacing(1),
    color: "black",
    backgroundColor: "transparent",
    border: "solid 1px #36918e",
    borderRadius: 2,
    marginLeft: 12,
    padding: "6px 20px",
  },
  image: {
    width: 80,
    height: 80,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  notFoundBox: {
    padding: 20,
  },
  tableContainer: {
    marginTop: 16,
  },
  icon: {
    marginLeft: 4,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  progressBox: {
    textAlign: "right",
  },
  textInput: {
    width: 200,
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterBtn: {
    border: "solid 1px",
    marginLeft: 8,
  },
  filterControl: {
    marginLeft: 8,
  },
}));
