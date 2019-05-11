//React imports
import React, { Component } from 'react'

//React native imports
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'

//Icon imports
import Icon from 'react-native-vector-icons/FontAwesome';

//Components imports
import AppInput from './AppInput'
import Moment from 'moment'
import Calendar from './Calendar'

//PropTypes imports
import PropTypes from 'prop-types'


export default class InputDate extends Component {

    static propTypes = {
        onAccept: PropTypes.func,
        styleInputDate: PropTypes.object,
        iconColor: PropTypes.string,
        dateToShow: PropTypes.string,
    }

    static defaultProps = {
        onAccept: () => {},
        styleInputDate: {},
        iconColor: '#3594c5',
        dateToShow: Moment().format('DD-MM-YYYY'),
    }

    constructor(props) {
        super(props)
        this.state = {
            fechaError: '',
            fechaSeleccionada: '',
            fechaMostrar: this.props.dateToShow,
            showCalendar: false,
        }
    }

    //Functions
    
    selectDay() {
        this.setState({
            showCalendar: true
        })
    }

    //RENDER
    renderCalendar() {
        if (this.state.showCalendar) {
            return (
                <Calendar 
                    onSelect={ (date) => { 
                        this.setState({
                            fechaMostrar: date,
                            showCalendar: false
                        })
                        this.props.onAccept(date)
                    }}
                    bgColor='transparent'
                    height={ 250 }
                    width={ 250 }
                />
            )
        }
    }

    render() {
        return (
            <View>
                <View style={ [styles.calendarStyle, this.props.styleInputDate] }>
                    <AppInput 
                        value={ this.state.fechaMostrar }
                        error={ this.state.fechaError }
                        onChangeText={ (v) => this.setState({ fechaSeleccionada: v })}
                        inputStyle={{ width: (Dimensions.get('window').width - 20) / 3, marginLeft: 3 }}
                    />
                    <TouchableOpacity 
                        style={{
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            height: 50,
                            borderColor: "transparent",
                            borderWidth: 0,
                            //borderRadius: 25,
                            //marginBottom: 10,
                            //width: width,
                        }} 
                        onPress={ () => this.selectDay() }
                    >
                        <Icon
                            name={ 'calendar' }
                            size={ 30 }
                            color={ this.props.iconColor }
                        />               
                    </TouchableOpacity>
                </View>
                { this.renderCalendar() }
            </View>
        )
    }
}

//Styles
const styles = StyleSheet.create({
    calendarStyle: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
    },
  });