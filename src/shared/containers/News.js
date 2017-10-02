import React, { Component } from "react";
import NewsList from "../components/news/NewsList";
import axios from "axios";

class News extends Component {
    constructor() {
        super();

        this.state = {
            news: []
        }
    }

    componentDidMount() {
        this.getInitialData().then((data) => {
            this.setState({ news: data });
        });
    }

    getInitialData() {
        return axios.get("http://localhost:3000/api/news")
            .then((res) => res.data)
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h1>News</h1>
                <NewsList news={this.state.news}/>
            </div>
        )
    }
}

export default News;