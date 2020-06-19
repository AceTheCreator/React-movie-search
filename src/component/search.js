/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import searchIcon from '../static/search.svg';

class Search extends Component {
  render() {
    return (
                <Container>
                    <div className='nav-bar'>
                    <div className='logo'>
                        <img src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg' alt='netflix-logo' />
                    </div>
                    <Form style={{ width: '50%', textAlign: 'center' }}>
                    <img src={searchIcon} className='search-icon' alt='search-icon' />
                        <input type='search' placeholder='search for movies' />
                    </Form>
                    <div className='code-repo'>
                        Hello
                    </div>
                    </div>
                </Container>
    );
  }
}

export default Search;
