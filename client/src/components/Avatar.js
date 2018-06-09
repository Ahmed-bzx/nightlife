import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    const { name, image } = this.props.user;

    return(
      <div className='avatar'>
      	<img className='avatar-image' src={ image } alt='Your Face Should Be Here :('/>
        <p className='avatar-name' >Welcome, { name }</p>
      </div>
    )
  }
}

export default Avatar;
