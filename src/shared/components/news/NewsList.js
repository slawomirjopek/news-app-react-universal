import React from "react";
import { Link } from "react-router-dom";

const NewsList = (props) => {
    return (
        <div>
            {props.news.map((news, index) => {
                return <article key={index}>
                    <h3>{news.title}</h3>
                    <p>{news.author}</p>
                    <Link to={`/news/${news.id}`} news={news}>Read more...</Link>
                </article>
            })}
        </div>
    )
};

export default NewsList;