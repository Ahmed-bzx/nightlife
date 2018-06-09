import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return(
      <div className='homepage'>
        <div className='main-wrapper'>
          <h1 className='headline'>Make Your Night More <span>Enjoyable</span></h1>
          <p className='sub-headline'>Find <span>Bars</span> around you and add them to your going list.</p>

          <Link className='find-button' to='/search' name='search'>Find Bars Around me</Link>
        </div>
      </div>
    );
  }
}

export default Home;
