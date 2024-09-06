import { useRoutes, BrowserRouter } from 'react-router-dom'
import { Navbar } from '../../components/NavBar/navBar';
import ReservationDetail from '../../components/ReservationDetail';
import { ReservationPage } from '../ReservationPage';
import {ReservationList} from '../../components/ReservationList';



const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <ReservationPage /> },
    { path: '/:id', element: <ReservationPage /> },
    { path: '/reservation/:id', element: <ReservationDetail />},
    { path: '/reservationsList', element: <ReservationList />},
    { path: '*', element: <h1>Not Found</h1>}
  ])
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
