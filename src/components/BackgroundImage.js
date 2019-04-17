//React imports
import React, { Component } from 'react'

//React native imports
import { ImageBackground } from 'react-native'

//PropTypes imports
import PropTypes from 'prop-types'


export default class BackgroundImage extends Component {

    static propTypes = {
        source: PropTypes.number,
    }

    static defaultProps = {
        source:  require('../resources/Background_Image.png'),
    }

    render() {
        const { source, children } = this.props
        return(
            <ImageBackground
                source={ source }
                style={{ flex: 1, width: null, height: null }}
            >
                { children }
            </ImageBackground>
        )
    }
}