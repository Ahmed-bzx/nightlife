import React, { Component } from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';

class BarCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      going: false
    }

    this.addToGoingList = this.addToGoingList.bind(this);
    this.removeFromGoingList = this.removeFromGoingList.bind(this);
  }

  componentDidMount() {
    const { user, bar } = this.props;

    if(user.goingList) {
      user.goingList.map((item) => {
        if (item.id === bar.id) {
          this.setState({ going: true });
        }
        return 0;
      })
    }
  }

  addToGoingList() {
    const { user, bar } = this.props;

    if(user.id) {
      fetch('/api/addToGoingList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, bar })
      })
      .then((response) => response.json())
      .then((goingList) => {
        this.setState({ going: true })
        this.props.updateGoingList(goingList)
      })
      .catch(err => console.log(err))
    } else {
      this.props.history.push('/signin');
    }
  }

  removeFromGoingList() {
    const { user, bar } = this.props;

    fetch('/api/removeFromGoingList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, bar })
    })
    .then((response) => response.json())
    .then((goingList) => {
      this.setState({ going: false })
      this.props.updateGoingList(goingList)
    })
    .catch(err => console.log(err))
  }

  render() {
    const { image_url, name, rating, price, url } = this.props.bar;
    const { going } = this.state;

    return(
      <Card>
       <Image src={ image_url } />
       <Card.Content>
         <Card.Header>{ name }</Card.Header>
         <Card.Meta><Rating defaultRating={ rating } maxRating={5} disabled /></Card.Meta>
         <Card.Meta>Price { price }</Card.Meta>
         <div className='card-buttons-container'>
           {
             going ? <button className='cancel-going-button' onClick={ this.removeFromGoingList }>Cancel going</button>
             : <button className='going-button' onClick={ this.addToGoingList }>Add to Going List</button>
           }
           <a href={ url } target='_blank'><button className='see-more-button'>see more</button></a>
         </div>
       </Card.Content>
     </Card>
    )
  }
}

export default BarCard;
