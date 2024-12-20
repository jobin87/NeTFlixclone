export type IMovieDetails = {
    imdbId: string; 
    title: string; 
    genre: string[]; 
    description: string; 
    releaseDate: string; 
    director: string; 
    cast: string[]; 
    duration: number;
    rating: number; 
    posterImage: string; 
    trailerUrl: string;
    movieStatus: string; 
    language: string; 
    productionCompany: string; 
    country: string;
    boxOffice: number; 
    reviews: IReview[]; 
    createdAt: string; 
    updatedAt: string; 
    images: [string]
    moviedata: IMovieDetails;
  };
  
  export type IReview = {
    reviewerName: string; // Name of the reviewer
    rating: number; // Rating given by the reviewer
    comment: string; // Review text
    date: string; // Date of the review
  };
  