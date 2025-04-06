// import Login from "./pages/login";

import { Outlet } from "react-router-dom";
import { SignInView, SignUpView } from "src/sections/auth/view";
import LoadingView from "src/sections/auth/view/loading-view";

export const authroutes = [
  {
    path: "/auth",
    element:(
      <Outlet/>
    ),
    children:[
      {
        path:"loading-page",
        element:(
          <LoadingView/>
        )
      },
      {
        path:"sign-in",
        element:(
          <SignInView/>
        )
      },
      {
        path:"sign-up",
        element:(
          <SignUpView/>
        )
      }
    ]
  },
  
];