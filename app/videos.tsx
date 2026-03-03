import { Image, Keyboard, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'

type VideoType = {
  id: number;
  videoData: string | undefined;
  title: string;
  description:string;
  
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

//States to show add/edit/delete functions for videos
const[adminButtons, setAdmin] = useState(false);
const show = () => setAdmin(true);
const hide = () => setAdmin(false);

//States to show video creation modal
const[videoCreate, setVideoCreate] = useState(false);
const showCreate = () => setVideoCreate(true);
const hideCreate = () => setVideoCreate(false);

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

//Adding a new photo

const addVideo = async () => {
  try {
    const newVideo: VideoType = {
      id: Math.random(),
      videoData: videoData,
      title: title,
      description: description
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


  return (
    <View>
      <Text>videos</Text>
    </View>
  )
}

export default videos

const styles = StyleSheet.create({})