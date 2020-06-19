/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import SkeletonCard from './skeletonCard';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      movies: [],
      error: null
    };
  }

  componentDidMount() {
    const apiKey = process.env.MDB_KEY;
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        this.setState({
          ...this.state,
          //   loading: false,
          movies: res.data.results
        });
        console.log(this.state.movies);
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
      result = <div>loaded</div>;
    }
    return (
            <Container>
                <div className='movies'>
                {result}
                </div>
            </Container>
    );
  }
}

export default Movies;
