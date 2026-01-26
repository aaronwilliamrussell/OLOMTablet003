import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import ImageView from '@techvox/react-native-image-viewing'
import * as photosList from '../assets/photos/photoData.json';

const photos = () => {
    console.log("This is the photos page!")

//OK...so this is going to loop through the json file and return JUST the photo for now. We'll see if it works
//UPDATE: This doesn't work, but we'll figure out why eventually. 
// When it returns an array, it isn't recognized by the image gallery functionality. Maybe I'm calling the givePhotos function wrong?
const givePhotos = () => {

let photoArray = [];

for (const key in photosList){
  photoArray.push(photosList[key].Filename);
}


return (
  photoArray
)

}
//So *THIS* is the correct way to display the path of the photo. How am I going to get the filename to replace the end of this string???
const testImages = ["http://localhost:8081/assets/?unstable_path=.%2Fassets%2Fphotos/test.png","http://localhost:8081/assets/?unstable_path=.%2Fassets%2Fhome/olom001.jpg" ];



  return (
   //Trying something different. This is a placeholder

    <View style={styles.container}>
      <Text>Photo gallery in progress!!</Text>
    </View>

  )
}

export default photos

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})