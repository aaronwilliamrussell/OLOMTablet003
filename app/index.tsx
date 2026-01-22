import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
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
} from 'react-native';

import Ionicons from "@expo/vector-icons/Ionicons";

export default function Home () {

    //Functions for showing and hiding elements
    const[visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    //Functions for login/logout states 
    const [loggedIn, setLoggedIn] = useState(false);
    const logIn = () => setLoggedIn(true);
    const logOut = () => setLoggedIn(false);
    const [adminButtonText, setText] = useState("Admin");
    
    //Function to log in (add the NFC stuff later!)
    const adminLogIn = () => {
        
        if (!loggedIn){
            logIn();
            console.log("You're logged in!");
            //change admin button to say "log out"
            setText("Logout");
            //hide modal
            hide();
            //somehow store locally that the user is logged in
        }                     
    }

    //Function that changes what the admin button does depending on if an admin is logged in or not
    const adminToggle = () => {
        if(loggedIn){
            logOut();
            console.log("You're logged out!");
            //change admin button to say "admin" again
            setText("Admin");
            //Pop up to say "logged out"?

            //change local variable of user login to 'false'
        }
        else{
            show();
        }
    }
   
    
   
    return (
        <View style = {styles.banner}>
           {/* Index banner */}
              <Image
              style = {styles.image002}
              source={require('../assets/home/logo.png')}
              />
              <Image
              style = {styles.image}
              source={require('../assets/home/olom001.jpg')}
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
        {/* <Link href = "/videos" style={{marginHorizontal:'auto'}} asChild> */}
            <Pressable style = {styles.button}>
             <ImageBackground
            //  this link is a placeholder
              source={{uri: 'https://t4.ftcdn.net/jpg/00/98/31/69/360_F_98316912_2Mmdy5mluCDJSNUmU5vx5KLsMZX5s8Wl.jpg'}}
              style = {styles.buttonImage}
              imageStyle={{borderRadius:30}}
              >
             <Text style = {styles.buttonText}>Videos </Text> 
             </ImageBackground>
            </Pressable>
           
        
        {/* 3D Models*/}
        {/* <Link href = "/models" style={{marginHorizontal:'auto'}} asChild> */}
            <Pressable style = {styles.button}>
             <ImageBackground
            //  this link is a placeholder
              source={{uri: 'https://media.sketchfab.com/models/a1e63357f3fa4a8d9a310db3ae35c2fb/thumbnails/91123f9d8d614f8b99011ac454045e76/0b8997d7bede43a785f7d8b060fcdbce.jpeg'}}
              style = {styles.buttonImage}
              imageStyle={{borderRadius:30}}
              >
             <Text style = {styles.buttonText}>3D Models </Text> 
             </ImageBackground>
            </Pressable>
            
        
        {/*History*/}
        {/* <Link href = "/history" style={{marginHorizontal:'auto'}} asChild> */}
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
            
        
        {/*Events*/}
        {/* <Link href = "/events" style={{marginHorizontal:'auto'}} asChild> */}
            <Pressable style = {styles.button}>
             <ImageBackground
            //  this link is a placeholder
              source={{uri: 'https://scontent.fyhz1-1.fna.fbcdn.net/v/t1.6435-9/42854466_1860628977349207_3131969244065955840_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=B6BLnkjbNwcQ7kNvwHA-len&_nc_oc=AdlXuguWEbpeLqCUtk5NFH84mTuz1GXYmtVW7eZSVK0u0p8hpomC5gYBNGIkRL28jjo&_nc_zt=23&_nc_ht=scontent.fyhz1-1.fna&_nc_gid=mJa9c2kbIu0itzaRf8EocA&oh=00_AfpkrZuZE9iAqRH-w7-2f1t42MRua-MEl4w3eSOv8Ns9rw&oe=69960D5A'}}
              style = {styles.buttonImage}
              imageStyle={{borderRadius:30}}
              >
             <Text style = {styles.buttonText}>Events </Text> 
             </ImageBackground>
            </Pressable>
            
        
        {/*Guestbook*/}
        {/* <Link href = "/guestbook" style={{marginHorizontal:'auto'}} asChild> */}
            <Pressable style = {styles.button}>
             <ImageBackground
            //  this link is a placeholder
              source={{uri: 'https://miro.medium.com/v2/resize:fit:1400/1*GdJ-q8rJqOk4xbg0GXIBvg.jpeg'}}
              style = {styles.buttonImage}
              imageStyle={{borderRadius:30}}
              >
             <Text style = {styles.buttonText}>Guestbook </Text> 
             </ImageBackground>
            </Pressable>
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
                    <Pressable style = {styles.tempButton} onPress= {adminLogIn}>
                        <Text style = {styles.buttonText}>...or just click here because we don't have an NFC method yet</Text>
                    </Pressable>
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
    borderRadius: 30, 
    borderColor: 'rgba(255, 255, 255, 0)',
    backgroundColor: 'rgb(68, 71, 241)',
    zIndex:3
  }

})

