//React imports
import React, { Component } from 'react'

//React Native imports
import { StyleSheet, View } from 'react-native'

//PropTypes imports
import PropTypes from 'prop-types'

//Picker imports
import CalendarPicker from 'react-native-calendar-picker'

//Requires react-native-calendar-picker dependency
// npm install react-native-calendar-picker --save


export default class Calendar extends Component {
    static propTypes = {
        onSelect: PropTypes.func,
        width: PropTypes.number,
        height: PropTypes.number,
        bgColor: PropTypes.string,
    }

    static defaultProps = {
        width: 200,
        height: 200,
        bgColor: '#BEBBBB',
        onSelect: () => {},
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedStartDate: null,
        }
        this.onDateChanged = this.onDateChanged.bind(this)
    }

    onDateChanged(date) {
        const year = date._i.year
        let month = date._i.month+1
        if (month < 10) { month = '0' + month }
        let day = date._i.day
        if (day < 10) { day = '0' + day }
        const dateAppo = day + '-' + month + '-' + year
        this.props.onSelect(dateAppo)
    }

    render() {
        return(
            <View style={ styles.calendarContainer }>
                <CalendarPicker 
                    onDateChange={ this.onDateChanged }
                    startFromMonday={ true }
                    weekdays={ ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom' ] }
                    months={ ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] }
                    selectedDayColor={ '#444054' }
                    todayBackgroundColor={ '#444054' }
                    width={ this.props.width }
                    height={ this.props.height }
                    selectedDayTextColor={ '#BEBBBB' }
                    previousTitle={ 'Anterior' }
                    nextTitle={ 'Siguiente' }
                    textStyle={ styles.textStyle }
                />
            </View>
        )
    }
}

//Styles
const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 15,
    },
    loginButtonStyle: {
        marginLeft: 20,
        marginTop: 35,
    },
    textStyle: {
        color: '#3594c5'
    }
});