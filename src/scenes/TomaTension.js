//React imports
import React, { Component } from 'react'

//React Native imports
import { StyleSheet, View, Text, Dimensions, Alert, ScrollView } from 'react-native'

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


export default class Perfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alta1: '0',
            alta2: '0',
            alta3: '0',
            altaMedia: '0',
            baja1: '0',
            baja2: '0',
            baja3: '0',
            bajaMedia: '0',
            pulso1: '0',
            pulso2: '0',
            pulso3: '0',
            pulsoMedia: '0',
            hayDatos: false,
            fechaHoy: Moment().format('DD-MM-YYYY'),
            fechaHoyError: '',
        }
    }
    //Functions
    aceptar() {
        const toma = this.calculateMedia()
        Alert.alert(
            'TOMA A GUARDAR',
            'Fecha: ' +toma.fecha + '\n'+ 'Alta: ' + toma.alta + '\n' + 'Baja: ' + toma.baja  + '\n' + 'Pulso: ' + toma.pulso,
            [ {text: 'OK', onPress: () => this.guardaToma(toma)} ]
        )
    }

    toma1(alta, baja, pulso) {
        this.setState({
            alta1: alta,
            baja1: baja,
            pulso1: pulso,
        })
    }

    toma2(alta, baja, pulso) {
        this.setState({
            alta2: alta,
            baja2: baja,
            pulso2: pulso,
        })
    }

    toma3(alta, baja, pulso) {
        this.setState({
            alta3: alta,
            baja3: baja,
            pulso3: pulso,
        })
    }

    calculateMedia() {
        const { alta1, alta2, alta3, baja1, baja2, baja3, pulso1, pulso2, pulso3 } = this.state
        var datos = 0
        if (alta1 !== '0') datos = datos + 1
        if (alta2 !== '0') datos = datos + 1
        if (alta3 !== '0') datos = datos + 1
        if (datos !== 0) {
            const mediaAlta = Math.trunc((parseInt(alta1) + parseInt(alta2) + parseInt(alta3)) / datos)
            const mediaBaja = Math.trunc((parseInt(baja1) + parseInt(baja2) + parseInt(baja3)) / datos)
            const mediaPulso = Math.trunc((parseInt(pulso1) + parseInt(pulso2) + parseInt(pulso3)) / datos)           
            this.setState({
                altaMedia: mediaAlta.toString(),
                bajaMedia: mediaBaja.toString(),
                pulsoMedia: mediaPulso.toString(),
                hayDatos: true,
            })
            const toma = {
                alta: mediaAlta.toString(),
                baja: mediaBaja.toString(),
                pulso: mediaPulso.toString(),
                fecha: this.state.fechaHoy,
            }
            return toma
        }
    }

    guardaToma(toma) {
        //Guardar dato en Firebase
        var database = firebase.database()
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref(userId +'/tomas/' + toma.fecha).set(toma)
    }

    //Renders
    renderMedia() {
        if (!this.state.hayDatos) return null
        const { altaMedia, bajaMedia, pulsoMedia } = this.state
        return(
            <View>
                <Text style={ styles.textStyle }>
                Media
                </Text>
                <View style={ styles.mediaStyle }>
                    <Text style={ styles.labelStyle }>Alta</Text>
                    <Text style={ styles.labelStyle }>Baja</Text>
                    <Text style={ styles.labelStyle }>Pulsaciones</Text>
                </View>
                <View style={ styles.mediaStyle }>
                    <Text style={ styles.labelStyle }>{ altaMedia }</Text>
                    <Text style={ styles.labelStyle }>{ bajaMedia }</Text>
                    <Text style={ styles.labelStyle }>{ pulsoMedia }</Text>
                </View>
            </View>
        )
    }

    render() {
        const fechaHoy = Moment().format('DD-MM-YYYY')
        return(
            <BackgroundImage source={ require('../../resources/Background_Image.png') }>
                <ScrollView style={ styles.container }>
                <AppInput 
                    //placeholder= { fechaHoy }
                    value={ this.state.fechaHoy }
                    error={ this.state.fechaError }
                    onChangeText={ (v) => this.setState({ fechaHoy: v })}
                    inputStyle={{ width: (Dimensions.get('window').width - 20), marginRight: 10 }}
                    //label='Alta'
                    //labelStyle={{ color: '#3594c5' }}
                />
                    <Text style={ styles.textStyle }>
                        Toma 1
                    </Text>
                    <DatosToma 
                        onAccept={ (alta, baja, pulso) => this.toma1(alta, baja, pulso) }
                        styleToma={ styles.datosStyle }
                    />
                    <Text style={ styles.textStyle }>Toma 2</Text>
                    <DatosToma 
                        styleToma={ styles.datosStyle }
                        onAccept={ (alta, baja, pulso) => this.toma2(alta, baja, pulso) }
                    />
                    <Text style={ styles.textStyle }>Toma 3</Text>
                    <DatosToma 
                        styleToma={ styles.datosStyle }
                        onAccept={ (alta, baja, pulso) => this.toma3(alta, baja, pulso) }
                    />
                    { this.renderMedia() }
                    <AppButton
                        bgColor='#3594c5'
                        onPress={ () => this.aceptar() }
                        label='Aceptar'
                        labelColor='#575959'
                        //iconColor='#BEBBBB'
                        buttonStyle={ styles.loginButton }
                    /> 
                </ScrollView>
            </BackgroundImage>
        )
    }
}

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        marginTop: 110,
        //marginBottom: 30,
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3594c5',
        marginLeft: 20,
    },
    datosStyle: {
        marginTop: 20,
    },
    loginButton: {
        marginBottom: 20,
        marginLeft: 10
    },
    labelStyle: {
        //backgroundColor: '#BEBBBB',
        fontSize: 16,
        color: '#3594c5',
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 10,
        //height: 50,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        marginBottom: 10,
        width: (Dimensions.get('window').width - 40) / 3,
    },
    mediaStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 20,
        //marginBottom: 30
      },
});