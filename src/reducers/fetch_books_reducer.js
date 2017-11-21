import { FETCH_BOOKS, FETCH_TO_READ, FETCH_DNF, FETCH_READ, FETCH_INITIAL_BOOKS } from '../actions/actions';

// const initialState = {
//     [DEFAULT_KEY]: null
//     // ...other keys 
// }

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BOOKS:
            return action.payload.query.results.GoodreadsResponse.reviews.review;
            break;
        case FETCH_INITIAL_BOOKS:
            return [];
            break;
    }
    return state;
}