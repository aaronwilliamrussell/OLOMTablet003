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

  //Returned UI Elements
  return (
  <ScrollView>
    <View style = {styles.container}>

      
      <Image
      style= {styles.image}
      source={{uri: 'https://www.heritage.nf.ca/articles/society/images/our-lady-mercy.jpg'}}
      ></Image>
      <TextInput 
        multiline placeholder ="Default admin message" 
        style = {styles.commentInput}> </TextInput>

    {/*Hard to see here, but this next part hides the text input if you aren't an admin. It's shorthand, so it might be a little hard
    to understand. Basically, "______?" is asking " if this is true, do this" and the ":" is the else statement */}  

    {/* {!visible? 
    <Text style={styles.text}>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique placerat elit a elementum. Quisque sagittis sed arcu aliquet auctor. Cras dapibus, nibh dictum sagittis laoreet, erat neque sagittis lectus, a sollicitudin ipsum felis eu elit. Suspendisse fermentum lorem non augue dictum accumsan. Mauris arcu felis, sollicitudin nec bibendum id, dictum a lectus. Vestibulum ac venenatis elit. Ut a congue massa. Pellentesque sit amet magna dui. Nunc aliquam id turpis quis dictum. Maecenas urna diam, faucibus quis felis et, ornare posuere velit.

Etiam ante urna, malesuada consequat urna sit amet, pharetra tempor neque. In dignissim, libero ut egestas faucibus, dui lorem consequat tellus, eu sagittis metus ex ut dui. Duis bibendum est eu placerat malesuada. Pellentesque a varius nisi. Curabitur viverra turpis eu orci aliquam, sit amet suscipit est consectetur. Integer eu tempus neque. Duis vel lorem ut felis eleifend cursus. Cras eleifend nisl in posuere congue. Suspendisse dictum sed urna maximus fermentum.

Vivamus eget imperdiet felis. Praesent tincidunt ornare auctor. Proin euismod nisl vel elit mattis, porttitor dignissim odio cursus. Maecenas aliquet ligula id tellus vestibulum tincidunt. Pellentesque finibus, diam eu volutpat feugiat, purus lacus pretium est, molestie tempor urna arcu in velit. Vivamus nec libero iaculis, bibendum massa a, maximus ante. Ut lacinia risus quis ex molestie, a vehicula arcu placerat. In lacus orci, egestas ac congue eu, pellentesque at est.

Quisque eu mattis dolor. Nunc vitae nulla quis augue dapibus tempus in ut ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse ultrices, lectus porta vestibulum dictum, nisi justo sollicitudin lacus, ac ultrices nibh libero sit amet justo. Morbi vel quam vel arcu aliquet porta nec eu mi. Curabitur eget urna ac enim interdum scelerisque at et nulla. Fusce at luctus ex, eu dignissim urna. Donec odio tortor, consequat in euismod ut, interdum et dolor. Sed nec erat non metus volutpat tempus. Pellentesque ornare venenatis mauris eget ornare. Quisque ut risus scelerisque, venenatis nibh at, ornare enim. Cras suscipit luctus eros quis vestibulum. Cras feugiat tincidunt sem, nec tempus ante feugiat non. Proin tristique mattis elementum. In non dapibus odio. Praesent est risus, volutpat id consequat ut, pulvinar vel velit.

Fusce blandit interdum nunc vitae dapibus. Nulla bibendum interdum sem, nec tincidunt sapien feugiat ut. Duis eu sapien justo. Sed vel ligula et felis sollicitudin malesuada. Nunc nec elit id tellus sollicitudin consequat. Cras quis dui nisi. Nam sit amet elit vitae tortor consectetur luctus. Maecenas condimentum ac nisi at hendrerit. Aliquam sagittis quam nibh, sit amet fringilla lectus fringilla sed. Pellentesque ut porttitor neque. Vivamus eu maximus sem. Duis non interdum velit, tincidunt faucibus nibh. Fusce mattis porttitor elit eu placerat.

</Text> : 

<TextInput 
multiline placeholder ="Default admin message" 
style = {styles.commentInput}> </TextInput>} */}
    
    </View>
    
  </ScrollView>
    
  )
}

export default history

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingLeft: 40,
    paddingRight:40,
    flexDirection: 'column',
    alignItems:'center',
    flexWrap: "wrap",
  },

  text: {
    color:"black",
    fontSize: 30,
    fontWeight: 'bold',
    },

  image: {
    resizeMode: 'contain',
    height: 800,
    width: 800,
  },
   commentInput: {
    width: '100%',
    height: '50%',
    marginBottom: '1%',
    borderWidth: 2,
    borderColor: 'rgba(110, 110, 110, 0.51)',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 10, 
    textAlign: 'auto',
    padding:5,
    fontSize:30
  },
})