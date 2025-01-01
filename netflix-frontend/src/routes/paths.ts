const ROOTS = {
    AUTH: '/auth',
    DASHBOARD:'/dashboard'
   
  };
  
  // ----------------------------------------------------------------------
  
  export const paths = {
    components: '/components',
  
    // AUTH
    auth: {
      signIn: `${ROOTS.AUTH}/loading-page`,
      signUp: `${ROOTS.AUTH}/sign-in`
      
    },

    dashboard:{
      root:ROOTS.DASHBOARD,
      home: `${ROOTS.DASHBOARD}/home`,
      anime: `${ROOTS.DASHBOARD}/anime`,
      moviedetails: `${ROOTS.DASHBOARD}/moviedetails/:id`
     

    }
    
}