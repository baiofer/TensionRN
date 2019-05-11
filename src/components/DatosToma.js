//React imports
import React, { Component } from 'react'

//React native imports
import { StyleSheet, View, Dimensions } from 'react-native'

//Icon imports
import Icon from 'react-native-vector-icons/FontAwesome';

//Components imports
import AppInput from './AppInput'
import AppButton from './AppButton'

//PropTypes imports
import PropTypes from 'prop-types'


export default class DatosToma extends Component {

    static propTypes = {
        onAccept: PropTypes.func,
        styleToma: PropTypes.object,
        alta: PropTypes.string,
        baja: PropTypes.string,
        pulso: PropTypes.string,
    }

    static defaultProps = {
        onAccept: () => {},
        styleToma: {},
        alta: '',
        baja: '',
        pulso: '',
    }

    constructor(props) {
        super(props)
        this.state = {
            alta: this.props.alta,
            altaError: '',
            baja: this.props.baja,
            bajaError: '',
            pulso: this.props.pulso,
            pulsoError: '',
            selected: false,
        }
    }

    //Functions
    validateForm() {
        let valid = true
        let errors = {}
        if (!this.state.alta || this.state.alta === '0') {
            errors.alta = 'Alta'
            valid = false
        }
        if (!this.state.baja || this.state.baja === '0') {
            errors.baja = 'Baja'
            valid = false
        }
        if (!this.state.pulso || this.state.pulso === '0') {
            errors.pulso = 'Pulso'
            valid = false
        }
        if (errors.alta) {
            this.setState({
                altaError: errors.alta ? errors.alta : '',
                alta: '0',
            })
            valid = false
        } else {
            this.setState({
                altaError: '',
            })
        }
        if (errors.baja) {
            this.setState({
                bajaError: errors.baja ? errors.baja : '',
                baja: '0',
            })
            valid = false
        } else {
            this.setState({
                bajaError: '',
            })
        }
        if (errors.pulso) {
            this.setState({
                pulsoError: errors.pulso ? errors.pulso : '',
                pulso: '0',
            })
            valid = false
        } else {
            this.setState({
                pulsoError: '',
            })
        }
        return valid
    }

    cogerDatos() {
        if (this.validateForm()) {
            const { alta, baja, pulso } = this.state
            this.setState({
                selected: true,
            })
            this.props.onAccept(alta, baja, pulso)
        }
    }

    //RENDER
    render() {
        const { styleToma } = this.props
        const { selected } = this.state
        const iconColorOK = selected ? iconColor='green' : iconColor='grey'
        return (
            <View style={ [styles.container, styleToma] }>
                <AppInput 
                    placeholder= '0'
                    value={ this.state.alta }
                    error={ this.state.altaError }
                    onChangeText={ (v) => this.setState({ alta: v })}
                    inputStyle={{ width: (Dimensions.get('window').width - 40) / 4, marginRight: 10 }}
                    label='Alta'
                    labelStyle={{ color: '#3594c5' }}
                />
                <AppInput 
                    placeholder= '0'
                    value={ this.state.baja }
                    error={ this.state.bajaError }
                    onChangeText={ (v) => this.setState({ baja: v })}
                    inputStyle={{ width: (Dimensions.get('window').width - 40) / 4, marginRight: 10 }}
                    label='Baja'
                    labelStyle={{ color: '#3594c5' }}
                />
                <AppInput 
                    placeholder= '0'
                    value={ this.state.pulso }
                    error={ this.state.pulsoError }
                    onChangeText={ (v) => this.setState({ pulso: v })}
                    inputStyle={{ width: (Dimensions.get('window').width - 40) / 4, marginRight: 10 }}
                    label='Pulso'
                    labelStyle={{ color: '#3594c5' }}
                />
                <AppButton
                        bgColor='transparent'
                        onPress={ () => this.cogerDatos() }
                        label=''
                        iconName='check'
                        iconSize={ 30 }
                        iconColor={ iconColorOK }
                        buttonStyle={ styles.loginButton }
                    /> 
            </View>
        )
    }
}

//Styles
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20
    },
    loginButton: {
        width: 50,
        alignItems: 'center',
    },
  });