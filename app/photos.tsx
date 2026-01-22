import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Gallery from 'react-native-awesome-gallery';
import React from 'react';
import * as photosList from '../assets/photos/photoData.json';

const photos = () => {
    console.log("This is the photos page!")

//OK...so this is going to loop through the json file and return JUST the photo for now. We'll see if it works
//UPDATE: This doesn't work, but we'll figure out why eventually
const givePhotos = () => {

let photoArray = [];

for (const key in photosList){
  photoArray.push(photosList[key].Filename);
}

console.log(photoArray[0]);

return (
  photoArray
)

}



  return (
    //The problem may have something to do with this. Make some comments to debug
    <Gallery
    data ={givePhotos()}
    onIndexChange={(newIndex) => {
      console.log(newIndex);
    }}
    >
    </Gallery>

    // <View style={styles.container}>
    //   <Text>Photo gallery in progress!!</Text>
    // </View>

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