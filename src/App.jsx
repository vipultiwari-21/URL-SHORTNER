
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import Dashboard from './pages/dashboard';
import Auth from './pages/auth';
import Link from './pages/link';
import RedirectLink from './pages/redirect-link';
import UrlProvider from './context';
import RequireAuth from './components/require-auth';

const router = createBrowserRouter([
  {
     // this one will contain the header and footer
    element:<AppLayout />,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dashboard',
        element: (
          <RequireAuth>
            <Dashboard/>
          </RequireAuth>
        ),
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/link/:id',
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
        // we will have all the stats inside this link page all the clicks which have happened
        // to create the dynamic url we use this :id convention basically a variable using here
        // all the pages will render in the app-layout
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      },
    ],
  },
])

function App() {

  return (
  <UrlProvider>
      <RouterProvider router={router}/>
  </UrlProvider>
  );
} 
export default App


// TODO: Explanation: 👇

// - The App component initializes the application's context and routing configuration.
// - The UrlProvider ensures that URL-related state is accessible throughout the app.
// - The RouterProvider enables navigation between different pages based on the defined routes.
// - The AppLayout component wraps routes that need common elements, ensuring a consistent look and feel 
// - across those pages.