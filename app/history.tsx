//Note for later....If I get time, wouldn't it be cool to do a sort of animated timeline? Like one of those really interactable
//react pages where stuff pops up as you scroll

import {
	Button,
	Image,
	View,
	StyleSheet,
	ActivityIndicator,
  Pressable,
	Text,
	FlatList,
  ImageBackground,
  Modal,
  ScrollView,
  TextInput
} from 'react-native';

import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const history = () => {
//Functions for showing and hiding elements
    const[visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);  

//Log in authentication
useEffect( () => {
  const getLogin = async() => {
    try {
      const login = await AsyncStorage.getItem('adminpriv');
      if (login !== null) {
        console.log(JSON.parse(login))
      }
      if (login == "true"){
        console.log("Welcome to the history page, admin")
        show();
      }
      else if (login == "false"){
        console.log("Visitor detected")
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

//Update history page *tentative*


  //Returned UI Elements
  return (
  <ScrollView>
    <View style = {styles.container}>
      <Image
      style= {styles.image}
      source={{uri: 'https://www.heritage.nf.ca/articles/society/images/our-lady-mercy.jpg'}}
      ></Image>
      
    {/*Hard to see here, but this next part hides the text input if you aren't an admin. It's shorthand, so it might be a little hard
    to understand. Basically, "______?" is asking " if this is true, do this" and the ":" is the else statement */}  

    {!visible? 
    <Text style={styles.text}>
 History page in progress!
</Text> : 
<View>
  <TextInput 
  multiline placeholder ="Default admin message" 
  style = {styles.commentInput}
  > 
  </TextInput> 
  <Pressable style = {styles.submitButton}> 
  <Text style = {styles.buttonText}>Submit</Text>
  </Pressable>
</View>  }
    </View>
    
  </ScrollView>
    
  )
}

export default history

const styles = StyleSheet.create({
  container: {
    padding:40,
    flexDirection: 'column',
    alignItems:'center',
  },

  text: {
    color:"black",
    fontSize: 30,
    fontWeight: 'bold',
    },

  image: {
    
    resizeMode: 'contain',
    height: 300,
    width:500,
    marginBottom: 40
  },
   commentInput: {
    width: 1000,
    height: 400,
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
    height:'auto',
    width:'100%',
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
    paddingBottom: 15,
    textAlign: 'center',
  },
})