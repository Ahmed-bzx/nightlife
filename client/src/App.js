import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';

import Home from './pages/Home';
import Search from './pages/Search';
import MyGoingList from './pages/MyGoingList';
import About from './pages/About';
import Signin from './pages/Signin';

import Avatar from './components/Avatar';
import './css/App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      user: {}
    }
  }

  componentDidMount() {
    this.isAuth()
  }

  closeMenu = () => this.setState({ isOpen: false })

  isAuth() {
    fetch('/api/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
    .then(response => response.json())
    .then((user) => {
      this.setState({
        user: {
          id: user.google.id,
          name: user.google.name,
          image: user.google.image,
          goingList: user.goingList
        }
      });
    })
    .catch((err) => console.log(err))
  }

  updateGoingList = (goingList) => {
    let { user } = this.state;
    user.goingList = goingList;
    this.setState({ user: user })
  }


  render() {
    const { user } = this.state;

    return (
      <Router>
        <div id="outer-container">
          <Menu isOpen={ this.state.isOpen } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
            {
              user.id ? <Avatar user={ user } /> : null
            }
            <Link to='/' name='home' onClick={this.closeMenu}>Home</Link>
            <Link to='/search' name='search' onClick={this.closeMenu}>Search</Link>
            {
              user.id ? <Link to='/myGoingList' name='myGoingList' onClick={this.closeMenu}>My Going List</Link> : null
            }
            <Link to='/about' name='about' onClick={this.closeMenu}>About</Link>
            {
              user.id  ? (
                <a href='/auth/logout'>Logout</a>
              ) : (
                <Link to='/signin' name='signin' onClick={this.closeMenu}>Sign in</Link>
              )
            }
          </Menu>

          <main id="page-wrap">
            <div className='app'>
              <Route exact path='/' component={ Home } />
              <Route exact path='/search' render={ props => <Search user={ user } updateGoingList={ this.updateGoingList } {...props}/> } />
              <Route exact path='/myGoingList' render={ props => <MyGoingList user={ user } updateGoingList={ this.updateGoingList } {...props}/> } />
              <Route exact path='/about' component={ About } />
              <Route exact path='/signin' component={ Signin } />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
