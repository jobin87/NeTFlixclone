import { Navigate, useRoutes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { authroutes } from './auth';
import { dashboardroutes } from './dashboard';

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
