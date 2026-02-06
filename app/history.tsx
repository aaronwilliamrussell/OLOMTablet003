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

import React from 'react'

const history = () => {
  return (
  <View>
    <View style = {styles.container}>
      <Text style = {styles.text}>History</Text>
      {/* //Image of church go here */}
      {/* Text blurb go here, but if the user is admin, allow the ability to update what this says with a default value if left blank */}
    </View>
  </View>
    
  )
}

export default history

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight:30,
    flexDirection: 'column',
    alignContent:'center',
    flexWrap: "wrap",
  },

  text: {
    color:"black",
    fontSize: 42,
    fontWeight: 'bold',
    },
})