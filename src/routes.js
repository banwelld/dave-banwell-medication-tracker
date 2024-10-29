import App from './pages/App';
import Home from './pages/Home';
import DrugInfo from './pages/DrugInfo';
import ErrorPage from './pages/ErrorPage';
import PharmacyReceipts from './pages/PharmacyReceipts';
import DrugActions from './pages/DrugActions';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Home', element: <Home /> },
      { path: '/DrugInfo/:id', element: <DrugInfo /> },
      { path: '/PharmacyReceipts/', element: <PharmacyReceipts /> },
      { path: '/DrugActions/', element: <DrugActions /> },
    ],
  },
];

export default routes;
