import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'

const guestbook = () => {
//Functionality for leaving a comment along with name and date






  return (
    <View style = {styles.container}>

      {/* Submission form */}
      <View style = {styles.commentsForm}>

      {/* Name: */}
      <Text style = {styles.titleText}>Name:</Text>
      <TextInput style = {styles.nameInput}></TextInput>

      {/* Comment */}
      <Text style = {styles.titleText}>Comment:</Text>
      <TextInput multiline placeholder ="Leave us a message!" style = {styles.commentInput}></TextInput>
      <Pressable style = {styles.submitButton}>
        <Text style = {styles.buttonText}>Submit</Text>
      </Pressable>
      </View>
      
      
      {/* Comments Section */}
      <View style = {styles.commentsSection}>
      <Text style = {styles.titleText}>Comments</Text>

      {/* Comments Viewer */}
      <View style = {styles.commentsViewer}>
        {/* There will be things in here eventually */}
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
    padding:5

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
    padding:5
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
  
})