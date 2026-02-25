import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


type PhotoType = {
  id: number;
  imageData: string | undefined;
  description:string;
  
};

const photos = () => {
    console.log("This is the photos page!")

//OK...so this is going to loop through the json file and return JUST the photo for now. We'll see if it works
//UPDATE: This doesn't work, but we'll figure out why eventually. 
// When it returns an array, it isn't recognized by the image gallery functionality. Maybe I'm calling the givePhotos function wrong?
// const givePhotos = () => {

// let photoArray = [];

// for (const key in photosList){
//   photoArray.push(photosList[key].Filename);
// }


// return (
//   photoArray
// )

// }
// //So *THIS* is the correct way to display the path of the photo. How am I going to get the filename to replace the end of this string???
// const testImages = ["http://localhost:8081/assets/?unstable_path=.%2Fassets%2Fphotos/test.png","http://localhost:8081/assets/?unstable_path=.%2Fassets%2Fhome/olom001.jpg" ];

/* SCRAP THE ABOVE UNTIL FURTHER NOTICE */

//Log in authentication
useEffect( () => {
  const getLogin = async() => {
    try {
      const login = await AsyncStorage.getItem('adminpriv');
      if (login !== null) {
        // console.log(JSON.parse(login))
      }
      if (login == "true"){
        // console.log("Welcome to the event page, admin")
        show();
      }
      else if (login == "false"){
        // console.log("Visitor detected")
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

//States for PhotoType objects

//Set new photo (maybe include a masterlist if this doesn't work the way I hope it does?
const [photos, setPhotos] = useState<PhotoType[]>([]);
//Set ImageData (get from photo picked from gallery)
const [imageData, setimageData] = useState<string | undefined>(undefined);
//Set Description of photo
const [description, setDescription] = useState<string>('');

//States to show add/edit/delete functions for photos
const[adminButtons, setAdmin] = useState(false);
const show = () => setAdmin(true);
const hide = () => setAdmin(false);

//Modal that pops up when you select a photo
const[modal, setModal] = useState(false);
const showModal = () => setModal(true);
const hideModal = () => {setModal(false)};

//States to show photo creation modal
const[photoCreate, setPhotoCreate] = useState(false);
const showCreate = () => setPhotoCreate(true);
const hideCreate = () => setPhotoCreate(false);

//Getter function for photos + comments
useEffect( () => {
  const getPhotos = async() => {
    try {
      const photosJson = await AsyncStorage.getItem('my-photos');
      if (photosJson !== null){
        const parsed = JSON.parse(photosJson) as PhotoType[];
        setPhotos(parsed);
        console.log("Photo List:  " + photosJson);
      }
    } 
    catch (error){
      console.log (error);
    }
  } 
  getPhotos();
},[]) 

//Adding a new photo

const addPhoto = async () => {
  try {
    const newPhoto: PhotoType = {
      id: Math.random(),
      imageData: imageData,
      description: description
    };

    if (description == ""){
      alert("Cannot be blank");
      setDescription('');
      Keyboard.dismiss();
      return;
    }

    else if (imageData == null){
      alert("Please select a photo");
      setDescription('');
      Keyboard.dismiss();
    }

    // Update the list of photos
    photos.push(newPhoto);
    setPhotos(photos);
    await AsyncStorage.setItem('my-photos', JSON.stringify(photos));
    setDescription('');
    alert("Submitted!");
    Keyboard.dismiss();
  }
  catch(error) {
    console.log (error);
  }
}

//Now, I'm assuming that I'll need a function to get the filename from the FilePicker, but how???
//This looks to be it, but I'm not entirely sure yet

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setimageData(result.assets[0].uri)
    } else {
      alert('You did not select any image.');
    }}

/** Modals go here!! (although, some views may have to be made into functions like the previous pages) */
  return (
   //Trying something different. This is a placeholder

    <View style={styles.container}>
      {/* Button appears if admin is logged in */}
      {adminButtons && <Pressable
      style={styles.addPhoto}
      onPress={() => {
      showCreate()
      }}
      ><Text>Add photo</Text></Pressable>}
      
      <Text>Photo gallery in progress!!</Text>

      {/* Photo Gallery 
      _____________________
      So, now that I know that the files are being stored in the system, I can try to implement the gallery.
      Probably best to do that tomorrow. Would a FlatList of images work best? Is that even possible?*/}
      <View>

      </View>
      


     {/* Modal for photo viewing  */}
      <Modal 
       visible = {modal}
                  onRequestClose = {hideCreate}
                  animationType= "fade"
                  transparent>

                    {/* Image goes here */}
                    {/* Left and right arrows go here */}
                    {/* Exit button goes here. This is where hideModal() comes in */}

      </Modal>

      {/* Modal for photo entry creation */}
                  <Modal
                  visible = {photoCreate}
                  onRequestClose = {hideCreate}
                  animationType= "fade"
                  transparent>
                      <Pressable style = {styles.eventModalUpper} onPress = {hideCreate}/>
                      <KeyboardAvoidingView style= {styles.eventModalLower}>
                          <Text style = {styles.eventName}>Upload a photo!</Text>

                           {/* Photo preview */}
                           {/* Photo preview is going to show up here.
                           Will have a delete button just in case the user selects the wrong photo */}
                          <Image 
                          style = {styles.previewImage}
                          source={{uri: imageData}}
                          ></Image>

                           {/* Photo from Gallery Button */}
                          <Pressable style = {styles.galleryButton} onPress={() => pickImageAsync()}> 
                            <Text style = {styles.buttonText}>Select a Photo</Text>
                          </Pressable> 
      
                          {/* Description */}
                          <Text style = {styles.eventDescription}>Description:</Text>
                          <TextInput 
                          multiline placeholder ="Description" 
                          style = {styles.commentInput}
                          onChangeText={(description) => setDescription(description)}
                          value = {description}
                          maxLength = {500}
                          ></TextInput>
                    
                          {/* Submit Button */}
                          <Pressable style = {styles.submitButton} onPress={() => addPhoto()}> 
                            <Text style = {styles.buttonText}>Submit</Text>
                          </Pressable>  
                      </KeyboardAvoidingView>
                  </Modal>
    </View>

  )
}

export default photos

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },

    addPhoto: {
      height:'10%',
      width:'100%',
      borderRadius: 30, 
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: 'rgba(27, 107, 255, 0.7)',
      margin: 'auto',
      justifyContent:"center",
      alignItems:"center"
    },

    eventModalUpper: {
      height:100,
      backgroundColor:'#DDD',
      opacity:0.5,
  },

    eventModalLower:{
      flex: 1, 
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
  },

   eventName: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 30,
    fontWeight: 'bold',
  },
    
  
  eventDescription: {
    color:'rgba(61, 61, 61, 0.7)',
    fontSize: 20,
    fontWeight: 'bold',
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

  galleryButton:{
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
  photoModal:{
      flex: 1, 
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
  },
  previewImage:{
    flex: 1,
    resizeMode: 'contain',
    height: 50,
    width:50,
    
  }
})