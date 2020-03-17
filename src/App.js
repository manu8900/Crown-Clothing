import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { connect } from 'react-redux';
import Homepage from './pages/homepage/homepage.component'
import './pages/homepage/homepage.styles.scss'
import ShopPage from './pages/shop/shop.component'
// import './App.css';
import { GlobalStyle } from './global.styles';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.action'
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {//Lifecycle method of react
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })

      }
      setCurrentUser(userAuth);

    })
  }
  componentWillUnmount() {//Lifecycle method of react
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />

          <Route exact path='/signin'
            render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );

  }
}
// const mapStateToProps = ({ user }) => ({//get the value of currentUser
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,

})
const mapDispatchtoProps = dispatch => ({//passing ata to user reducer through user action
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(App);
