/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import starIcon from '../static/star.svg';

function MovieList(props) {
  return (
    <ul className = 'card-list'>
          {
            props.movies.map((index) => (
                <li key={index.id}>
                   <div className='movie-poster' style={{
                     width: '100%',
                     background: `url(https://image.tmdb.org/t/p/w500/${index.backdrop_path})`,
                     height: '200px',
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     borderRadius: '10px',
                     cursor: 'pointer'
                   }}></div>
                   <div className='details'>
                       <div className='nun'>
                       <div className='title'>
                       {index.title}
                       </div>
                       <div className='date'>
                       {index.release_date}
                       </div>
                       </div>
                       <div className='popularity'>
                           <img src={starIcon} alt='heart-icon' /><span>{index.vote_average}</span>
                           </div>
                       </div>
                </li>
            ))
          }
      </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array
};

export default MovieList;
