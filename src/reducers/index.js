import { combineReducers } from 'redux';
import fetch_books_reducer from './fetch_books_reducer';
import fetch_tvshows_reducer from './fetch_tvshows_reducer';
import fetch_is_books from './fetch_is_books';
import fetch_series from './fetch_series';
import fetch_book_reducer from './fetch_book_reducer';

const rootReducer = combineReducers({
    books: fetch_books_reducer,
    shows: fetch_tvshows_reducer,
    isBooks: fetch_is_books,
    series: fetch_series,
    book: fetch_book_reducer
});

export default rootReducer;
