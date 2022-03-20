import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from './Button';
import { useStateValue } from '../ContextAPI/StateProvider';
import './Navbar.css';
import { auth } from '../firebase';

function Navbar() {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [{ basket, user }] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      history.push('/');
    }
  };

  const signInSection = user ? (
    <Button buttonStyle="btn--outline" onClick={handleAuthentication}>
      Sign Out
    </Button>
  ) : (
    <Link to="/sign-up">
      <Button buttonStyle="btn--outline">Sign In</Button>
    </Link>
  );

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            TRVL <i className="fab fa-typo3"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/packages"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Packages
              </Link>
            </li>
            <li>
              <Link
                to="/destinations"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Destinations
              </Link>
            </li>
            <li>
              <Link
                to="/contactus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/orders"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/checkout"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    {basket.length !== 0 ? (
                      <>
                        <div className="basketTotal_icon"></div>
                        <div className="basketTotal_value">{basket.length}</div>
                      </>
                    ) : null}
                  </Link>
                </li>
              </>
            ) : null}

            <li>
              <Link
                to="/"
                className="nav-links greetUser"
                onClick={closeMobileMenu}
              >
                <div>Hello</div>
                <div>{user ? `${user.email}` : 'Guest'}</div>
              </Link>
            </li>
          </ul>
          {button && signInSection}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
