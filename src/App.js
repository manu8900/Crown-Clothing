import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component'
import './pages/homepage/homepage.styles.scss'
import ShopPage from './pages/shop/shop.component'
import './App.css';
import Header from './components/header/header.component'
import signInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount() {//Lifecycle method of react
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state);//since setstate is async function we call another func to log it!
          })
        })

      }
      this.setState({ currentUser: userAuth });
    })
  }
  componentWillUnmount() {//Lifecycle method of react
    this.unsubscribeFromAuth();
  }
  render() {
    return (<div>
      <Header currentUser={this.state.currentUser} />
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
