import React from "react";
import { Link } from "react-router-dom";

const NoRoute = () => (
    <div>
        <p>Error 404: Page not found!</p>
        <Link to="/">Go to index</Link>
    </div>
);

export default NoRoute;