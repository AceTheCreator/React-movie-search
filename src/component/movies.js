/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Nav } from 'react-bootstrap';
import SkeletonCard from './skeletonCard';
import starIcon from '../static/star.svg';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      movies: [],
      error: null,
      isActive: null
    };
    this.onMostPopularClick = this.onMostPopularClick.bind(this);
    this.onUpcomingClick = this.onUpcomingClick.bind(this);
    this.onShowingClick = this.onShowingClick.bind(this);
  }

  componentDidMount() {
    this.onShowingClick();
  }

  onShowingClick() {
    const apiKey = process.env.MDB_KEY;
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          movies: res.data.results,
          isActive: 'showing'
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  onMostPopularClick() {
    const apiKey = process.env.MDB_KEY;
    this.setState({
      ...this.state,
      loading: true
    });
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          movies: res.data.results,
          isActive: 'popular'
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  onUpcomingClick() {
    const apiKey = process.env.MDB_KEY;
    this.setState({
      ...this.state,
      loading: true
    });
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          movies: res.data.results,
          isActive: 'upcoming'
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  render() {
    let result;
    if (this.state.loading === true) {
      result = <SkeletonCard />;
    } else {
      result = <ul className = 'card-list'>
          {
            this.state.movies.map((index) => (
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
      </ul>;
    }
    return (
        <Container>
            <div className='quick-nav'>
                <Nav variant="pills" className="justify-content-center nav-links" defaultActiveKey="/home">
                    <Nav.Item onClick={this.onShowingClick}>
                        <Nav.Link className='links'>Now Showing</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={this.onMostPopularClick}>
                        <Nav.Link className='links'>Most Popular</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={this.onUpcomingClick}>
                        <Nav.Link className='links'>Coming Soon</Nav.Link>
                    </Nav.Item>
                </Nav>
                </div>
                <div className='movies'>
                {result}
                </div>
            </Container>
    );
  }
}

export default Movies;
