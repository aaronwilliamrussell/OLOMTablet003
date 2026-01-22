import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'

const photos = () => {
    console.log("This is the photos page!")
  return (
    <View style ={pstyles.container}>
      <Text>photos</Text>
      <Image style={pstyles.image} source={{uri: 'https://www.heritage.nf.ca/articles/society/images/our-lady-mercy.jpg'}}></Image>
    </View>
  )
}

export default photos

const pstyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },

    image:{
    width:2000, 
    height:256,
    marginBottom:2,
    zIndex:1,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {width:10, height:10},
    shadowRadius: 2},
})