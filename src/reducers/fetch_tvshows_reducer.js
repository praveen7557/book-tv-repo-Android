
import { FETCH_TVSHOWS, FETCH_INITIAL_SHOWS } from '../actions/actions'

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_TVSHOWS:
            return action.payload;
            break;
        case FETCH_INITIAL_SHOWS:
            return [];
            break;
    }
    return state;
}