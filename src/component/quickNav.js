/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

function QuickNav(props) {
  return (
        <div className='quick-nav'>
        <Nav variant="pills" className="justify-content-center nav-links" defaultActiveKey="#">
            <Nav.Item onClick={props.showing}>
                <Nav.Link className='links' href="#">Now Showing</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={props.popular}>
                <Nav.Link className='links' eventKey='link-1'>Most Popular</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={props.upcoming}>
                <Nav.Link className='links' eventKey='link-2'>Coming Soon</Nav.Link>
            </Nav.Item>
        </Nav>
        </div>
  );
}

QuickNav.propTypes = {
  showing: PropTypes.func,
  popular: PropTypes.func,
  upcoming: PropTypes.func
};

export default QuickNav;
