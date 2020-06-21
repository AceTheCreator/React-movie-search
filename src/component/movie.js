import React, { useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/youtube';
import { Modal } from 'react-bootstrap';
import starIcon from '../static/star.svg';
import playIcon from '../static/play.svg';

const apiKey = process.env.MDB_KEY;

function Movie(props) {
  const [modalShow, setModalShow] = useState(false);
  const [video, updateVideo] = useState({});
  const result = props.details;
  const genres = result.genres.map((index) => (
  <div className='genres' key={index.id}>{index.name}</div>
  ));
  const language = result.spoken_languages.map((index) => (
    <div className='language' key={index.id}>{index.name}</div>
  ));
  const countries = result.production_countries.map((index) => (
    <div className='countries' key={index.id}>{index.name},</div>
  ));
  const playTrailer = (data) => {
    axios.get(`https://api.themoviedb.org/3/movie/${data}/videos`, {
      params: {
        api_key: apiKey
      }
    }).then((res) => {
      updateVideo(res.data.results[0]);
      setModalShow(true);
    }).catch((err) => {
      throw err;
    });
  };
  return (
  <div className='movie'>
      <div className='poster'>
        <div className='m-poster' style={{
          background: `url(https://image.tmdb.org/t/p/w500/${result.poster_path})`,
          width: '500px',
          height: '550px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderRadius: '10px'
        }}>

        </div>
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
               <button onClick={() => playTrailer(result.id)} className='play-trailer'>
                   Watch trailer <span><img src={playIcon} alt='play-icon' /></span>
               </button>
               <button className='explore'>
                   Explore more
               </button>
           </div>
           <div className='watch-trailer'>
               <WatchTrailer
                data = {video}
                 show={modalShow}
                 onHide={() => setModalShow(false)}
                />
           </div>
           </div>
  </div>
  );
}

Movie.propTypes = {
  details: PropTypes.array,
  genres: PropTypes.array
};

function WatchTrailer(props) {
  const url = `https://www.youtube.com/watch?v=${props.data.key}`;
  return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <ReactPlayer
         width='100%'
         height='50vh'
         url={url} />
    </Modal>
  );
}
WatchTrailer.propTypes = {
  data: PropTypes.array
};
export default Movie;
