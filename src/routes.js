import App from "./pages/App";
import Home from "./pages/Home";
import DrugInfo from "./pages/DrugInfo";
import AddDrug from "./pages/AddDrug";
import ErrorPage from "./pages/ErrorPage";


const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        { path: "/", element: <Home /> },
        { path: "drug/:id", element: <DrugInfo /> },
        { path: "add-drug", element: <AddDrug /> }
      ]
  }
]

export default routes;