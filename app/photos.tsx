import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';

type PhotoType = {
  id: number;
  imageData: string | null | undefined; // this will be base64
  description:string;
  imageLocation: string | null | undefined
};

const photos = () => {

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

//Set new photo 
const [photos, setPhotos] = useState<PhotoType[]>([]);
//Set ImageData (get from photo picked from gallery)
const [imageData, setimageData] = useState<string | null |undefined>(undefined);
//Set Description of photo
const [description, setDescription] = useState<string>('');
//Set photo index
const [photoIndex, setIndex] = useState<number>();
//Set photo source (WIP)
const [imageLocation, setImageLocation] = useState<string | null |undefined>(undefined);


//States to show add/edit/delete functions for photos
const[adminButtons, setAdmin] = useState(false);
const show = () => setAdmin(true);
const hide = () => setAdmin(false);

//Modal that pops up when you select a photo
const[modal, setModal] = useState(false);
const showModal = () => {setModal(true)};
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
//save base64 of photo to local storage and get location of photo. property = imageSource
    saveImage()

    const newPhoto: PhotoType = {
      id: Math.random(),
      imageData: imageData,
      description: description,
      imageLocation: imageLocation
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
    //Starting to wonder if storing in AsyncStorage is the best idea. My photos dissappear after a while.....
    setDescription('');
    alert("Submitted!");
    Keyboard.dismiss();
  }
  catch(error) {
    console.log (error);
  }
}

//Deleting a photo (if admin)

const deletePhoto = async (id:number) => {
  try {
    const newPhoto = photos.filter((entry) => entry.id !== id);
    await AsyncStorage.setItem("my-photos", JSON.stringify(newPhoto));
    setPhotos(newPhoto);
  } 
  catch(error) {
    console.log(error);
  }
}

//Getting the index of the thumbnail selected so that the modal opens on the corresponding folder
const getFilteredPhoto = async (id:number) => {
    const indexofPhot = photos.findIndex((entry) => entry.id === id)
    //Set index
    setIndex(indexofPhot)
}


//Pick image from gallery

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      console.log(result);
      setimageData(result.assets[0].base64)
      /**this JUST sets the URI. We need to change this so that the photo gets stored in local storage (file system??)
       * and then the URL to that file location is set as the imagedata. Easy? It certainly sounds easy, but idk if it'll work.
       * We'll find out 
       **/
      
    } else {
      alert('You did not select any image.');
    }}

//Save picked image to local storage (somehow)

    const saveImage = () => {
      //get the current imageData
      //save it to local storage
      //get location + set location in  imageLocation state
    }

/** Views go here!! (although, some views may have to be made into functions like the previous pages) */
  return (
    <View style={styles.container}>
      {/* Button appears if admin is logged in */}
      {adminButtons && <Pressable
      style={styles.addPhoto}
      onPress={() => {
      showCreate()
      }}
      ><Text>Add photo</Text></Pressable>}

      {/* Photo Gallery */}
      <ScrollView contentContainerStyle = {styles.gallery}>
        {photos.map (key => 
          
            <PhotoThumbnail entry = {key} deleteEntry={deletePhoto} visible = {adminButtons} showModal={showModal} getFilteredPhoto={getFilteredPhoto} />
          
        )}

      </ScrollView>
      
     {/* Modal that pops up when an image thumbnail is clicked. Users can swipe through to see different photos */}
      <Modal 
       visible = {modal}
                  onRequestClose = {hideModal}
                  animationType= "fade"
                  transparent>
       
      <View style={styles.pageContain}>
        <Ionicons  name= "chevron-back-circle-outline" size={50} color={'white'} />
        <TouchableOpacity style = {styles.backButtonContain} onPress={hideModal}>
        </TouchableOpacity>
      <PagerView style={styles.pageContain} initialPage={photoIndex}>

        {photos.map (key => 
          
            <ModalPhoto entry = {key}/>
        )}

      </PagerView>
    </View>
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
                          source={{uri: imageLocation}}
                          ></Image>

                           {/* Photo from Gallery Button */}
                          <Pressable style = {styles.photoLibrary} onPress={() => pickImageAsync()}> 
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

//The function that returns each thumbail per photo uploaded
const PhotoThumbnail = ({entry, visible, showModal, deleteEntry, getFilteredPhoto} : {entry: PhotoType, visible:boolean, deleteEntry: (id: number) => void, showModal: () => void, getFilteredPhoto: (id:number) => void}) => {
  return (
  <TouchableOpacity 
  style = {styles.galleryThumbnailContainer}
   onPress={() => {
              getFilteredPhoto(entry.id);
              showModal();
              console.log("URI: " + entry.imageData)
            }}
            >
            <Image
            style= {styles.thumbnailImage}
            source={{uri: entry.imageLocation}}
            ></Image>

            {/* Delete button only viewable in admin mode! */}
            {visible && <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              deleteEntry(entry.id);
              console.log("Deleted: " + entry.id);
            }}>
            <Ionicons  name= "trash" size={10} color={'grey'} /></TouchableOpacity>}
        
          </TouchableOpacity>
          ) 

}

//Function that returns a modal where each image is derived from the PhotosList
const ModalPhoto = ({entry} : {entry: PhotoType}) =>{
  return (
    <View style={styles.page} key={entry.id}>
          <Image
          source={{uri: entry.imageLocation}}
          style= {styles.modalImage}
          ></Image>
          <Text>{entry.description}</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
    },

    gallery: {
      flexGrow:1,
      justifyContent:"flex-start",
      width: "100%",
      height: 'auto',
      flexDirection: 'row',
      flexWrap: "wrap",
      margin: 30
    },

   
    galleryThumbnailContainer: {
      width: 100, 
      height: 100,
      backgroundColor: 'rgba(34, 137, 255, 0.7)',
      margin: 10
    },

    thumbnailImage: {
      width: '100%', 
      height: '100%',
      backgroundColor: 'rgba(255, 34, 34, 0.7)'
    },

    deleteButton: {
      width: 10, 
      height: 10,
    //make absolute
    
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

  photoLibrary:{
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
    
  },

  //Testing styles for page viewer
   pageContain: {
    flex: 1,
    backgroundColor:'#535353',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonContain: {
     position: 'absolute',
           left: 0,
           right: 0,
           top: 0,
           bottom: 0,
      width: 50,
      height:50,
  },

  modalImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    backgroundColor:'#ff9900',
  },

  modalText: {
    color:'rgb(255, 255, 255)',
    fontFamily: "arial",
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }

})