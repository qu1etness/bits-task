import {createBrowserRouter, redirect} from "react-router";
import DashboardPage from "./pages/dashboard-page.tsx";
import WishDetailsPage from "./pages/wish-details-page.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        loader() {
            return redirect("/dashboard");
        },
    },
    {
        path: "/dashboard",
        Component: DashboardPage
    },
    {
        path: "/wishes/:id",
        Component: WishDetailsPage
    },
]);


export default router;