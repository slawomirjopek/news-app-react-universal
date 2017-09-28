import React, { Component } from "react";
import NewsList from "../components/news/NewsList";

class News extends Component {
    render() {
        return (
            <div>
                <h1>News</h1>
                <NewsList/>
            </div>
        )
    }
}

export default News;