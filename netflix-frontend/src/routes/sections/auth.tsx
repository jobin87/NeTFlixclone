// import Login from "./pages/login";

import { SignupPageView } from "src/sections/auth/view/sign-up-view";
import SigninPage from "../../pages/auth/sign-in";
import { Outlet } from "react-router-dom";

export const authroutes = [
  {
    path: "/auth",
    element:(
      <Outlet/>
    ),
    children:[
      {
        path:"sign-in",
        element:(
          <SigninPage/>
        )
      },
      {
        path:"sign-up",
        element:(
          <SignupPageView/>
        )
      }
    ]
  },
  
];