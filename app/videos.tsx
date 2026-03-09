import { Image, Keyboard, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';

type VideoType = {
  id: number;
  videoData: string | undefined;
  title: string;
  description:string;
  videoLocation: string;
  //Video thumbnail too? (first frame of video, maybe)
  //Video length???
  
};

const videos = () => {
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

//States for VideoType objects

//Set new video
const [videos, setVideos] = useState<VideoType[]>([]);
//Set VideoData (get from video picked from gallery)
const [videoData, setVideoData] = useState<string | undefined>(undefined);
//Set title of video
const [title, setTitle] = useState<string>('');
//Set Description of video
const [description, setDescription] = useState<string>('');
//Set video index
const [videoIndex, setIndex] = useState<number>();
//Set video source 
const [videoLocation, setVideoLocation] = useState<string>('');

//States to show add/edit/delete functions for videos
const[adminButtons, setAdmin] = useState(false);
const show = () => setAdmin(true);
const hide = () => setAdmin(false);

//States to show video creation modal
const[videoCreate, setVideoCreate] = useState(false);
const showCreate = () => setVideoCreate(true);
const hideCreate = () => setVideoCreate(false);

//Ensure the directory to save videos exists, if it doesn't, then make it

const vidDir = FileSystem.documentDirectory + 'videos/';

const ensureDirExists = async() => {
  const dirInfo = await FileSystem.getInfoAsync(vidDir);
  if (!dirInfo.exists) {
    console.log("Directory doesn't exist, creating…");
    await FileSystem.makeDirectoryAsync(vidDir, { intermediates: true });
  }
}

//Getter function for videos
useEffect( () => {
  const getVideos = async() => {
    try {
      const vidsJson = await AsyncStorage.getItem('my-videos');
      if (vidsJson !== null){
        const parsed = JSON.parse(vidsJson) as VideoType[];
        setVideos(parsed);
      }
    } 
    catch (error){
      console.log (error);
    }
  } 
  getVideos();
},[]) 

//Pick video from gallery

  const pickVideoAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: false,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      console.log(result);
      setVideoData(result.assets[0].uri)
      setVideoLocation(result.assets[0].uri)
      
    } else {
      alert('You did not select any videos.');
    }}

//Save picked image to local storage (somehow)

    const saveVideo = async (uri:string) => {
      await ensureDirExists();
      const filename = new Date().getTime() // + Whatever the final file format ends up being
      const dest = vidDir + filename
      setVideoLocation(dest);
      await FileSystem.copyAsync ({from: uri, to: dest})
    }    

//Adding a new video

const addVideo = async () => {
  try {
    const newVideo: VideoType = {
      id: Math.random(),
      videoData: videoData,
      title: title,
      description: description,
      videoLocation: videoLocation
    };

    if (description == ""){
      alert("Cannot be blank");
      setDescription('');
      setTitle('');
      Keyboard.dismiss();
      return;
    }

     else if (title == ""){
      alert("Cannot be blank");
      setDescription('');
      setTitle('');
      Keyboard.dismiss();
    }

    else if (videoData == null){
      alert("Please select a video");
      setDescription('');
      setTitle('');
      Keyboard.dismiss();
    }

    // Update the list of videos
    //Since this is video, I think it would be a good idea to add a loading screen that goes away as soon as everything is done processing... just something to note
    videos.push(newVideo);
    setVideos(videos);
    await AsyncStorage.setItem('my-videos', JSON.stringify(videos));
    setDescription('');
    setTitle('');
    alert("Submitted!");
    Keyboard.dismiss();
  }
  catch(error) {
    console.log (error);
  }
}

//Deleting a video (if admin) FIX THIS!! IT NEEDS TO ALSO GET DELETED FROM STORAGE AND UPDATE STATE TWICE

const deleteVideo = async (id:number) => {
  try {
    const newVideo = videos.filter((entry) => entry.id !== id);
    await AsyncStorage.setItem("my-videos", JSON.stringify(newVideo));
    setVideos(newVideo);
  } 
  catch(error) {
    console.log(error);
  }
}

//Getting the index of the thumbnail selected so that the modal opens on the corresponding folder
const getFilteredVideo = async (id:number) => {
    const indexofVid = videos.findIndex((entry) => entry.id === id)
    //Set index
    setIndex(indexofVid)
}


/** Views go here!! (although, some views may have to be made into functions like the previous pages) 
 * 
 * Right now, I'm just testing some things....Gonna start working on the layout 
*/
  return (
    <View style = {styles.container}>

      {/* Layout for the list of videos. (Change this to a ScrollView or a FlatList!) */}
        <View style = {styles.vidList}>
          {/* Button appears if admin is logged in */}
                {adminButtons && <Pressable
                style={styles.addVideo}
                onPress={() => {
                showCreate()
                }}
                ><Text>Add Video</Text></Pressable>}
           {/* Within this list are the entries. Like the comments section and photo page, this will probably be a separate component, but for now, it isn't 
          (Also make clickable!!!!) */}
          <View style = {styles.videoEntry}>
            {/* Entry text. Includes title and video length */}
            <View style = {styles.entryText}>
              <Text style = {styles.textTitle}>Title</Text>
              <Text style = {styles.textLength}>Length</Text>
            </View>
            {/* Entry thumbnail */}
            <View style = {styles.entryThumbnail}></View>
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
            {/* Video player */}
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

        {/* Modal for entry creation */}
        <Modal
                          visible = {videoCreate}
                          onRequestClose = {hideCreate}
                          animationType= "fade"
                          transparent>
                              <Pressable style = {styles.modalUpper} onPress = {hideCreate}/>
                              <KeyboardAvoidingView style= {styles.modalLower}>
                                  <Text style = {styles.title}>Upload a photo!</Text>
        
                                   {/* Video thumbnail */}
                                   {/* Video preview is going to show up here.
                                   Will have a delete button just in case the user selects the wrong video */}
                                  <Image 
                                  style = {styles.videoThumbnail}
                                  source={{uri: videoLocation}}
                                  ></Image>
        
                                   {/* Photo from Gallery Button */}
                                  <Pressable style = {styles.videoLibrary} onPress={() => pickVideoAsync()}> 
                                    <Text style = {styles.buttonText}>Select a Video</Text>
                                  </Pressable> 

                                  {/* Title*/}
                                  <Text style = {styles.description}>Title:</Text>
                                  <TextInput 
                                  multiline placeholder ="Title" 
                                  style = {styles.commentInput}
                                  onChangeText={(title) => setTitle(title)}
                                  value = {title}
                                  maxLength = {100}
                                  ></TextInput>
              
                                  {/* Description */}
                                  <Text style = {styles.description}>Description:</Text>
                                  <TextInput 
                                  multiline placeholder ="Description" 
                                  style = {styles.commentInput}
                                  onChangeText={(description) => setDescription(description)}
                                  value = {description}
                                  maxLength = {500}
                                  ></TextInput>
                            
                                  {/* Submit Button */}
                                  <Pressable style = {styles.submitButton} onPress={() => addVideo()}> 
                                    <Text style = {styles.buttonText}>Submit</Text>
                                  </Pressable>  
                              </KeyboardAvoidingView>
                          </Modal>

    </View>
  )
}

export default videos

const styles = StyleSheet.create({
  //Main page
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
    
    addVideo:{
        backgroundColor:  'rgba(102, 102, 102, 0.7)',
        borderRadius: 30,
        margin: 10,
        height: 100,
        justifyContent:"center",
        alignItems: "center",
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
      fontSize: 30,
    },

    textLength: {
      fontFamily:'arial',
      fontSize: 20,
    },

    entryThumbnail: {
      flex:1,
      justifyContent:"flex-start",
      backgroundColor: 'rgba(102, 102, 102, 0.7)',
      margin: 10
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
      fontSize: 30,
      color: 'rgba(102, 102, 102, 0.7)'
    },

    descDesc: {
      fontFamily:'arial',
      fontSize: 12,
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
    },

    //Modal to select a video
     modalUpper: {
      height:100,
      backgroundColor:'#DDD',
      opacity:0.5,
  },

    modalLower:{
      flex: 1, 
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
  },

   title: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 30,
    fontWeight: 'bold',
  },
    
  
  description: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 20,
    fontWeight: 'bold',
  },
    videoLibrary:{
    flex:1,
    height:'auto',
    width:'50%',
    borderRadius: 30, 
    borderColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(255, 72, 0)',
    margin: 'auto'
  },

  buttonText: {
    color:'rgb(255, 255, 255)',
    fontFamily: "arial",
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    commentInput: {
    flex:1,
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
    backgroundColor: 'rgb(45, 255, 38)',
    margin: 'auto'
  },

    videoThumbnail: {

    }
  })