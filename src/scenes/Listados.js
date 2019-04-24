//React imports
import React, { Component } from 'react'

//React Native imports
import { StyleSheet, FlatList, View, Text, Dimensions, Alert, ScrollView } from 'react-native'

//Components imports
import BackgroundImage from '../components/BackgroundImage'
import DatosToma from '../components/DatosToma'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import Moment from 'moment'

//React Native Router Flux imports
import { Actions } from 'react-native-router-flux'

//Imports from Firebase
import * as firebase from 'firebase'


export default class Listados extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tomas: [],
        }
    }

    //Life cycle
    componentDidMount() {
        //Leer datos de Firebase
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref(userId +'/tomas/').orderByChild('fecha').startAt('20-04-2019').endAt('24-04`19').once('value')
            .then( (snapshot) => {                
                const tomasReaded = snapshot.val()
                const tomas = Object.keys(tomasReaded)
                    .map( (key) => {
                        return tomasReaded[key]
                    })
                this.setState({
                    tomas: tomas,
                })
            })
    }
    //Functions

    //Renders
    renderToma(item) {
        const toma = item.item
        return(
            <View style={ styles.container }>
                <Text style={ styles.textStyle }>{ toma.fecha }</Text>
                <Text style={ styles.textStyle }>{ toma.alta }</Text>
                <Text style={ styles.textStyle }>{ toma.baja }</Text>
                <Text style={ styles.textStyle }>{ toma.pulso }</Text>
            </View>
        )
    }

    render() {
        return(
            <BackgroundImage source={ require('../../resources/Background_Image.png') }>
                <View style={ [styles.container, { marginTop: 110 }] }>
                    <Text style={ styles.textStyle }>Fecha</Text>
                    <Text style={ styles.textStyle }>Alta</Text>
                    <Text style={ styles.textStyle }>Baja</Text>
                    <Text style={ styles.textStyle }>Pulso</Text>
                </View>
                <FlatList 
                    style={{ marginTop: 10 }}
                    data={ this.state.tomas }
                    renderItem={ (item) => this.renderToma(item) }
                    extraData={ this.state }
                    keyExtractor={ (item) => item.fecha }
                />
            </BackgroundImage>
        )
    }
}

//Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //justifyContent: 'center',
        //alignItems: 'center',
        marginTop: 10,
        //marginBottom: 30,
    },
    textStyle: {
        marginLeft: 20,
        marginRight: 20,
    }
});