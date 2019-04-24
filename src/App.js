//React imports
import React, { Component } from 'react';

//React native imports
import { AsyncStorage, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

//React Native Router Flux imports
import { Actions, Router, Scene } from 'react-native-router-flux'

//Icons imports
import Icon from 'react-native-vector-icons/FontAwesome';

//Firebase imports
import firebaseConfig from '../src/utils/firebase'
//import * as firebase from 'firebase'
import firebase from '@firebase/app'
import '@firebase/auth'
firebase.initializeApp(firebaseConfig)

//Imports Components
import Preloader from './components/Preloader';

//Scenes imports
import SignIn from './scenes/SignIn'
import Register from './scenes/Register'
import TomaTension from './scenes/TomaTension'
import Listados from './scenes/Listados'


export default class App extends Component {

  constructor() {
    super()
    this.state = {
      isLogged: false,
      loaded: false,
      userLogged: '',
    }
  }

  //Life cycle
  async componentDidMount() {
    await firebase.auth().onAuthStateChanged( (user) => {
      if (user !== null) {
        this.setState({
          isLogged: true,
          loaded: true,
          userLogged: user.email,
        })
        //Save userLogged
        AsyncStorage.setItem('userLogged', user.email)
        .catch( (error) => {
            if (this._isMounted) {
                this.setState({
                    loaded: true,
                })
            }
            console.log('Error saving userLogged. ', error)
          })
      } else {
        this.setState({
          isLogged: false,
          loaded: true,
          userLogged: '',
        })
        //Save userLogged empty
        AsyncStorage.setItem('userLogged', '')
        .catch( (error) => {
            if (this._isMounted) {
                this.setState({
                    loaded: true,
                })
            }
            console.log('Error saving userLogged. ', error)
          })
      }
    })
  }

  //Webservices

  //Functions
  logout() {
    //Logout firebase
    firebase.auth().signOut()
    Actions.SignIn()
  }

  //Renders
  renderLogoutButton() {
    return (
      <TouchableOpacity 
        style={ styles.cartButton } 
        onPress={ () => this.logout() }
      >
        <Icon 
          style={{ color: '#3594c5' }} 
          name="eject"
          type='FontAwesome'
          size={ 25 }
        />
      </TouchableOpacity>
    )
  }

  renderListingButton() {
    return (
      <TouchableOpacity 
        style={ styles.cartButton } 
        onPress={ () => Actions.Listados() }
      >
        <Icon 
          style={{ color: '#3594c5' }} 
          name="list-ol"
          type='FontAwesome'
          size={ 25 }
        />
      </TouchableOpacity>
    )
  }

  renderTitle() {
    return(
      <View style={ styles.titleNav }>
        <Text style={ styles.title }>Toma de tensión</Text>
        <Text style={ styles.subtitle }>{ this.state.userLogged }</Text>
      </View>
    )
  }

  //Guest Navigation
  renderNavigation1() {
    return (
      <Router>
        <Scene key='root'>
          <Scene 
            key={ 'SignIn' }
            component={ SignIn }
            navTransparent={ true }
            title='Iniciar sesión'
            titleStyle={ styles.title }
          />
          <Scene 
            key={ 'Register' }
            component={ Register }
            navTransparent={ true }
            navBarButtonColor={ '#3594c5' }
            title='Regístro'
            titleStyle={ styles.title }
          />
          <Scene 
            key={ 'TomaTension' }
            component={ TomaTension }
            navTransparent={ true }
            navBarButtonColor={ '#3594c5' }
            navigationBarStyle={ styles.navBar }
            renderRightButton={ this.renderLogoutButton() }
            renderLeftButton={ this.renderListingButton() }
            renderTitle={ this.renderTitle() }
          />
          <Scene 
            key={ 'Listados' }
            component={ Listados }
            navTransparent={ true }
            navBarButtonColor={ '#3594c5' }
            title='Listados'
            titleStyle={ styles.title }
          />
        </Scene>
      </Router>
    );
  }

  renderNavigation2() {
    return (
      <Router>
        <Scene key='root'>
          <Scene 
            key={ 'TomaTension' }
            component={ TomaTension }
            navTransparent={ true }
            navBarButtonColor={ '#3594c5' }
            navigationBarStyle={ styles.navBar }
            renderRightButton={ this.renderLogoutButton() }
            renderLeftButton={ this.renderListingButton() }
            renderTitle={ this.renderTitle() }
          />
          <Scene 
            key={ 'SignIn' }
            component={ SignIn }
            navTransparent={ true }
            title='Iniciar sesión'
            titleStyle={ styles.title }
          />
          <Scene 
            key={ 'Register' }
            component={ Register }
            navTransparent={ true }
            navBarButtonColor={ '#3594c5' }
            title='Regístro'
            titleStyle={ styles.title }
          />
          <Scene 
            key={ 'Listados' }
            component={ Listados }
            navTransparent={ true }
            navBarButtonColor={ '#3594c5' }
            title='Listados'
            titleStyle={ styles.title }
          />
        </Scene>
      </Router>
    );
  }

  //Renders
  render() {
    const { isLogged, loaded } = this.state
    if (!loaded) {
      return (<Preloader />)
    }
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
    backgroundColor: '#575959',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  navBar: {
    //backgroundColor: '#515456',
  },
  cartButton: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleNav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#4c9ace',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#4c9ace',
    fontSize: 15,
  },
});
