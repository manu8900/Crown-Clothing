import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component'
import './pages/homepage/homepage.styles.scss'
import ShopPage from './pages/shop/shop.component'
import './App.css';
import Header from './components/header/header.component'
import signInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth } from './firebase/firebase.utils'



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount() {//Lifecycle method of react
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);

    })
  }
  componentWillUnmount() {//Lifecycle method of react
    this.unsubscribeFromAuth();
  }
  render() {
    return (<div>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={signInAndSignUpPage} />
      </Switch>
    </div>
    );

  }
}

export default App;
