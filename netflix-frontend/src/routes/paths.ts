const ROOTS = {
    AUTH: '/auth',
    DASHBOARD:'/dashboard'
   
  };
  
  // ----------------------------------------------------------------------
  
  export const paths = {
    components: '/components',
  
    // AUTH
    auth: {
      signIn: `${ROOTS.AUTH}/sign-in`,
      signUp: `${ROOTS.AUTH}/sign-up`
      
    },

    dashboard:{
      root:ROOTS.AUTH,
      home: `${ROOTS.DASHBOARD}/home`,
      movies: `${ROOTS.DASHBOARD}/movies`,
      anime: `${ROOTS.DASHBOARD}/anime`
     

    }
    
}