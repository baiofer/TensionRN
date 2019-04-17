//React imports
import React, { Component } from 'react';

//React native imports
import { StyleSheet, Text, View } from 'react-native';



export default class App extends Component {

  //Life cycle

  //Webservices

  //Functions

  //Renders
  render() {
    if (isLogged) {
      return (this.renderNavigation2())
    } else {
      return (this.renderNavigation1())
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
