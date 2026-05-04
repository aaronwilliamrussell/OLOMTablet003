import { Link } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NfcManager, { NfcTech } from "react-native-nfc-manager";

export default function Home () {

async function changeScreenOrientation() {
await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
}

changeScreenOrientation();

    //Functions for showing and hiding elements
    const[visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    //Functions for login/logout states 
    const [loggedIn, setLoggedIn] = useState(false);
    const logIn = () => setLoggedIn(true);
    const logOut = () => setLoggedIn(false);
    const [adminButtonText, setText] = useState("Admin");

    //Run checks
    console.log("Admin status: " + loggedIn)

   //NFC stuff part two
   // Pre-step, call this before any NFC operations
  NfcManager.start();

async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.MifareClassic);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if(tag?.id == "84BE0F10"){
        adminLogIn()
      }
      else {
        alert("Wrong key!")
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }
  



    //Function to log in 
    const adminLogIn = async() => {
        try{
              if (!loggedIn){
            logIn();
            console.log("You're logged in!");
            //change admin button to say "log out"
            setText("Logout");
            //hide modal
            hide();
            //somehow store locally that the user is logged in
            await AsyncStorage.setItem('adminpriv', JSON.stringify(!loggedIn));
        }  
        }
        catch(error){console.log(error)}                   
    }

    //Function that changes what the admin button does depending on if an admin is logged in or not
    const adminToggle = async() => {
        try {
             if(loggedIn){
            logOut();
            console.log("You're logged out!");
            //change admin button to say "admin" again
            setText("Admin");
            //Pop up to say "logged out"?

            //change local variable of user login to 'false'
            await AsyncStorage.setItem('adminpriv', JSON.stringify(!loggedIn));
        }
        else{
            show();
            readNdef();
        }
        }
        catch (error){console.log(error)}
    }
   
    return (
        <View style = {styles.banner}>
           {/* Index banner */}
              <Image
              style = {styles.image002}
              source={require('../assets/home/logo.png')}
              />
              <View
              style = {styles.image}
              />   
              
              <View style = {styles.grid}>
        
        {/* Main Page Buttons     */}
        {/* Photos */}
            <Link href = "/photos" style={{marginHorizontal:'auto'}} asChild>
            <Pressable style = {styles.button} >
             <ImageBackground
            //  this link is a placeholder
              source={{uri: 'https://historicplacesdays.ca/wp-content/uploads/2019/07/4C039F93-975D-485C-A26E-A14F56A79E1C.png'}}
              style = {styles.buttonImage}
              imageStyle={{borderRadius:30}}
              >
             <Text style = {styles.buttonText}>Photos </Text> 
             </ImageBackground>
            </Pressable>
            </Link>   
        
        {/* Videos*/}
            <Link href = "/videos" style={{marginHorizontal:'auto'}} asChild>
            <Pressable style = {styles.buttonContainer}>
              <View style={styles.buttonContainer}>
                <View style={styles.textContainer}>
                  <Text style = {styles.buttonText}>Videos </Text> 
                </View>
                <Image style = {styles.videoImage} source={{uri: 'https://t4.ftcdn.net/jpg/00/98/31/69/360_F_98316912_2Mmdy5mluCDJSNUmU5vx5KLsMZX5s8Wl.jpg'}}></Image>
              </View>
            </Pressable>
            </Link>
        
        {/*History*/}
            <Link href = "/history" style={{marginHorizontal:'auto'}} asChild>
            <Pressable style = {styles.button}>
             <ImageBackground
            //  this link is a placeholder
              source={{uri: 'https://www.heritage.nf.ca/articles/society/images/our-lady-mercy.jpg'}}
              style = {styles.buttonImage}
              imageStyle={{borderRadius:30}}
              >
             <Text style = {styles.buttonText}>History </Text> 
             </ImageBackground> 
            </Pressable>
            </Link>
            
        
        {/*Events*/}
            <Link href = "/events" style={{marginHorizontal:'auto'}} asChild>
            <Pressable style = {styles.button}>
             <ImageBackground
            //  this link is a placeholder
              source={{uri: 'https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/IMG_4874.jpg'}}
              style = {styles.buttonImage}
              imageStyle={{borderRadius:30}}
              >
             <Text style = {styles.buttonText}>Events </Text> 
             </ImageBackground>
            </Pressable>
            </Link>

        {/*Guestbook*/}
            <Link href = "/guestbook" style={{marginHorizontal:'auto'}} asChild>
            <Pressable style = {styles.button}>
             <ImageBackground
            //  this link is a placeholder
              source={{uri: 'https://miro.medium.com/v2/resize:fit:1400/1*GdJ-q8rJqOk4xbg0GXIBvg.jpeg'}}
              style = {styles.buttonImage}
              imageStyle={{borderRadius:30}}
              >
             <Text style = {styles.buttonText}>Guestbook</Text> 
             </ImageBackground>
            </Pressable>
            </Link>
              </View>
              
        {/* Administrative button */}
        <Pressable style = {styles.adminButton} onPress={adminToggle}>
        <Text style = {styles.buttonText}>{adminButtonText}</Text> 
        </Pressable>

        {/*Administrative modal*/}
        <View>
            <Modal
            visible = {visible}
            onRequestClose = {hide}
            animationType= "slide"
            transparent>
                <Pressable style = {styles.adminModalUpper} onPress = {hide}/>
                <View style= {styles.adminModalLower}>
                    <Text style = {styles.text}>Tap your security card here!</Text>
                    <Ionicons name = "radio-outline" style = {styles.text}></Ionicons>
                    <ActivityIndicator size="large" color="#59B6CF" ></ActivityIndicator>
                </View>
            </Modal>
        </View>
            </View>
    )

}

const styles = StyleSheet.create({

    banner: {
    flex:1,
    flexDirection: 'column',
    },

    grid:{
    flex:1,
    flexDirection: 'row',
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
    },

    image:{
    width:2000, 
    height:256,
    marginBottom:2,
    zIndex:1,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {width:10, height:10},
    shadowRadius: 2,
    backgroundColor: '#59B6CF'
    },

    image002:{
    width:250,
    height:250,
    position: "absolute",
    alignSelf:"center",
    zIndex: 2,
    },

    text: {
    color:"black",
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    },

    button: {
    flex:1,
    height:'100%',
    justifyContent: 'center',
    padding:3,
    zIndex:0,
  
    },

    buttonImage:{
    flex:1,
    resizeMode:"cover",
    justifyContent:'center',
    borderRadius: 30,
    shadowColor: 'rgba(110, 110, 110, 0.51)',
    shadowOffset: {width:2, height:2},
    shadowRadius: 10,
    },

    textContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignContent:'center',
      alignSelf:'center',
      zIndex: 3
    },
   
    buttonText: {
    color:'rgba(255, 255, 255, 0.96)',
    fontFamily: "arial",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(1,1,1,1)',
    textShadowRadius: 10,
    textShadowOffset: {width: 2, height:2},
    padding: 0,
    // transform: 'rotate(-10deg)',
  },

  adminButton:{
    position: 'absolute',
    top:5,
    right:5,
    height:'auto',
    width:'auto',
    borderRadius: 30, 
    borderColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgba(161, 161, 161, 0.7)',
    justifyContent: 'center',
    padding:6,
    zIndex:3
  },

  adminModalUpper: {
    height:100,
    backgroundColor:'#DDD',
    opacity:0.5,
  },

  adminModalLower:{
    flex: 1, 
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tempButton:{
    position: 'relative',
    margin:50,
    padding: 10,
    height:'auto',
    width:'auto',
    borderRadius: 60, 
    borderColor: 'rgba(255, 255, 255, 0)',
    backgroundColor: 'rgb(68, 71, 241)',
    zIndex:3
  },

  //Fixes for buttons:

  buttonContainer: {
    flex:1,
    justifyContent:'center',
    borderRadius: 30,
    shadowColor: 'rgba(110, 110, 110, 0.51)',
    shadowOffset: {width:2, height:2},
    shadowRadius: 10,
    overflow: 'hidden',
  },

  videoImage: {
    resizeMode:"cover",
    height: '100%',
    width:'150%',
    transform: [{translateY: 5}]
  }

})

