import { ADD_BUG, BUG_ERROR, BUG_LOADING, BUG_SUCCESS, REMOVE_BUG, UPDATE_BUG } from "./bug.type";

const initialState = {
    bugs: [],
    error: false,
    loading: false
};
export const bugReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_BUG: {
            return {
                ...state,
                loading: false,
                bugs: [...state.bugs, payload]
            }
        }
        case BUG_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case BUG_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload || true
            }
        }
        case BUG_SUCCESS: {
            return {
                ...state,
                loading: false,
                bugs: payload
            }
        }
        case UPDATE_BUG: {
            const updatedBugs = state.bugs.map((ele) => {
                if (ele._id === payload._id) {
                    return {
                        ...ele,
                        ...payload
                    }
                }
                return ele;
            })
            return {
                ...state,
                loading: false,
                bugs: updatedBugs
            }
        }
        case REMOVE_BUG: {
            let filteredbugs = state.bugs.filter(
                (ele) => ele._id !== payload
            )
            return {
                ...state,
                loading: false,
                bugs: filteredbugs
            }
        }
        default: {
            return state;
        }
    }
}