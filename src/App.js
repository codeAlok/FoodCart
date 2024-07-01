import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header"; // /Header or /Header.js (both work fine)
import Body from "./components/Body.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { Provider } from "react-redux";
import store from "./utils/appStore.js";
import Cart from "./components/Cart.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// **** Lazy loading ****
// **** Wrap inside <Suspense> component by react (to not show error between the loading time of the component) ****
const About = lazy(() => import("./components/About.js"))


// ****** Main App Component (starting point) ******
const AppLayout = () => {

    return (
        <Provider store={store}>
            <div className="app font-Roboto">
                <Header />

                {/* Here <outlet /> will automatically replaced by component inside children of applayout in createBrowserRouter based on path searched */}
                <Outlet />

                {/* for popup notification */}
                <ToastContainer stacked autoClose={1000}/>  
            </div>
        </Provider>
    );
};

// **** Creating Routing configuration *****
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading......</h1>}>
                    <About />
                </Suspense>,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />); 

// <RouterProvider />  (a component by react-router-dom)
root.render(<RouterProvider router={appRouter} />);
