
import axios from 'axios';

export const FETCH_BOOKS = 'FETCH_BOOKS';

export const FETCH_INITIAL_BOOKS = "FETCH_INITIAL_BOOKS";
export const FETCH_INITIAL_SHOWS = "FETCH_INITIAL_SHOWS";
export const FETCH_IS_BOOKS = "FETCH_IS_BOOKS";
export const FETCH_BOOK = "FETCH_BOOK";
export const FETCH_INITIAL_BOOK = "FETCH_INITIAL_BOOK";
export const FETCH_SERIES = "FETCH_SERIES";
export const FETCH_INITIAL_SERIES = "FETCH_INITIAL_SERIES";

export const FETCH_TVSHOWS = 'FETCH_TVSHOWS';
var proxify = require('proxify-url');
const BOOKS_URL = 'https://www.goodreads.com/review/list/36189301.xml?key=qY1rPUxjLx33WZDq6OkvEQ&v=2&per_page=200';
const page_no = 1;
const list_id = "37823";
const TV_API_KEY = '99c26306be3d1ce05090f2450ff90c6e';
const API_URL = 'https://api.themoviedb.org/4/list/';//37823?page=1&api_key=
var typeOfList = "rated";
const TV_URL = `https://api.themoviedb.org/4/account/57984952c3a368052f002968/tv/${typeOfList}?page=${page_no}`;


export function fetchBooks(params) {
    const GET_URL = `${BOOKS_URL}${(params == undefined||params=="") ? "" : "&shelf=" + params}`
    let proxyUrl = proxify(GET_URL, { inputFormat: 'xml' });
    // let books = axios.get(proxyUrl, { params: { format: "json" } });
    return (dispatch) => {
        dispatch({
            type: FETCH_INITIAL_BOOKS,
            payload: []
        })
        axios.get(proxyUrl, { params: { format: "json" } }).then(books => {
            // var type = (params == undefined ? "FETCH_BOOKS" : "FETCH_" + params.toUpperCase().replace("-", "_"));
            dispatch({
                type: FETCH_BOOKS,
                payload: books.data
            })
        })
    };
}

export function fetchTvShows(params) {
    typeOfList = (params == undefined ? "rated" : params);
    var GET_URL = `https://api.themoviedb.org/4/account/57984952c3a368052f002968/tv/${typeOfList}?page=${page_no}&sort_by=vote_average.desc`;
    GET_URL = (params == "dnf" ? "https://api.themoviedb.org/4/list/37943?page=1&api_key=" + TV_API_KEY : GET_URL);
    var headers = {
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWMyNjMwNmJlM2QxY2UwNTA5MGYyNDUwZmY5MGM2ZSIsInN1YiI6IjU3OTg0OTUyYzNhMzY4MDUyZjAwMjk2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5GRbUI72s9w3JvlegvBx8N52lq4lcDSvZzYZsig5V2c"
    }
    // if (params == undefined)
    //     GET_URL = "https://api.themoviedb.org/4/account/57984952c3a368052f002968/tv/rated?page=1";
    // let proxyUrl = proxify(GET_URL, { inputFormat: 'xml' });
    //let tvShows = axios.get(GET_URL, { params: { format: "json" } });

    return (dispatch) => {
        dispatch({
            type: FETCH_INITIAL_SHOWS,
            payload: []
        })
        axios.get(GET_URL, { params: { format: "json" }, headers: headers }).then(tv => {
            var tvJSON = JSON.parse(JSON.stringify(tv.data));
            if (tv.data.total_pages > 1) {
                for (var i = 2; i < tv.data.total_pages + 1; i++) {
                    GET_URL = `https://api.themoviedb.org/4/account/57984952c3a368052f002968/tv/${typeOfList}?page=${i}&sort_by=vote_average.desc`;
                    GET_URL = (params == "dnf" ? "https://api.themoviedb.org/4/list/37943?page=" + i + "&api_key=" + TV_API_KEY : GET_URL);
                    axios.get(GET_URL, { params: { format: "json" }, headers: headers }).then(shows => {
                        tvJSON.comments = Object.assign({}, tvJSON.comments, shows.data.comments);
                        tvJSON.results = tvJSON.results.concat(shows.data.results);
                        if (tv.data.total_pages == i - 1) {
                            dispatch({
                                type: FETCH_TVSHOWS,
                                payload: tvJSON
                            })
                        }
                    });
                }
            } else {
                dispatch({
                    type: FETCH_TVSHOWS,
                    payload: tvJSON
                })
            }
        })
    }
}

export function updateIsBooks(params) {
    return ({
        type: FETCH_IS_BOOKS,
        payload: params
    });
}

export function fetchTVSeries(id) {
    const TV_SERIES_URL = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=99c26306be3d1ce05090f2450ff90c6e&language=en-US&append_to_response=external_ids';
    return (dispatch) => {
        dispatch({
            type: FETCH_INITIAL_SERIES,
            payload: {}
        })
        axios.get(TV_SERIES_URL).then(tv => {
            dispatch({
                type: FETCH_SERIES,
                payload: tv.data
            })
        });
    }

}

export function fetchBookData(id) {
    const GET_URL = 'https://www.goodreads.com/book/show/' + id + '.json?key=qY1rPUxjLx33WZDq6OkvEQ&formt=json';
    let proxyUrl = proxify(GET_URL, { inputFormat: 'xml' });
    // let books = axios.get(proxyUrl, { params: { format: "json" } });
    return (dispatch) => {
        dispatch({
            type: FETCH_INITIAL_BOOK,
            payload: {}
        })
        axios.get(proxyUrl, { params: { format: "json" } }).then(books => {
            // var type = (params == undefined ? "FETCH_BOOKS" : "FETCH_" + params.toUpperCase().replace("-", "_"));
            dispatch({
                type: FETCH_BOOK,
                payload: books.data
            })
        })
    };
}
