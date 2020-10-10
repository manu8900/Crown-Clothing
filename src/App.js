import React,{lazy,Suspense} from 'react';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './pages/homepage/homepage.styles.scss';
import { GlobalStyle } from './global.styles';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.action'
import { selectCurrentUser } from './redux/user/user.selectors';
import Spinner from './components/spinner/spinner.component';
//-----------------------LAZY LOADED ROUTES-------------------------//

const HomePage = lazy(()=>import('./pages/homepage/homepage.component'));
const ShopPage = lazy(()=> import('./pages/shop/shop.component'));
const CheckoutPage = lazy(()=>import('./pages/checkout/checkout.component')); 
const SignInAndSignUpPage = lazy(()=>import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));

//------------------------------------------------------------------//
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
        <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />

          <Route exact path='/signin'
            render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
        </Suspense>
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
