const ROOTS = {
    AUTH: '/auth',
    DASHBOARD:'/dashboard',
     DASHBOARDS:'/dashboard/subview'
   
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
      subView: `${ROOTS.DASHBOARDS}/:id`,
      search: `${ROOTS.DASHBOARD}/search`,
      movie: `${ROOTS.DASHBOARD}/movie`,
      series: `${ROOTS.DASHBOARD}/series`,
      trendinMovie: `${ROOTS.DASHBOARD}/trendingmovie`,
      anime: `${ROOTS.DASHBOARD}/anime`,
      moviedetails: `${ROOTS.DASHBOARD}/moviedetails/:id`
     

    }
    
}