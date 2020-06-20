/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import SkeletonCard from './skeletonCard';
import QuickNav from './quickNav';
import MovieList from './movieList';
import searchIcon from '../static/search.svg';
import githubIcon from '../static/github.svg';

const apiKey = process.env.MDB_KEY;
const url = 'https://api.themoviedb.org/3/';
let options;
let urldes = '';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      loading: true,
      hasMore: false,
      totalPages: null,
      currentPage: null,
      movies: [],
      error: null,
      searchText: null
    };
    this.onMostPopularClick = this.onMostPopularClick.bind(this);
    this.onUpcomingClick = this.onUpcomingClick.bind(this);
    this.onShowingClick = this.onShowingClick.bind(this);
    this.onMovieSearchSubmit = this.onMovieSearchSubmit.bind(this);
    this.onMovieSearch = this.onMovieSearch.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
  }

  componentDidMount() {
    this.onShowingClick();
  }

  onMovieSearchSubmit(e) {
    this.setState({
      ...this.state,
      loading: true,
      movies: []
    });
    e.preventDefault();
    axios.get(`${url}search/movie`, {
      params: {
        api_key: apiKey,
        query: this.state.searchText
      }
    })
      .then((res) => {
        urldes = `${url}search/movie`;
        options = this.state.searchText;
        this.setState({
          ...this.state,
          loading: false,
          totalPages: res.data.total_pages,
          currentPage: res.data.page,
          movies: res.data.results
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  onMovieSearch(e) {
    this.setState({
      ...this.state,
      searchText: e.target.value
    });
  }

  onShowingClick() {
    this.setState({
      ...this.state,
      loading: true,
      movies: []
    });
    urldes = `${url}movie/now_playing`;
    axios.get(`${url}movie/now_playing`, {
      params: {
        api_key: apiKey
      }
    })
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          loading: false,
          totalPages: res.data.total_pages,
          currentPage: res.data.page,
          movies: res.data.results
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
    this.setState({
      ...this.state,
      loading: true,
      movies: []
    });
    urldes = `${url}movie/popular`;
    axios.get(`${url}movie/popular`, {
      params: {
        api_key: apiKey
      }
    })
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          totalPages: res.data.total_pages,
          currentPage: res.data.page,
          movies: res.data.results
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
    this.setState({
      ...this.state,
      loading: true,
      movies: []
    });
    urldes = `${url}movie/upcoming`;
    axios.get(`${url}movie/upcoming`, {
      params: {
        api_key: apiKey
      }
    })
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          totalPages: res.data.total_pages,
          currentPage: res.data.page,
          movies: res.data.results
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  loadMoreMovies(urldestination, query) {
    this.setState({
      ...this.state,
      hasMore: true
    });
    axios.get(urldestination, {
      params: {
        api_key: apiKey,
        page: this.page++ + 1,
        query
      }
    })
      .then((res) => {
        console.log(res);
        this.setState((state) => {
          const more = state.movies.concat(res.data.results);
          return {
            ...this.state,
            loading: false,
            currentPage: res.data.page,
            movies: more
          };
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err
        });
      });
  }

  renderWaypoint() {
    let hasFetched = false;
    if (hasFetched) return;
    hasFetched = true;
    if (this.state.currentPage >= this.state.totalPages) {
      this.setState({ hasMore: false });
    } else {
      this.loadMoreMovies(urldes, options);
    }
  }

  render() {
    let hasMore;
    let result;
    if (this.state.hasMore === true) {
      hasMore = <h6>loadin</h6>;
    } else {
      hasMore = '';
    }
    if (this.state.loading === true) {
      result = <SkeletonCard />;
    } else {
      result = <div>
        <MovieList movies= {this.state.movies} loadMore = {this.renderWaypoint} />
      </div>;
    }
    return (
        <Container>
                      <div className='nav-bar'>
                    <div className='logo'>
                        <img src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg' alt='netflix-logo' />
                    </div>
                    <Form onSubmit={this.onMovieSearchSubmit} style={{ width: '50%', textAlign: 'center' }}>
                    <img src={searchIcon} className='search-icon' alt='search-icon' />
                        <input onKeyPress={this.onMovieSearch} type='search' placeholder='search for movies' />
                    </Form>
                    <div className='code-repo'>
                    <img src={githubIcon} alt='github-logo' />
                    </div>
                    </div>
                    <QuickNav
                     showing={this.onShowingClick}
                     popular={this.onMostPopularClick}
                     upcoming={this.onUpcomingClick} />

                <div className='movies'>
                {result}
                {hasMore}
                </div>
            </Container>
    );
  }
}

export default Movies;
