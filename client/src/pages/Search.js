import React, { Component } from 'react';
import BarCard from '../components/BarCard';
import Loader from '../components/Loader';
import { Card } from 'semantic-ui-react';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: localStorage.getItem('location') ? localStorage.getItem('location') : '',
      bars: null,
      loading: false,
      dataNotFound: false,
    }

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    if(this.state.location) { this.search() }
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

  search(e) {
    if(e) { e.preventDefault() }

    const { location } = this.state;
    localStorage.setItem('location', location);

    if(location) {
      this.setState({ bars: null, loading: true, dataNotFound: false });

      fetch('/api/search/' + location, {
        methos: 'GET',
        credentials: 'include',
        headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json'
  		  },
        mode: 'no-cors'
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.length === 0) {
          this.setState({ bars: null, loading: false, dataNotFound: true });
        } else {
          this.setState({ bars: data, loading: false, dataNotFound: false });
        }
      })
      .catch((err) => console.log(err))
    }
  }

  displayData() {
    const { bars, dataNotFound, loading } = this.state;

    if (loading) {
      return <Loader />
    }

    if(bars) {
      return (
        <Card.Group className='cards-container'>
          {
            bars.map((bar, i) => {
              return <BarCard key={i}
                        user={ this.props.user }
                        bar={ bar }
                        updateGoingList={ this.props.updateGoingList }
                        history={ this.props.history } />
            })
          }
        </Card.Group>
      );
    }

    if (dataNotFound) {
      return(
        <div className='nothing-found-msg'>
          <p>Ooops! There is no bars in this area! Please check the spelling or write another location.</p>
        </div>
      );
    }
  }


  render() {
    const { location } = this.state;

    return(
      <div className='search-page'>

        <form className='search-section'>
          <input className='search-input' placeholder='Enter your city' name='location' value={location} onChange={this.handleChange} />
          <button className='search-button' onClick={this.search}>Search</button>
        </form>

        <div className='data-section'>
          {
            this.displayData()
          }
        </div>
      </div>
    );
  }
}

export default Search;
