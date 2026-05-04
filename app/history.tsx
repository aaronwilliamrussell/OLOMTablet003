//Note for later....If I get time, wouldn't it be cool to do a sort of animated timeline? Like one of those really interactable
//react pages where stuff pops up as you scroll
import { memo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useFonts } from 'expo-font';
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const data = [...new Array(5).keys()];
const width = 800

const history = () => {
  //Initializing some fancy fonts
  useFonts({
    'Madrid': require('../assets/fonts/Madrid.ttf')
  }
  )

  const [slideNo, setslideNo] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
    setslideNo(index);
  };

  

  //Returned UI Elements
  return (
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.historyContainer}>
        <View style={styles.historyBlurb}>
          <Text style={styles.blurbHeading}>About Us</Text>
          <Image style={styles.blurbIcon} source={{uri: 'https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/logo-1.png'} }></Image>
          <Text style={styles.blurbText}>Our Lady of Mercy Complex Committee is a non profit organization dedicated to the promotion, preservation and restoration of the church and complex for the 
            people of the Port au Port/Bay St. George area as well as the entire province of Newfoundland and Labrador.</Text>
        </View>

        
        <Carousel
        width={width}
        height={420}
        ref={ref}
        defaultIndex={0}
        style={styles.historyModal}
        data={data}
        onProgressChange={progress}
        renderItem={({ index }) => (
          <Dynamic index={index} />
        )}
      />
      </View>

       <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10,  marginBottom: 10}}
        onPress={onPressPagination}
      />

      <View style={styles.horizontalDivider}></View>

      <View style={styles.employees}>
        <View style={styles.employeeContainer}>
          <Text style={styles.employeeName}>Person Name</Text>
          <Text style={styles.employeeTitle}>Title</Text>
          <Text style={styles.employeeDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at felis diam. Praesent rhoncus in risus non posuere. Pellentesque efficitur elit vel odio porttitor suscipit. Sed et lectus vel est lobortis vehicula. Nunc consequat nibh ac ante mollis ultricies. Nullam porta dictum enim, eget suscipit leo auctor ut. Nulla ut mattis purus, eu vehicula sem. Integer nec euismod eros, nec ullamcorper diam. Nunc maximus erat elit, et faucibus ligula mollis in. Etiam mollis mauris metus, a lacinia quam tempor quis.</Text>
        </View>

        <View style={styles.employeeContainer}>
          <Text style={styles.employeeName}>Person Name</Text>
          <Text style={styles.employeeTitle}>Title</Text>
          <Text style={styles.employeeDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at felis diam. Praesent rhoncus in risus non posuere. Pellentesque efficitur elit vel odio porttitor suscipit. Sed et lectus vel est lobortis vehicula. Nunc consequat nibh ac ante mollis ultricies. Nullam porta dictum enim, eget suscipit leo auctor ut. Nulla ut mattis purus, eu vehicula sem. Integer nec euismod eros, nec ullamcorper diam. Nunc maximus erat elit, et faucibus ligula mollis in. Etiam mollis mauris metus, a lacinia quam tempor quis.</Text>
        </View>

        <View style={styles.employeeContainer}>
          <Text style={styles.employeeName}>Person Name</Text>
          <Text style={styles.employeeTitle}>Title</Text>
          <Text style={styles.employeeDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at felis diam. Praesent rhoncus in risus non posuere. Pellentesque efficitur elit vel odio porttitor suscipit. Sed et lectus vel est lobortis vehicula. Nunc consequat nibh ac ante mollis ultricies. Nullam porta dictum enim, eget suscipit leo auctor ut. Nulla ut mattis purus, eu vehicula sem. Integer nec euismod eros, nec ullamcorper diam. Nunc maximus erat elit, et faucibus ligula mollis in. Etiam mollis mauris metus, a lacinia quam tempor quis.</Text>
        </View>


      </View>

    </ScrollView>
  );

  
}
export default history

//code to return different views per page swiped. Will it work? I have no clue. We'll workshop this
const Dynamic = memo(({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <View style={styles.page1}>
          <Image style={styles.p1image} source={{uri: 'https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/church.jpg'} }></Image>
              <View style = {styles.p1para}>
                <Text style={styles.heading}>At 115 feet in height, Our Lady of Mercy Church of Port au Port West, Newfoundland & 
                  Labrador stands tall between the landmasses of Bay St. George 
                  and Port au Port Bay.
                </Text>
                <Text style={styles.paragraph} adjustsFontSizeToFit numberOfLines={18}>
                  With a church so large in size and with the beautiful mastery of local craftsmanship and having 
                  a seating capacity of 1,000, many question why a church so large would be built for a population so small. {"\n"}
                  {"\n"} In 1910 a limestone quarry had opened in Jack of Club's Cove, where the name had soon changed to Aguathuna, a Beothuk 
                  name meaning 'White Rock'. The change came so business and trade from others afar would be taken more seriously. With increasing employment in the area came 500 
                  men for the job, and with those men came 500 women, which would adorn the hopes of an increasing population. In the early days of Aguathuna, it was believed that 
                  due to the expansion of families and promising employment that the area would develop into what would become
                  Newfoundland's second city outside of the island's capital of St. John's. 
                  Sadly, the population boom did not occur in later years due to a sudden closure of the quarry operation where the cost of shipping exceeded the means.
                </Text>
              </View>

        </View>
      );
    case 1:
      return (
        <View style={styles.page2}>

          <View style={styles.p2Container}>
            <Image style={styles.p2Image} source={{uri: 'https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/IMG_4836.jpg'} }></Image>
            <Text adjustsFontSizeToFit numberOfLines={10}> With a large religious population, there would be a great requirement for a church to house the population, thus Our Lady of Mercy Church had been developed. 
              It was a dream of Father Joy, the first parish priest in the area. Father Joy had the church designed, and a plan drawn up for a build that would start in 1914 and would take 11 years to complete. 
              The church was consecrated in 1925. In the early years, Father Joy trained in Italy and chose the architecture and 
              structure to reflect churches he had seen while there.</Text>
          </View>

          <View style={styles.p2Container}>
            <Image style={styles.p2Image} source={{uri: 'https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/built.jpg'} }></Image>
            <Text adjustsFontSizeToFit numberOfLines={10}> For such a mighty structure to be built there would be a great deal of capital involved, though Father Joy wanted the structure to be built debt free. 
              In order to do so, he had it built with mainly volunteer labor. Most of the construction was contributed by able bodied fisherman, farmers, miners and adolescents 
              of the parish who each donated at least one week of work per year to the build. 
              There were donations of wood from Nova Scotia and Quebec, and the local communities of Point au Mal, West Bay and Piccadilly.</Text>
          </View>


        </View>
      );
    case 2: 
      return (
        <View style={styles.page3}>
          <Image style={styles.p3Image} source={{uri: 'https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/IMG_4874.jpg'} }></Image>
            <View style={styles.p3paraContainer}>
              <Text style={styles.heading}>Our Lady of Mercy Event Hall</Text>
              <Text style={styles.paragraph}>Our Lady of Mercy Event Hall is one of the largest and most versatile venues on the Port au Port Peninsula, offering a spacious, welcoming atmosphere ideal for a wide range of gatherings. 
                Whether you’re planning a grand wedding reception, an intimate family reunion, a vibrant gallery exhibition, or a community luncheon, our hall provides the perfect setting.
The venue is also well-suited for special celebrations such as bridal showers, baby showers, milestone birthdays, retirement parties, and more. With ample seating capacity, modern amenities, 
and a charming aesthetic, the hall offers flexibility to accommodate both formal and casual events. Let us help make your event memorable. For inquiries about availability, rates, or to 
arrange a booking, please don’t hesitate to contact us. Our team is happy to assist you in planning a successful and seamless event experience.</Text>
            </View>
        </View>
      );

      case 3:
        return (
          <View style={styles.page4}>
            <Text style={styles.heading}>The beautifully hand carved 14 stations of the cross were brought in by Joy from Italy and are made of Carrera marble,</Text>
            <Text style = {styles.paragraph}>Surrounded by travertine marble. Carrera marble was mined under water not far from the town of Carrera where Michelangelo did most of his work. 
              In present day the marble is no longer mined, which makes the stations particularly irreplaceable. 
              As for most of the statues individual families donated them along with the and stained glass structures in memory of their loved ones.</Text>
          </View>
        );

      case 4: 
        return (
             <View style={styles.page1}>
              <View style = {styles.p1para}>
                <Text style={styles.heading}>During the build, Mr. Emile Felix
                </Text>
                <Text style={styles.paragraph} adjustsFontSizeToFit numberOfLines={18}>
                  An elderly fisherman from the community who had been too old to climb on the scaffolding of the 35-meter high structure, wished to be of some 
                  assistance to the build. With that in mind, Mr. Felix, who could not read, or write took it upon himself to construct the altar rail by hand carving it using only a pocketknife, 
                  a homemade plain, an axe and a saw. Today it stands as a testament for what the skilled Newfoundlanders could do at the time with little or no tools.
The design of the church, looking from the sanctuary down, is in the form of a cross. The local craftsmen had built the ceiling of the church in the same way they would 
have built the hull of a schooner. In essence, the ceiling of the church is built as a boat, but bottom up!
The structure stands as one of Newfoundland and Labrador’s best venues for acoustics. With that being said, the church is no stranger to concerts and plays such as Murder in the Cathedral and International Choirs.
In later years in 1997, the church was named a Registered Heritage
Structure by the Heritage Foundation of Newfoundland and Labrador.
                </Text>
              </View>
              <Image style={styles.p1image} source={{uri: 'https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/ss.jpg'} }></Image>
        </View>
        );
    default:
      return (
        <View />
      );
  }
});

const styles = StyleSheet.create({
   container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
  },

  historyContainer: {
    flex: 2,
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    padding: 8,
  },

  historyBlurb: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: '#59B6CF',
    borderWidth: 6,
    backgroundColor: '#ffffff',
    padding: 8,
  },

  blurbHeading: {
    fontSize:50,
    fontFamily:'Madrid',
    alignSelf:'center'
  },

  blurbText:{
    textAlign:'center',
    fontSize:20,
  },

  blurbIcon: {
      alignSelf:'center',
      width: 60,
      height: 50
  },

  historyModal:{
    flex: 2,
    backgroundColor: '#8b8b8b',
    borderRadius: 10,
    borderColor:'#dddddd',
    borderWidth: 2,
    marginLeft:10,
    padding: 8,
  },

  page1:{
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#ffffff',
    padding: 10
  },

    p1image: {
      flex:1,
      resizeMode: 'contain',
      width: 'auto',
      height:'95%'
    },

    p1para:{
      flex: 1,
      flexDirection:'column'
    },

    heading:{
      fontWeight:'bold',
      fontSize:19
    },

    paragraph:{
      fontSize:15
    },



  page2:{
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#ffffff',
    padding:8
  },

  p2Container: {
    flex: 1,
    flexDirection:'column',

  },

  p2Image: {
      alignSelf:'center',
      resizeMode: 'contain',
      width: '70%',
      height:'70%'
  },

  p2Paragraph: {
    textAlign:'center'
  },

  page3:{
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#ffffff',
    padding:8
  },

  p3Image:{
    flex: 1,
    alignSelf:'center',
    resizeMode: 'contain',
    width: '70%',
    height:'70%'
  },

  p3paraContainer: {
    flex: 1,
    flexDirection:'column'
  },


  page4:{
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#ffffff',
    padding:8
  },

  
  page5:{

  },

  horizontalDivider: {
        height:2,
        width:"50%",
        alignSelf:"center",
        backgroundColor:  '#59B6CF',
        margin: 10,
  },

  employees: {
    flex: 1,
    flexDirection:'row',
    width: '100%',
    padding: 8,
    flexWrap: "wrap"
  },

  employeeContainer:{
    width: "33.3%",
    backgroundColor: '#ffffff',
    padding: 8,
  },

  employeeName: {
    fontSize:30,
    fontFamily:'Madrid',
    alignSelf:'center',
    color:'#59B6CF'
  },

  employeeTitle: {
    fontSize:20,
    fontFamily:'Madrid',
    alignSelf:'center',
    color:'#000000'
  },

  employeeDescription:{
    fontSize: 10,
    alignSelf:'center'
  }
})