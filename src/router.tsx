import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import MyVideo from "./routes/MyVideo";

const router = createBrowserRouter([
    {
        path: '/',
        element:<Root />,
        errorElement:<NotFound />,
        children:[
            {
                path:"",
                element: <Home />
            },
            {
                path:"myvideo/:accessToken",
                element: <MyVideo />
            }
        ]
    }
])

export default router;