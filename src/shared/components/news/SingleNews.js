import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

let newsId;

class SingleNews extends Component {
    constructor(props) {
        super(props);

        newsId = props.match.params.id;
        let initialData;

        if (typeof window === "undefined") {
            initialData = props.staticContext.data
        } else {
            if (window.__initialState__) {
                initialData = window.__initialState__;
                delete window.__initialState__;
            }
        }

        this.state = initialData || {};
    }

    render() {
        return (
            <div>
                <h2>{ this.state.title }</h2>
                <p>{ this.state.author }</p>
                <Link to="/">Back</Link>
            </div>
        )
    }

    componentDidMount() {
        SingleNews.getInitialData().then((data) => {
            this.setState({ id: data.id, title: data.title, author: data.author });
        });
    }

    static getInitialData() {
        return axios.get("http://localhost:3000/api/news/" + newsId)
            .then((res) => res.data)
            .catch((err) => {
                console.log(err)
            })
    }
};

export default SingleNews;