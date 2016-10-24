import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyASdBl32ggjKGePkRmW8wn-xHwLGu65zFY',
      authDomain: 'manager-b981a.firebaseapp.com',
      databaseURL: 'https://manager-b981a.firebaseio.com',
      storageBucket: 'manager-b981a.appspot.com',
      messagingSenderId: '84303593220'
    };

    firebase.initializeApp(config);
  }
  render() {
    // root component's Provider tag takes an instance of Redux store
    // createStore: 1st argument is root reducer
    // 2nd is initial state for prepopulation, 3rd is store enhancers
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
