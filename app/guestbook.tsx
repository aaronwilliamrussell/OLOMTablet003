import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, FlatList } from 'react-native'
import React, {useState} from 'react'

type EntryType = {
  id: number;
  datePosted: string;
  name: string;
  comment: string;

};

export default function guestbook () {
//Functionality for leaving and viewing comments. Admins have the ability to delete posts!


//This  is just some sample data:

const demoEntries = [
    {
        "id" : 1,
        "datePosted": "June 2, 2026",
        "name" : "Bobby",
        "comment": "Hey. This is my first comment"
    },

     {
        "id" : 2,
        "datePosted": "June 3, 2026",
        "name" : "Hank",
        "comment": "I'll tell you what: Propane heating would be a great way to keep this church warm in the winter"
    }
]

//The states of the component

const [entries, setEntries] = useState<EntryType[]>(demoEntries);
const [name, setName] = useState<string>('');
const [comment, setComment] = useState<string>('');

//Adding a new comment 

const addEntry = () => {
    const newEntry = {
      id: Math.random(),
      datePosted: new Date().toDateString(),
      name: name,
      comment: comment
    };

    entries.push(newEntry);
    setEntries(entries);
    setName('');
    setComment('');

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
      ></TextInput>

      {/* Comment */}
      <Text style = {styles.titleText}>Comment:</Text>
      <TextInput 
      multiline placeholder ="Leave us a message!" 
      style = {styles.commentInput}
      onChangeText={(comment) => setComment(comment)}
      value = {comment}
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
        data = {entries} 
        keyExtractor = {(item) => item.id.toString()} 
        renderItem={({item}) => (
          <EntryItem entry = {item} />
        )}/>

      </View> 

      </View>
      
    </View>
  )
}

//Here's a component for an entry. Make sure it *returns* the view
const EntryItem = ({entry} : {entry: EntryType}) => {

  return (
  <View style = {styles.commentEntry}>

            <Text style = {styles.commentName}>{entry.name}</Text>
            <Text style = {styles.commentComment}>{"\n"}{entry.comment} </Text>
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

  }
  
})