import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleNews } from "../../../shared/redux/reducers";

let id;

class SingleNews extends Component {
    constructor(props) {
        super();
        id = props.match.params.id
    }

    componentDidMount() {
        this.props.dispatch(SingleNews.getInitialData());
    }

    static getInitialData() {
        return fetchSingleNews(id);
    }

    render() {
        return (
            <div>
                <h2>{ this.props.news.title }</h2>
                <p>{ this.props.news.author }</p>
                <Link to="/">Back</Link>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        news: state.news[0],
        fetching: state.fetching,
        error: state.error
    }
};

export default connect(mapStateToProps)(SingleNews);