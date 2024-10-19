import App from './pages/App';
import Home from './pages/Home';
import DrugInfo from './pages/DrugInfo';
import ErrorPage from './pages/ErrorPage';
import DrugDiary from './pages/DrugDiary';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Home', element: <Home /> },
      { path: '/DrugInfo', element: <DrugInfo /> },
      { path: '/DrugDiary', element: <DrugDiary /> },
    ],
  },
];

export default routes;
