import React, { Component } from 'react';

class About extends Component {
  render() {
    return(
      <div className='about-page'>
        <h1>About this App</h1>
        <p>This is the second dynamic web application challenge at
          <a href="https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app" rel='noopener noreferrer' target="_blank"> FreeCodeCamp.</a>
        </p>
        <p>I built it using Express, MongoDB, React, Semantic UI and Yelp API.</p>
        <p>You can find me on <a href='https://twitter.com/ah__bz'  rel='noopener noreferrer' target='_black'>Twitter</a></p>
      </div>
    )
  }
}


export default About;
