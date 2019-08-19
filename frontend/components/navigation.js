import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import appRoutes from 'src/constants/routes';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    const { clearUser } = this.props;
    localStorage.removeItem('jwt-token');
    clearUser();
    window.location.href = appRoutes.login;
  }

  render() {
    return (
      <nav className='navigation'>
        <div className='nav-left'>
          <NavLink to={appRoutes.home} activeClassName='' className='nav-item__logo'>
            app
          </NavLink>
        </div>
        <div className='nav-right'>
          <NavItem url={appRoutes.home} text='Home' />
          {
            // <div className='nav-item' onClick={this.logout}>
            //   Logout
            // </div>
          }
        </div>
      </nav>
    );
  }
}

function NavItem({ url, text }) {
  return (
    <NavLink to={url} activeClassName='selected' className='nav-item'>
      { text }
    </NavLink>
  );
}
