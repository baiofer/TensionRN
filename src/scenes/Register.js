//React imports
import React, { Component } from 'react'

//React Native imports
import { StyleSheet, View, Text, Alert } from 'react-native'

//Components imports
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import LogoImage from '../components/LogoImage'

//Imports from Firebase
//import * as firebase from 'firebase'
import firebase from '@firebase/app'
import '@firebase/auth'

//Validate.js imports
import validator from 'email-validator'



export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            userError: '',
            password: '',
            passwordError: '',
            repeatPassword: '',
            repeatPasswordError: '',
            token: '',
            tokenOK: false,
        }
    }

    //Webservice functions FIREBASE
    //POST user
    postFirebasePerson() {
        const { user, password } = this.state
            //Register in FIREBASE
            firebase.auth().createUserWithEmailAndPassword(user, password)
                .then( () => {
                    Alert.alert(
                        'Usuario creado en Firebase', 
                        user)
                    //Crear usuario en WP
                    const person = {
                        email: user,
                        username: user,
                        password: password,
                    }
                    this.postWPPerson(person)
                })
                .catch( (error) => {
                    if (error.message === 'The email address is already in use by another account.') {
                        Alert.alert(
                            'Usuario ya creado en Firebase', 
                            error.message,)
                        this.login()
                    } else {
                        Alert.alert(
                            'Error. Usuario no creado en Firebase', 
                            error.message,)
                    }
                })
    }

    //Functions
    validateForm() {
        let valid = true
        let errors = {}
        //Validation of user (email)
        if (!this.state.user) {
            errors.user = 'Introduce un email'
            valid = false
        } else if (!validator.validate(this.state.user)) {
            errors.user = 'Introduce un email válido'
            valid = false
        }
        //Validation of password
        if (!this.state.password) {
            errors.password = 'Introduce un password'
            valid = false
        } else if (this.state.password.length < 5) {
            errors.password = 'El password debe tener al menos 6 caracteres'
            valid = false
        }
        //Confirmation of password
        if (this.state.password !== this.state.repeatPassword) {
            errors.repeatPassword = 'Los passwords deben ser iguales'
            valid = false
        }
        //Update errors for render
        if (errors.user) {
            this.setState({
                userError: errors.user ? errors.user : '',
            })
            valid = false
        } else {
            this.setState({
                userError: '',
            })
        }
        if (errors.password) {
            this.setState({
                passwordError: errors.password ? errors.password : '',
            })
            valid = false
        } else {
            this.setState({
                passwordError: '',
            })
        }
        if (errors.repeatPassword) {
            this.setState({
                repeatPasswordError: errors.repeatPassword ? errors.repeatPassword : '',
            })
            valid = false
        } else {
            this.setState({
                repeatPasswordError: '',
            })
        }
        //Return validation
        return valid
    }
    
    register() {
        if (this.validateForm()) {
            this.postFirebasePerson()
        }
    }

    login() {
        return( <SignIn /> )
    }

    //Renders
    render() {
        return(
            <BackgroundImage source={ require('../resources/Background_Image.png') }>
                <View style={ styles.container }>
                    <LogoImage />
                    <AppInput 
                        placeholder= 'Email'
                        value={ this.state.user }
                        error={ this.state.userError }
                        onChangeText={ (v) => this.setState({ user: v })}
                    />
                    <AppInput 
                        placeholder= 'Password'
                        value={ this.state.password }
                        error={ this.state.passwordError }
                        onChangeText={ (v) => this.setState({ password: v })}
                    />
                    <AppInput 
                        placeholder= 'Confirma el Password'
                        value={ this.state.repeatPassword }
                        error={ this.state.repeatPasswordError }
                        onChangeText={ (v) => this.setState({ repeatPassword: v })}
                    />
                    <AppButton
                        bgColor='#830F52'
                        onPress={ () => this.register()}
                        label='REGISTRO'
                        labelColor='#BEBBBB'
                        iconColor='#BEBBBB'
                        buttonStyle={ styles.loginButton }
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text 
                            style={{ color: '#830F52' }}
                        >
                            Ya tienes una cuenta?
                        </Text>
                        <AppButton
                            bgColor='transparent'
                            onPress={ () => this.login() }
                            label='Iniciar Sesión'
                            labelColor='#830F52'
                            setWidth={ 100 }
                            buttonStyle={ styles.loginStyle}
                        />
                    </View>
                </View>
            </BackgroundImage>
        )
    }
}

//Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 30
    },
    loginButton: {
        marginBottom: 30    ,
    },
    loginStyle: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        height: 20  ,
        borderColor: "transparent",
        borderWidth: 0,
    }
  });