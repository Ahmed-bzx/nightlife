import React, { Component } from 'react';

class Signin extends Component {
  render() {
    return(
      <div className='signin-page'>
        <div className='signin-card'>
          <h2>SIGN IN</h2>
          <a href='/auth/google'><button className='google-button'>Sign in with Google</button></a>
        </div>
      </div>
    )
  }
}

export default Signin;
