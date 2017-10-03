import React, { Component } from "react";
import NewsList from "../components/news/NewsList";
import { connect } from "react-redux";
import { fetchNews } from "../../shared/redux/reducers";

class News extends Component {
    componentDidMount() {
        this.props.dispatch(News.getInitialData());
    }

    static getInitialData() {
        return fetchNews();
    }

    render() {
        return (
            <div>
                <h1>News</h1>
                <NewsList news={this.props.news}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news,
        fetching: state.fetching,
        error: state.error
    }
};

export default connect(mapStateToProps)(News);