import App from "./pages/App";
import Home from "./pages/Home";
import DrugInfo from "./pages/DrugInfo";
import ErrorPage from "./pages/ErrorPage";


const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        { path: "/", element: <Home /> },
        { path: "drug/:id", element: <DrugInfo /> },
      ]
  }
]

export default routes;