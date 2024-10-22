import App from './pages/App';
import Home from './pages/Home';
import DrugInfo from './pages/DrugInfo';
import ErrorPage from './pages/ErrorPage';
import PharmacyReceipts from './pages/PharmacyReceipts';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/DrugInfo/:id', element: <DrugInfo /> },
      { path: '/PharmacyReceipts/', element: <PharmacyReceipts /> },
    ],
  },
];

export default routes;
