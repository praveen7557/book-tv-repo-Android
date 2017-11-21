import { FETCH_IS_BOOKS } from '../actions/actions';

export default function (state = false, action) {
    switch (action.type) {
        case FETCH_IS_BOOKS:
            return action.payload;
        default:
            return state;
    }
}