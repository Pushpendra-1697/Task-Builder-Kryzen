import axios from "axios";
import { ADD_BUG, BUG_ERROR, BUG_LOADING, BUG_SUCCESS, REMOVE_BUG, UPDATE_BUG } from "./bug.type";
import { backend_url } from '../../Pages/BackendURL';

export const getBugs = (page) => async (dispatch) => {
    dispatch({ type: BUG_LOADING });
    try {
        let res = await axios.get(`${backend_url}/dashboard/`, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        dispatch({ type: BUG_SUCCESS, payload: res.data });
    } catch (e) {
        dispatch({ type: BUG_ERROR, payload: e.message });
    }
};

export const addBug = (message) => async (dispatch) => {
    dispatch({ type: BUG_LOADING });
    try {
        let res = await axios.post(`${backend_url}/dashboard/post`, message, { headers: { token: localStorage.getItem('token') } });
        dispatch({ type: ADD_BUG, payload: res.data });
    } catch (e) {
        dispatch({ type: BUG_ERROR, payload: e.message });
    }
};
// Note: In post and patch requests always gives object after url of json-server or api url; here message and changes both are objects which comes different-2 files;
export const updateBug = (id, changes) => async (dispatch) => {
    dispatch({ type: BUG_LOADING });
    try {
        let res = await axios.patch(`${backend_url}/dashboard/patch/${id}`, {
            ...changes
        }, { headers: { token: localStorage.getItem('token') } });
        dispatch({ type: UPDATE_BUG, payload: res.data });
    } catch (e) {
        dispatch({ type: BUG_ERROR, payload: e.message });
    }
};

export const deletebug = (id) => async (dispatch) => {
    dispatch({ type: BUG_LOADING });
    try {
        let res = await axios.delete(`${backend_url}/dashboard/delete/${id}`, {
            headers: { token: localStorage.getItem('token') }
        });
        dispatch({ type: REMOVE_BUG, payload: res.data._id });
    } catch (e) {
        dispatch({ type: BUG_ERROR, payload: e.message });
    }
};