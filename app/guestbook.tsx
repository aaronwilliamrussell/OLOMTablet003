import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, FlatList } from 'react-native'
import React from 'react'

//This  is just some sample data:

const demoComments = [
    {
        "Index" : 1,
        "Date": "June 2, 2026",
        "Name" : "Bobby",
        "Comment": "Hey. This is my first comment"
    },

     {
        "Index" : 2,
        "Date": "June 3, 2026",
        "Name" : "Hank",
        "Comment": "I wish this church used propane-based heating"
    }
]

const guestbook = () => {
//Functionality for leaving a comment along with name and date






  return (
    <View style = {styles.container}>

      {/* Submission form */}
      <KeyboardAvoidingView style = {styles.commentsForm} behavior='padding' keyboardVerticalOffset={10}>

      {/* Name: */}
      <Text style = {styles.titleText}>Name:</Text>
      <TextInput style = {styles.nameInput}></TextInput>

      {/* Comment */}
      <Text style = {styles.titleText}>Comment:</Text>
      <TextInput multiline placeholder ="Leave us a message!" style = {styles.commentInput}></TextInput>
      <Pressable style = {styles.submitButton}>
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
        data = {demoComments} 
        keyExtractor = {(item) => item.Index.toString()} 
        renderItem={({item}) => (
          <View style = {styles.commentEntry}>

            <Text>{item.Name}</Text>
            <Text>{"\n"}{item.Comment} </Text>
            <Text>{"\n"}{item.Date} </Text>
        
          </View>
        )}/>

      </View> 

      </View>
      
    </View>
  )
}

export default guestbook

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
    flexDirection: 'row',
    padding: 10

  }
  
})