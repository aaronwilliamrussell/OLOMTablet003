import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, FlatList, Keyboard, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Filter} from 'bad-words'

type EntryType = {
  id: number;
  datePosted: string;
  name: string;
  comment: string;

};

export default function guestbook () {
//Functionality for leaving and viewing comments. Admins have the ability to delete posts!


//Filter for all those bad words
const filter = new Filter();

//The states of the component

const [entries, setEntries] = useState<EntryType[]>([]);
const [name, setName] = useState<string>('');
const [comment, setComment] = useState<string>('');
const[visible, setVisible] = useState(false);

//Show and hide functions for the delete buttons
const show = () => setVisible(false);
const hide = () => setVisible(true);

//Getter function to see if I can find the log in info.....
useEffect( () => {
  const getLogin = async() => {
    try {
      const login = await AsyncStorage.getItem('adminpriv');
      if (login !== null) {
        console.log(JSON.parse(login))
      }
      if (login == "true"){
        show();
      }
      else {
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

//Getter function for entries

useEffect( () => {
  const getEntries = async() => {
    try {
      const entries = await AsyncStorage.getItem('my-comment');
      if (entries !== null){
        setEntries(JSON.parse(entries))
      }
    } 
    catch (error){
      console.log (error);
    }
  } 
  getEntries();
},[])

//Adding a new comment 

const addEntry = async () => {

    try {const newEntry = {
      id: Math.random(),
      datePosted: new Date().toDateString(),
      name: name || "Anonymous",
      comment: comment
    };

    if (filter.isProfane(comment)) {
    alert("Inappropriate language!")
    setName('');
    setComment('');
    Keyboard.dismiss();
  } 
    else if (comment == ""){
    alert("Comment cannot be blank")
    setName('');
    setComment('');
    Keyboard.dismiss();
    }

    else {
    entries.push(newEntry);
    setEntries(entries);
    await AsyncStorage.setItem('my-comment', JSON.stringify(entries));
    setName('');
    setComment('');
    alert("Submitted!");
    Keyboard.dismiss();
  }   
  }
  catch(error) {
    console.log ("Something happened? I dunno");
  }
}

//Deleting a comment
const deleteComment = async (id:number) => {
  try {
    const newComment = entries.filter((entry) => entry.id !== id);
    await AsyncStorage.setItem("my-comment", JSON.stringify(newComment));
    setEntries(newComment);
  } 
  catch(error) {
    console.log(error);
  }
}


  return (
    <View style = {styles.container}>

      {/* Submission form */}
      <KeyboardAvoidingView style = {styles.commentsForm} behavior='padding' keyboardVerticalOffset={10}>

      {/* Name: */}
      <Text style = {styles.titleText}>Name:</Text>
      <TextInput 
      style = {styles.nameInput} 
      onChangeText={(name) => setName(name)}
      value = {name}
      maxLength={50}
      ></TextInput>

      {/* Comment */}
      <Text style = {styles.titleText}>Comment:</Text>
      <TextInput 
      multiline placeholder ="Leave us a message!" 
      style = {styles.commentInput}
      onChangeText={(comment) => setComment(comment)}
      value = {comment}
      maxLength = {500}
      ></TextInput>

      {/* Button */}
      <Pressable style = {styles.submitButton} onPress={() => addEntry()}> {/* <---- get rid of this after!!!*/}
        <Text style = {styles.buttonText}>Submit</Text>
      </Pressable>
      </KeyboardAvoidingView>
      
      
      {/* Comments Section */}
      <View style = {styles.commentsSection}>
      <Text style = {styles.titleText}>Comments</Text>

      {/* Comments Viewer */}
      <View style = {styles.commentsViewer}>
        {/* Can we put a flatlist in here without breaking it? If this doesn't work, copy, paste and put it somewhere else */}
        <FlatList 
        data = {[...entries].reverse()} 
        keyExtractor = {(item) => item.id.toString()} 
        renderItem={({item}) => (
          <EntryItem entry = {item} deleteEntry={deleteComment} visible = {visible} />
        )}/>

      </View> 

      </View>
      
    </View>
  )
}

//Here's a component for an entry. Make sure it *returns* the view
const EntryItem = ({entry, visible, deleteEntry} : {entry: EntryType, visible:boolean, deleteEntry: (id: number) => void}) => {
  return (
  <View style = {styles.commentEntry}>

            <Text style = {styles.commentName}>{entry.name}</Text>
            <Text style = {styles.commentComment}>{"\n"}{entry.comment} </Text>

            {/* Delete button only viewable in admin mode! */}
            {/* Will this work? If it doesn't, maybe you need to set a type for visible?? */}
            {!visible && <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              deleteEntry(entry.id);
              alert("Deleted entry!");
            }}>
            <Ionicons  name= "trash" size={30} color={'grey'} /></TouchableOpacity>}

            {/* Bring this back if you need to! */}

            {/* <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              deleteEntry(entry.id);
              alert("Deleted entry!");
            }}>
            <Ionicons  name= "trash" size={30} color={'grey'} /></TouchableOpacity> */}
            
            <Text style = {styles.commentDate}>{"\n"}{entry.datePosted} </Text>
            
            <View style = {styles.lineSeparator}></View>
        
          </View>
          )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight:30,
    flexDirection: 'row',
    flexWrap: "wrap",
  },

  commentsForm: {
    height: 'auto',
    width: 'auto',
    flex:1,
    paddingRight:30,
    marginBottom: '0.5%'
  },

  commentsSection: {
    flex: 2,
    width: '100%',
    height: '100%',
  },

  commentsViewer: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor:'rgba(110, 110, 110, 0.51)',
    borderWidth: 2,
    borderRadius: 30,
    width: 'auto',
    height: '90%',
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

  divider: {
    height: '100%',
    width: 5,
    backgroundColor: 'rgba(161, 161, 161, 0.7)',
  },
  titleText: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    color:'rgb(255, 255, 255)',
    fontFamily: "arial",
    fontSize: 60,
    fontWeight: 'bold',
    paddingTop: 15,
    textAlign: 'center',
  },

  commentEntry: {
    flexDirection: 'column',
    padding: 20,

  },

  commentName: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 30,
    fontWeight: 'bold',
  },

  commentComment: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 20,
    fontWeight: 'bold',
  },

  commentDate: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 15,
    fontWeight: 'bold',
    
  },
  
  lineSeparator: {
    backgroundColor:'rgba(61, 61, 61, 0.7)',
    width: '90%',
    height: 2,
    marginTop: 50,
    alignSelf: 'center'

  },

  deleteButton: {
    flexDirection: 'row-reverse',
  }
  
})