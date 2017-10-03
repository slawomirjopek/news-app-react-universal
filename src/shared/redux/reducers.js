import axios from "axios";

// Actions
const NEWS_FETCH_START = "NEWS_FETCH_START";
const NEWS_FETCH_SUCCESS = "NEWS_FETCH_SUCCESS";
const NEWS_FETCH_ERROR = "NEWS_FETCH_ERROR";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case NEWS_FETCH_START: {
            state = Object.assign({}, state, { fetching: true });
            break;
        }
        case NEWS_FETCH_SUCCESS: {
            state = Object.assign({}, state, { fetching: false, news: action.payload });
            break;
        }
        case NEWS_FETCH_ERROR: {
            state = Object.assign({}, state, { fetching: false, error: true });
            break;
        }
    }

    return state;
};

// Action Creators
const requestNews = () => ({ type: NEWS_FETCH_START });
const receivedNews = news => ({ type: NEWS_FETCH_SUCCESS, payload: news });
const newsError = () => ({ type: NEWS_FETCH_ERROR });

export const fetchNews = () => (dispatch, getState) => {
    dispatch(requestNews());

    return axios.get("http://localhost:3000/api/news")
        .then(res => res.data)
        .then(news => dispatch(receivedNews(news)))
        .catch(err => dispatch(newsError(err)))
};

export const fetchSingleNews = (id) => (dispatch, getState) => {
    dispatch(requestNews());

    return axios.get("http://localhost:3000/api/news/" + id)
        .then((res) => res.data)
        .then(news => dispatch(receivedNews(news)))
        .catch(err => dispatch(newsError(err)))
};

export default reducer;