import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import starIcon from '../static/star.svg';
import playIcon from '../static/play.svg';

function Movie(props) {
  const result = props.details;
  console.log(result);
  const genres = result.genres.map((index) => (
  <div className='genres' key={index.id}>{index.name}</div>
  ));
  const language = result.spoken_languages.map((index) => (
    <div className='language' key={index.id}>{index.name}</div>
  ));
  const countries = result.production_countries.map((index) => (
    <div className='countries' key={index.id}>{index.name},</div>
  ));
  return (
  <div className='movie'>
      <div className='poster'>
          <img src={ `https://image.tmdb.org/t/p/original/${result.poster_path}`} />
      </div>
      <div className='content'>
          <div className='head'>
          <div className='movie-title'><h1>{result.title}</h1></div>
          <div className='movie-popularity'>
              <img src={starIcon} alt='start-icon' /> <span>{result.popularity}</span>
          </div>
          </div>
          <div className='release-date'>
              <span>{result.release_date}</span> ||
              <span> {result.runtime} min </span> ||
               <span> {result.status}</span>
            </div>
            <div className='genre-list'>
                {genres}
            </div>
           <div className='language-list'>{language}</div>
           <div className='overview'>
               {result.overview}
           </div>
           <div className='production'>
               <div className='country'>
              <span className='production-title'>Production countries : </span> <span className='country-list'>{countries}</span>
               </div>
               <div className='country'>
              <span className='production-title'>Tagline : </span> <span className='country-list'>{result.tagline}</span>
               </div>
               <div className='country'>
              <span className='production-title'>Vote count : </span> <span className='country-list'>{result.vote_count}</span>
               </div>
           </div>
           <div className='watch'>
               <button className='play-trailer'>
                   Watch trailer <span><img src={playIcon} alt='play-icon' /></span>
               </button>
               <button className='explore'>
                   Explore more
               </button>
           </div>
           <div className='related-movies'>
               Related movies
               <Related id={result.id} />
           </div>
           </div>
  </div>
  );
}

Movie.propTypes = {
  details: PropTypes.array,
  genres: PropTypes.array
};
export default Movie;

function Related(props) {
  return (
        <div>Hello</div>
  );
}
