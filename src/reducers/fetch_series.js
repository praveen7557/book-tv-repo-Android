import { FETCH_SERIES } from '../actions/actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_SERIES:
            return action.payload;
        default:
            return state;
    }
}