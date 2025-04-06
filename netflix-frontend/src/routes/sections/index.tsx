import { Navigate, useRoutes } from 'react-router-dom';


import { authroutes } from './auth';
import { dashboardroutes } from './dashboard';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <Navigate to={CONFIG.auth.redirectPath} replace />
      ),
    },

    // Auth
    ...authroutes,

    // dashboard 

    ...dashboardroutes,

   



    // No match
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
