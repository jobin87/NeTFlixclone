const ROOTS = {
    AUTH: '/auth',
    DASHBOARD:'/dashboard'
   
  };
  
  // ----------------------------------------------------------------------
  
  export const paths = {
    components: '/components',
  
    // AUTH
    auth: {
      loadingPage: `${ROOTS.AUTH}/loading-page`,
      signIn: `${ROOTS.AUTH}/sign-in`,
      signUp:`${ROOTS.AUTH}/sign-up`
      
    },

    dashboard:{
      root:ROOTS.DASHBOARD,
      home: `${ROOTS.DASHBOARD}/home`,
      anime: `${ROOTS.DASHBOARD}/anime`,
      moviedetails: `${ROOTS.DASHBOARD}/moviedetails/:id`
     

    }
    
}