import React, { Component } from "react";
import NewsList from "../components/news/NewsList";
import axios from "axios";

class News extends Component {
    constructor(props) {
        super(props);

        let initialData;

        if (typeof window === "undefined") {
            initialData = props.staticContext.data || []
        } else {
            initialData = window.__initialState__ || [];
            delete window.__initialState__;
        }

        this.state = {
            news: initialData
        }
    }

    componentDidMount() {
        News.getInitialData().then((data) => {
            this.setState({ news: data });
        });
    }

    static getInitialData() {
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