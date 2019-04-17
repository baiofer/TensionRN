//React imports
import React, { Component } from 'react'

//React native imports
import { Image, Dimensions } from 'react-native'


export default class LogoImage extends Component {
    render() {
        return(
            <Image
                source={ require('../resources/Logo.png') }
                style={{ width: Dimensions.get('window').width - 20, height: 100, marginBottom: 20 }}
                resizeMode='contain'
            >
            </Image>
        )
    }
}