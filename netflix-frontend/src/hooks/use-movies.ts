import { useAppSelector } from "src/store"
import { IMovieDetails } from "src/types/movie"

export  const useMovie= ()=>{
    const {data} = useAppSelector((state)=>state.movie.data)
    const moviedetails: IMovieDetails | null =data ? data :null

    return {
        ...moviedetails,
        data,
      };
}