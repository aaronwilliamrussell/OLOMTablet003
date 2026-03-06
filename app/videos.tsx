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
      alert('You did not select any image.');
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



  return (
    <View>
      <Text>videos</Text>
    </View>
  )
}

export default videos

const styles = StyleSheet.create({})