import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataMovieQuerySearch } from "../services/search-data-movies";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../redux/reducers/search/authSearch";

const SearchMovieList = () => {
  const { title } = useParams();

  const { data: fetchSearch, isLoading } = useDataMovieQuerySearch({
    page: 1,
    query: title,
  });

  const [result, setResult] = useState(true);

  const searchResults = useSelector(
    (state) => state.search.searchResults
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetchSearch) return;

    if (fetchSearch.data?.length > 0) {
      dispatch(setSearchResults(fetchSearch.data));
      setResult(true);
    } else {
      dispatch(setSearchResults([]));
      setResult(false);
    }
  }, [fetchSearch, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <h1 className="font-black font-montserrat text-[5rem]">
          Sedang Memuat Data
        </h1>
      </div>
    );
  }

  return (
    <div className="parents bg-gradient-to-r from-gray-500 to-gray-700">
      <div className="pop-text px-6 flex justify-between h-[3rem] pt-2">
        <h1 className="font-black font-poppins tracking-wide text-[2rem]">
          Search Result "{title}"
        </h1>

        <div className="bg-white mt-2 flex justify-center items-center w-[15rem] rounded-lg hover:bg-black">
          <a
            className="text-red-600 font-poppins font-bold text-[1.5rem]"
            href="/home"
          >
            Back To Home
          </a>
        </div>
      </div>

      {result ? (
        <div className="flex flex-wrap justify-between items-center gap-5 px-[1.4rem] my-[1rem]">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="bg-red-500 hover:scale-105 hover:bg-red-600 rounded-md mt-[.5rem]"
            >
              <Link to={`/${movie.id}`}>
                <img
                  className="poster-section min-h-[28rem] w-[17.5rem]"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>

              <div className="movie-title flex justify-center items-center font-extrabold font-poppins h-[4rem] max-w-[17.5rem] text-white text-center text-[15px]">
                <h1 className="mx-2">{movie.title}</h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full h-screen justify-center items-center">
          <h1 className="font-black font-montserrat text-[5rem]">
            Movie Not Found
          </h1>
        </div>
      )}

      <div className="footer">
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 w-full h-[3rem] flex justify-center items-center text-gray-600 font-semibold">
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default SearchMovieList;