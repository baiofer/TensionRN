//React imports
import React, { Component } from 'react';

//React native imports
import { StyleSheet, Text, View } from 'react-native';

//Firebase imports
import firebaseConfig from '..'
//import * as firebase from 'firebase'
import firebase from '@firebase/app'
import '@firebase/auth'
firebase.initializeApp(firebaseConfig)

//Imports Components
import BackgroundImage from './components/BackgroundImage'
import Preloader from './components/Preloader';
import SignIn from './scenes/SignIn'


export default class App extends Component {

  constructor() {
    super()
    this.state = {
      isLogged: false,
      loaded: false,
    }
  }

  //Life cycle
  async componentDidMount() {
    await firebase.auth().onAuthStateChanged( (user) => {
      if (user !== null) {
        this.setState({
          isLogged: true,
          loaded: true,
        })
      } else {
        this.setState({
          isLogged: false,
          loaded: true,
        })
      }
    })
  }

  //Webservices

  //Functions

  //Renders
  render() {
    const { isLogged, loaded } = this.state
    if (!loaded) {
      return (<Preloader />)
    }
    if (isLogged) {
      return (<SignIn />)
    } else {
      return (<SignIn />)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
