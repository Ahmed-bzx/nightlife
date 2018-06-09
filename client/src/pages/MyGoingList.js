import React, { Component } from 'react';
import BarCard from '../components/BarCard';
import { Card } from 'semantic-ui-react';


class MyGoingList extends Component {
  render() {
    const { goingList } = this.props.user;

    return(
      <div className='mygoinglist-page'>
        <h2>Your Going List</h2>
        {
          goingList ? (
            <Card.Group className='cards-container'>
              {
                goingList.map((bar, i) => {
                  return <BarCard key={i}
                            user={ this.props.user }
                            bar={ bar }
                            updateGoingList={ this.props.updateGoingList } />
                })
              }
            </Card.Group>
          ) : (
            <div className='no-going-list-msg'>
              <p>You have not added any bar to your going list!</p>
            </div>
          )
        }
      </div>
    )
  }
}

export default MyGoingList;
