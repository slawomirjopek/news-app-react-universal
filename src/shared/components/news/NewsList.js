import React from "react";

const NewsList = (props) => {
    return (
        <div>
            {props.news.map((news, index) => {
                return <article key={index}>
                    <h3>{news.title}</h3>
                    <p>{news.author}</p>
                </article>
            })}
        </div>
    )
};

export default NewsList;