import { Link, useNavigate, useParams } from "react-router-dom";
import { useDataMovieQueryDetail } from "../services/get-data-movies-detail";
import SearchIcon from "@rsuite/icons/Search";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { CookieKeys, CookieStorage } from "../utils/cookies";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { setMovieDetail } from "../redux/reducers/details/authDetail";

const DetailMovies = () => {
  const { id } = useParams();
  const [Search, setSearch] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data: fetchDetail } = useDataMovieQueryDetail(id);
  // const DetailMovie = useSelector((state) => state.movie.movieDetail)

  useEffect(() => {
    if (fetchDetail) {
      dispatch(setMovieDetail(fetchDetail.data));
    }
  }, [dispatch, fetchDetail]);

  if (!fetchDetail) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <h1 className="font-black font-montserrat text-[5rem]">
          Sedang Memuat Data
        </h1>
      </div>
    );
  }
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }

  const backgroundStyle = {
    backgroundImage: `url('https://image.tmdb.org/t/p/original/${fetchDetail.data.backdrop_path}')`,
  };

  // console.log(fetchDetail.data, "detail")

  return (
    <>
      <div className="parents">
        <div className="header-section absolute flex justify-between w-full mt-[.5rem]">
          <div className="brand-text flex justify-center items-center mx-[1rem]" style={{ zIndex: 999 }}>
            <div className='text-red-600 text-[2.5rem] font-bold'><a href='/home'>Movielist</a></div>
          </div>
          <div className="search-section z-50 w-[40%] flex justify-center items-center">
            <div className="relative w-full">
              <input
                 onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="border-2 w-full bg-transparent font-bold font-montserrat text-white border-red-600 rounded-full px-4 py-2 outline-red-600 focus:border-red-600 focus:outline-none"
                placeholder="What do you want to watch?"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
              <Link to={`/search/${Search}`}>
                <SearchIcon className="text-[1.5rem] hover:scale-[110%] text-slate-300 mx-2" />
              </Link>
              </div>
            </div>
          </div>
          <div className="head-btn z-50 flex gap-4 justify-center items-center mx-[2.5rem]">
            <button
              onClick={() => {
                CookieStorage.remove(CookieKeys.AuthToken);
                navigate("/");
              }}
              className="bg-red-500 text-white font-semibold text-[1rem] border-2 border-red-600 outline-red-600 rounded-full w-[6rem] h-[2.5rem] hover:bg-red-600 border-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className={`body-parents bg-cover relative bg-center bg-no-repeat h-screen overflow-hidden py-1 flex justify-start items-center`} style={backgroundStyle}>
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-60 bg-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
        <div
          className={`desc-section flex flex-col gap-4 w-[60%] text-white mx-[1rem]`}
        >
          <div className="Movie-title z-50">
            <h1 className="font-extrabold font-montserrat text-[3.5rem] leading-[4.5rem] mt-[2rem]">
              {fetchDetail.data.title}
            </h1>
          </div>
          <div className="Genre-list z-50 flex gap-4">
            {fetchDetail.data.genres
              ? fetchDetail.data.genres.map((genre, i) => (
                  <span className="font-montserrat font-normal" key={genre.id}>
                    {genre.name}
                    {i < fetchDetail.data.genres.length - 1 && ", "}
                  </span>
                ))
              : ""}
          </div>
          <div className="Movie-overview z-50">
            <p className="text-[0.8rem] text-justify font-normal font-montserrat">
              {fetchDetail.data.overview}
            </p>
          </div>
          <div className="movie-release-date z-50 font-montserrat tracking-wider">
            <span>Release Date : {formatDate(fetchDetail.data.release_date)}</span>
          </div>
          <div className="movie-rate z-50 flex gap-2">
            <span>
              <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
            </span>
            <span>{fetchDetail.data.vote_average} / 10</span>
          </div>
          <div className="desc-btn z-50">
            <div className="bg-red-500 rounded-full px-3 font-montserrat font-bold pt-[.7rem] h-[2.5rem] text-[0.8rem] w-[10.5rem] hover:bg-red-600">
              <PlayOutlineIcon className="text-[1rem] mx-[0.3rem] mb-[0.2rem]" />
              WATCH TRAILER
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMovies;
