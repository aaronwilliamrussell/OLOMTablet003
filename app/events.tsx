import { StyleSheet, Text, View, TextInput, Pressable, Modal, KeyboardAvoidingView, FlatList, Keyboard, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import {Calendar} from 'react-native-calendars'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Filter} from 'bad-words'

type EventType = {
  id: number;
  eventDate: string;
  title: string;
  location: string;
  description:string;
  time: string;
  amPM: string;


};

const events = () => {
//Filter for all those bad words
const filter = new Filter();

//Log in authentication
useEffect( () => {
  const getLogin = async() => {
    try {
      const login = await AsyncStorage.getItem('adminpriv');
      if (login !== null) {
        // console.log(JSON.parse(login))
      }
      if (login == "true"){
        // console.log("Welcome to the event page, admin")
        show();
      }
      else if (login == "false"){
        // console.log("Visitor detected")
        hide();
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

//Set event
const [events, setEvents] = useState<EventType[]>([]);
//Masterlist
const [allEvents, setAllEvents] = useState<EventType[]>([]);
//Set title of event
const [title, setTitle] = useState<string>('');
//Set location of event
const [location, setLocation] = useState<string>('');
//Set description of event
const [description, setDescription] = useState<string>('');
//Set time of event
const [time, setTime] = useState<string>('');
//Set sm/pm of event
const [amPm, setAmpm] = useState<string>('');
//Selected date (string)
const [selected, setSelected] = useState('');


//Modal that pops up when you select a date
const[modal, setModal] = useState(false);
const showModal = () => setModal(true);
const hideModal = () => {setModal(false)};
//States to show add/edit/delete functions for each event
const[adminButtons, setAdmin] = useState(false);
const show = () => setAdmin(true);
const hide = () => setAdmin(false);
//States to show event creation modal
const[eventCreate, setEventCreate] = useState(false);
const showCreate = () => setEventCreate(true);
const hideCreate = () => setEventCreate(false);

//Getter function for events
useEffect( () => {
  const getEvents = async() => {
    try {
      const eventsJson = await AsyncStorage.getItem('my-events');
      if (eventsJson !== null){
        const parsed = JSON.parse(eventsJson) as EventType[];
        setAllEvents(parsed);
        setEvents(parsed);
        console.log("Events from getEvents:  " + eventsJson);
      }
    } 
    catch (error){
      console.log (error);
    }
  } 
  getEvents();
},[])


//Adding a new event

const addEvent = async () => {
  try {
    const newEvent: EventType = {
      id: Math.random(),
      eventDate: selected,
      title: title,
      location: location,
      description: description,
      time: time,
      amPM: amPm
    };

    if (title == "" || description == ""){
      alert("Cannot be blank");
      setTitle('');
      setLocation('');
      setDescription('');
      Keyboard.dismiss();
      return;
    }

    // Create a new array (do not mutate state)
    const updated = [...allEvents, newEvent];
    setAllEvents(updated);
    setEvents(updated);
    await AsyncStorage.setItem('my-events', JSON.stringify(updated));

    setTitle('');
    setLocation('');
    setDescription('');
    setTime('');
    setAmpm('');
    alert("Submitted!");
    Keyboard.dismiss();
  }
  catch(error) {
    console.log (error);
  }
}

//Deleting an event
const deleteEvent = async (id:number) => {
  try {
    // filter from master list
    const updated = allEvents.filter((event) => event.id !== id);
    await AsyncStorage.setItem("my-events", JSON.stringify(updated));
    setAllEvents(updated);
    setEvents(updated);
  } 
  catch(error) {
    console.log(error);
  }
}


//Editing an event (work in progess!!!)
const editEvent = () => {
  console.log("Editing event...")
}

//Function to return only events for the data selected (This somewhat works, but only once. I wonder what's going on)

const getEventForDay = (selectedDate: string) => {
  // set selected for calendar marking/modal
  setSelected(selectedDate);
  // filter from the master list using the passed-in date (do NOT rely on 'selected' state immediately)
  const filteredEvents = allEvents.filter((item) => item.eventDate === selectedDate);
  setEvents(filteredEvents);
};

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
  onDayPress= {day =>  {
    getEventForDay(day.dateString)
    showModal();
    //Open modal for date 
  }}
  // Mark specific dates as marked (do this later)
  markedDates={{
    [selected]: {selected: true, disableTouchEvent: false, selectedColor: 'red'}
  }}
  
/>


    <View>
      

        {/* Modal for entries */}
        <Modal
            visible = {modal}
            onRequestClose = {hideModal}
            animationType= "slide"
            transparent>
                <Pressable style = {styles.eventModalUpper} onPress = {hideModal}/>
                <View style= {styles.eventModalLower}>
                    <Text>{selected}</Text>
                    <Text>Just testing something....</Text>

                     {/* Events Viewer Placeholder*/}
                          <View style = {styles.eventsViewer}>
                            {/* Figure out a way to only display the events for the date selected*/}
                            <FlatList 
                            data = {[...events].reverse()} 
                            keyExtractor = {(item) => item.id.toString()} 
                            renderItem={({item}) => (
                              <EventItem ev = {item} deleteEntry={deleteEvent} visible = {adminButtons} />
                            )}/>
                            

                            {/*Add button for event*/}
                            {/* This button is not showing up for some reason, but I don't know why */}
                            {adminButtons && <Pressable
                            style={styles.addButton}
                            onPress={() => {
                              showCreate()
                            }}
                            ></Pressable>}
                          </View> 
                        
                </View>
            </Modal>

            {/* Modal for entry creation */}
            <Modal
            visible = {eventCreate}
            onRequestClose = {hideCreate}
            animationType= "fade"
            transparent>
                <Pressable style = {styles.eventModalUpper} onPress = {hideCreate}/>
                <KeyboardAvoidingView style= {styles.eventModalLower}>
                    <Text style = {styles.eventName}>Make an event</Text>

                    {/* Title: */}
                    <Text style = {styles.eventDescription}>Title:</Text>
                    <TextInput 
                    style = {styles.nameInput} 
                    onChangeText={(title) => setTitle(title)}
                    value = {title}
                    maxLength={50}
                    ></TextInput>
                     
                    {/* Location */}
                    <Text style = {styles.eventDescription}>Location:</Text>
                    <TextInput 
                    style = {styles.nameInput}
                    onChangeText={(location) => setLocation(location)}
                    value = {location}
                    maxLength = {50}
                    ></TextInput>

                    {/* Description */}
                    <Text style = {styles.eventDescription}>Description:</Text>
                    <TextInput 
                    multiline placeholder ="Description" 
                    style = {styles.commentInput}
                    onChangeText={(description) => setDescription(description)}
                    value = {description}
                    maxLength = {500}
                    ></TextInput>

                    {/* considering making these as dropdowns instead??? Maybe would be less redundant */}
                     {/* Time */}
                    <Text style = {styles.eventDescription}>Time:</Text>
                    <TextInput 
                    style = {styles.nameInput}
                    onChangeText={(time) => setTime(time)}
                    value = {time}
                    maxLength = {50}
                    ></TextInput>

                     {/* AM or PM? */}
                    <Text style = {styles.eventDescription}>AM/PM:</Text>
                    <TextInput 
                    style = {styles.nameInput}
                    onChangeText={(amPm) => setAmpm(amPm)}
                    value = {amPm}
                    maxLength = {50}
                    ></TextInput>


              
                    {/* Button */}
                    <Pressable style = {styles.submitButton} onPress={() => addEvent()}> {/* <---- get rid of this after!!!*/}
                      <Text style = {styles.buttonText}>Submit</Text>
                    </Pressable>  
                </KeyboardAvoidingView>
            </Modal>
        </View>
    </View>
  )
}

//Here's a component for an entry. Make sure it *returns* the view. Looooots of stuff to change here
const EventItem = ({ev, visible, deleteEntry} : {ev: EventType, visible:boolean, deleteEntry: (id: number) => void}) => {
  return (
  <View style = {styles.eventEntry}>
            
            <Text style = {styles.eventName}>{ev.eventDate} </Text>
            <Text style = {styles.eventName}>{"\n"}{ev.title}</Text>
            <Text style = {styles.eventDescription}>{"\n"}{ev.description} </Text>

            {/* Admin buttons */}
            {/* Delete button */}
            {visible && <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              deleteEntry(ev.id);
              alert("Deleted entry!");
            }}>
            <Ionicons  name= "trash" size={30} color={'grey'} /></TouchableOpacity>}
            {/* Edit button */}
            {visible && <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              //Edit entry function call (be sure to put this into the props above)
              alert("Edited entry!");
            }}>
            <Ionicons  name= "pencil-outline" size={30} color={'grey'} /></TouchableOpacity>}
            
            
           
            <View style = {styles.lineSeparator}></View>
            
        
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

    eventModalUpper: {
      height:100,
      backgroundColor:'#DDD',
      opacity:0.5,
  },

    eventModalLower:{
      flex: 1, 
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
  },
  //The problem lies here....let's keep tabs on it
   eventsViewer: {
    backgroundColor: 'rgb(233, 233, 233)',
    borderColor:'rgba(9, 255, 0, 0.51)',
    borderWidth: 2,
    borderRadius: 30,
    width: "100%",
    height: "90%",
  },
  eventEntry: {
    flexDirection: 'column',
    padding: 20,

  },
   eventName: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 30,
    fontWeight: 'bold',
  },

  eventDescription: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row-reverse',
  },
   lineSeparator: {
    backgroundColor:'rgba(148, 148, 148, 0.7)',
    width: '20%',
    height: 2,
    marginTop: 50,
    alignSelf: 'center'

  },
  addButton: {
    backgroundColor:'rgba(0, 38, 255, 0.7)',
    borderColor:'rgba(0, 38, 255, 0.7)',
    borderRadius:30,
    height:100,
    width:100,
  },
  nameInput: {
    flex:0.5,
    height: 'auto',
    borderWidth: 2,
    borderColor: 'rgba(110, 110, 110, 0.51)',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
    padding:5,
    fontSize:30

  },
    commentInput: {
    flex:5,
    height: 'auto',
    marginBottom: '1%',
    borderWidth: 2,
    borderColor: 'rgba(110, 110, 110, 0.51)',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 10, 
    textAlign: 'auto',
    padding:5,
    fontSize:30
  },
    submitButton:{
    flex:1,
    height:'auto',
    width:'50%',
    borderRadius: 30, 
    borderColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgba(161, 161, 161, 0.7)',
    margin: 'auto'
  },

  buttonText: {
    color:'rgb(255, 255, 255)',
    fontFamily: "arial",
    fontSize: 60,
    fontWeight: 'bold',
    paddingTop: 15,
    textAlign: 'center',
  },

})