import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const models = () => {

  //Log in authentication
useEffect( () => {
  const getLogin = async() => {
    try {
      const login = await AsyncStorage.getItem('adminpriv');
      if (login !== null) {
        // console.log(JSON.parse(login))
      }
      if (login == "true"){
        // console.log("Welcome to the video page, admin")
        show();
        //Have to implement this function
      }
      else if (login == "false"){
        // console.log("Visitor detected")
        hide();
        //Have to implement this function too
      }
    }
    catch (error){
      console.log(error);
    }
  }
  getLogin();
},[]
)

//States to show add/edit/delete functions for videos
const[adminButtons, setAdmin] = useState(false);
const show = () => setAdmin(true);
const hide = () => setAdmin(false);


  return (
    <View style = {styles.container}>

      {/* Layout for the list of models. (Change this to a ScrollView or a FlatList!) */}
        <View style = {styles.vidList}>
          
          {/* Within this list are the entries. Like the comments section and photo page, this will probably be a separate component, but for now, it isn't 
          (Also make clickable!!!!) */}
          <View style = {styles.videoEntry}>
            {/* Entry text. Includes title and video length */}
            <View style = {styles.entryText}>
              <Text style = {styles.textTitle}>Title</Text>
            </View>
            {/* Button to edit. CHANGE TO MAKE SURE IT ONLY WORKS FOR ADMIN */}
            {adminButtons && <Pressable
                            style={styles.editModel}
                            //Do on press here to open the editor for that specific model
                            ><Text style = {styles.editText}>Edit</Text></Pressable>}
          </View>
          {/* Horizontal divider between entries */}
          <View style = {styles.horizontalDivider}></View>
        </View>
        
        {/* Divider between to keep things neat */}
        <View style = {styles.verticalDivider}></View>

        {/* Video player and description */}
        <View style = {styles.playerContainer}>
          {/* Not sure why this is in two views, but it is */}
          <View style = {styles.playerHalf}>
            {/* Model viewer will go here */}
            <View style = {styles.vidPlayer}></View>
          </View>
          {/* Divider between player and description */}
          <View style = {styles.horizontalDivider}></View>
          {/* Description for video */}
          <View style = {styles.descHalf}>
            <Text style = {styles.descTitle}>Title</Text>
            <Text style = {styles.descDesc}>Description</Text>
          </View>
        </View>
        
    </View>
  )
}

export default models

const styles = StyleSheet.create({
   container:{
        flex:1,
        justifyContent:"flex-start",
        flexDirection: "row"
    },

    vidList:{
        flex:1,
        justifyContent:"flex-start",
        backgroundColor:  'rgb(255, 255, 255)',
        margin: 10,
        flexDirection: "column"
    },

    videoEntry: {
      justifyContent:"flex-start",
      flexDirection: "row",
      margin: 10,
      height: "25%"
      
    },

    entryText: {
      flex:2,
      justifyContent:"center",
      flexDirection: "column",
      margin: 10,
      padding:10
    },

    textTitle:{
      fontFamily:'arial',
      fontSize: 50,
    },

    editModel:{
        backgroundColor:  'rgba(102, 102, 102, 0.7)',
        borderRadius: 20,
        padding: 10,
        height: 60,
        justifyContent:"center",
        alignSelf: "center",
    },

    editText: {
      fontFamily:'arial',
      fontSize: 30,
    },

    
    playerContainer: {
      flex:2,
      justifyContent:"flex-start",
      backgroundColor: 'rgb(255, 255, 255)',
      marginLeft: 10,
      marginTop: 10,
      marginBottom:10,
      marginRight: 10,
    },

       playerHalf: {
      flex:3,
      justifyContent:"center",
      alignItems: "center",
      backgroundColor: 'rgb(255, 255, 255)',
      marginBottom: 10,
    }, 

    vidPlayer: {
      flex:1,
      justifyContent:"center",
      backgroundColor: 'rgba(110, 110, 110, 0.51)',
      width: '80%',
      height: 'auto',
      margin:10,
      
    }, 

    descHalf: {
      flex:1,
      justifyContent:"flex-start",
      backgroundColor: 'rgb(255, 255, 255)',
      margin: 10,
      padding:10,
      
    },

    descTitle: {
      fontFamily:'arial',
      fontSize: 50,
      color: 'rgba(102, 102, 102, 0.7)'
    },

    descDesc: {
      fontFamily:'arial',
      fontSize: 30,
      color: 'rgba(102, 102, 102, 0.7)'
    },


    verticalDivider: {
        width:2,
        justifyContent:"center",
        backgroundColor:  'rgba(102, 102, 102, 0.75)',
        margin: 10,
    },

    horizontalDivider: {
        height:2,
        justifyContent:"center",
        backgroundColor:  'rgba(102, 102, 102, 0.75)',
        margin: 10,
    }
})