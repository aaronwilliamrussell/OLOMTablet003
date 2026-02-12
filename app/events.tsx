import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, FlatList, Keyboard, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import {Calendar} from 'react-native-calendars'
import AsyncStorage from '@react-native-async-storage/async-storage';

const events = () => {
//Log in authentication
useEffect( () => {
  const getLogin = async() => {
    try {
      const login = await AsyncStorage.getItem('adminpriv');
      if (login !== null) {
        console.log(JSON.parse(login))
      }
      if (login == "true"){
        console.log("Welcome to the event page, admin")
        //TODO - show delete/add/edit buttons on events
      }
      else if (login == "false"){
        console.log("Visitor detected")
      }
    }
    catch (error){
      console.log(error);
    }
  }
  getLogin();
},[]
)

// States  

//Selected date (string)
const [selected, setSelected] = useState('');
//Modal that pops up when you select a date
const[modal, setModal] = useState(false);


  return (
    <View style = {styles.container}>
      <Calendar
  // Customize the appearance of the calendar
  style={{
    borderWidth: 1,
    borderColor: 'gray',
    height: 1000,
    
  }}
  // Specify the current date
  current={new Date().toDateString()}
  // Callback that gets called when the user selects a day
  onDayPress={day => {
    console.log('selected day', day);
    setSelected(day.dateString);
    //Open modal for date 
  }}
  // Mark specific dates as marked (do this later)
  markedDates={{
    [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'red'}
  }}
/>
    </View>
  )
}

export default events

const styles = StyleSheet.create({
    container: {
    flex:1,
  },

    calendar: {
      width: 'auto',
      height: 'auto',
    },

})