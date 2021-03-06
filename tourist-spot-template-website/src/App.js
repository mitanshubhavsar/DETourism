import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Destinations from './components/pages/Destinations';
import Packages from './components/pages/Packages';
import ContactUs from './components/pages/ContactUs';
import SignUp from './components/pages/SignUp';
import Orders from './components/pages/Orders';
import Checkout from './components/pages/Checkout';
import { useStateValue } from './ContextAPI/StateProvider';
import { auth } from './firebase';

function App() {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    //will only runs when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user just logged in/the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
        //the user is logged out
      }
    });
  }, [dispatch]);
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        />
      </head>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/packages" component={Packages} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/contactus" component={ContactUs} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Router>
      <script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"
      ></script>
      <script src="https://use.fontawesome.com/f994cc1997.js"></script>
    </>
  );
}

export default App;
