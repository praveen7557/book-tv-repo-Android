import { FETCH_BOOK, FETCH_INITIAL_BOOK } from '../actions/actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_BOOK:
            return action.payload.query.results.GoodreadsResponse.book;
            break;
        case FETCH_INITIAL_BOOK:
            return {};
            break;
    }
    return state;
}