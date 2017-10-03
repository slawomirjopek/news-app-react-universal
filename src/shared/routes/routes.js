import News from "../containers/News";
import NoRoute from "../containers/NoRoute";
import SingleNews from "../components/news/SingleNews";

export default [
    {
        path: "/",
        component: News,
        exact: true
    },
    {
        path: "/news/:id",
        component: SingleNews,
        exact: false
    },
    {
        path: "*",
        component: NoRoute,
        exact: false
    }
];