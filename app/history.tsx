//Note for later....If I get time, wouldn't it be cool to do a sort of animated timeline? Like one of those really interactable
//react pages where stuff pops up as you scroll

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useFonts } from 'expo-font';

const history = () => {
  //Initializing some fancy fonts
  useFonts({
    'Madrid': require('../assets/fonts/Madrid.ttf')
  }
  )

  //Returned UI Elements
  return (
  <View style= {styles.base}>
    
    <ScrollView style={styles.container}>

      <View style={styles.block1}>
       <View style = {styles.block1Int}>
        <Text style = {styles.block1IntTitle}>Our History</Text>
        <Text style = {styles.block1IntText}>Our Lady of Mercy Complex Committee is a non profit organization dedicated to the promotion, preservation and restoration of the church and complex for the people of the Port au Port/Bay St. George area as well as the entire province of  Newfoundland and Labrador.</Text>
       </View>
      </View>

      <View style={styles.block2}>
        <Image style={styles.b2Image} source ={{uri:"https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/church.jpg" }}></Image>
        <View style = {styles.b2TextContainer}>
        <Text style = {styles.b2TextTitle}>At 115 feet in height, Our Lady of Mercy Church of Port au Port West, Newfoundland & Labrador stands tall between the landmasses of Bay St. George and Port au Port Bay.</Text>
        <Text style = {styles.b2Text}>With a church so large in size and with the beautiful mastery of local craftsmanship and having a seating capacity of 1,000, many question why a church so large would be built for a population so small.

In 1910 a limestone quarry had opened in Jack of Club’s Cove, where the name had soon changed to Aguathuna, a Beothuk name meaning ‘White Rock.’ The change came so business and trade from others afar would be taken more seriously. With increasing employment in the area came 500 men for the job, and with those men came 500 women, which would adorn the hopes of an increasing population. In the early days of Aguathuna, it was believed that due to the expansion of
families and promising employment that the area would develop into what would become Newfoundland’s second city outside of the island’s capital of St. John’s. Sadly, the population boom did not occur in later years due to a sudden closure of the quarry operation where the cost of shipping exceeded the means.</Text>
</View>
      </View>

      <View style={styles.block3}>
        <View style={styles.b3Container}>
          <Image style={styles.b3Image}source= {{uri:"https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/IMG_4836.jpg"}}></Image>
          <Text style={styles.b3Text}>With a large religious population, there would be a great requirement for a church to house the population, thus Our Lady of Mercy Church had been developed. It was a dream of Father Joy, the first parish priest in the area. Father Joy had the church designed, and a plan drawn up for a build that would start in 1914 and would take 11 years to complete. The church was consecrated in 1925. In the early years, Father Joy trained in Italy and chose the architecture and structure to reflect churches he had seen while there.</Text>
        </View>
        <View style={styles.b3Container}>
          <Image style={styles.b3Image}source={{uri:"https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/built.jpg"}}></Image>
          <Text style={styles.b3Text}>For such a mighty structure to be built there would be a great deal of capital involved, though Father Joy wanted the structure to be built debt free. In order to do so, he had it built with mainly volunteer labor. Most of the construction was contributed by able bodied fisherman, farmers, miners and adolescents of the parish who each donated at least one week of work per year to the build. There were donations of wood from Nova Scotia and Quebec, and the local communities of Point au Mal, West Bay and Piccadilly.</Text>
        </View>
      </View>

            <View style={styles.block2}>
        <Image style={styles.b2Image} source ={{uri:"https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/IMG_4874.jpg"}}></Image>
        <View style = {styles.b2TextContainer}>
        <Text style = {styles.b2TextTitle}>Our Lady of Mercy Event Hall</Text>
        <Text style = {styles.b2Text}>Our Lady of Mercy Event Hall is one of the largest and most versatile venues on the Port au Port Peninsula, offering a spacious, welcoming atmosphere ideal for a wide range of gatherings. Whether you’re planning a grand wedding reception, an intimate family reunion, a vibrant gallery exhibition, or a community luncheon, our hall provides the perfect setting.

The venue is also well-suited for special celebrations such as bridal showers, baby showers, milestone birthdays, retirement parties, and more. With ample seating capacity, modern amenities, and a charming aesthetic, the hall offers flexibility to accommodate both formal and casual events.

Let us help make your event memorable. For inquiries about availability, rates, or to arrange a booking, please don’t hesitate to contact us. Our team is happy to assist you in planning a successful and seamless event experience.</Text>
</View>
      </View>

      <View style={styles.block4}>
      <Text style={styles.b4Title}>The beautifully hand carved 14 stations of the cross were brought in by Joy from Italy and are made of Carrera marble,</Text>
      <Text style={styles.b4Text}>Surrounded by travertine marble. Carrera marble was mined under water not far from the town of Carrera where Michelangelo did most of his work. In present day the marble is no longer mined, which makes the stations particularly irreplaceable. As for most of the statues individual families donated them along with the and stained glass structures in memory of their loved ones.</Text>

      </View>

      <View style={styles.block2}>
      <View style = {styles.b2TextContainer}>
        <Text style = {styles.b2TextTitle}>During the build,
Mr. Emile Felix</Text>
        <Text style = {styles.b2Text}>An elderly fisherman from the community who had been too old to climb on the scaffolding of the 35-meter high structure, wished to be of some assistance to the build. With that in mind, Mr. Felix, who could not read, or write took it upon himself to construct the altar rail by hand carving it using only a pocketknife, a homemade plain, an axe and a saw. Today it stands as a testament for what the skilled Newfoundlanders could do at the time with little or no tools.

The design of the church, looking from the sanctuary down, is in the form of a cross. The local craftsmen had built the ceiling of the church in the same way they would have built the hull of a schooner. In essence, the ceiling of the church is built as a boat, but bottom up!

The structure stands as one of Newfoundland and Labrador’s best venues for acoustics. With that being said, the church is no stranger to concerts and plays such as Murder in the Cathedral and International Choirs.

In later years in 1997, the church was named a Registered Heritage
Structure by the Heritage Foundation of Newfoundland and Labrador.</Text>

</View>
<Image style={styles.b2Image} source ={{uri:"https://www.ourladyofmercynl.com/wp-content/uploads/2025/03/ss.jpg"}}></Image>
      </View>

      <View style={styles.block5}>
        <Text style={styles.b5Title}>Our Lady of Mercy Complex Committee</Text>

            <Text style={styles.b5Heading}>Joanne Rose- Chairperson
            </Text>
            <Text style={styles.b5text}>Joanne is a retired health care administrator with a Bachelor of Nursing and a master’s in business administration. Residing in Stephenville, Joanne has served on regional/provincial and national boards and committees. She brings to the board a strong background in strategic planning, accountability frameworks, proposal development. Joanne has been active in creative arts and crafts, serving as past chair of the Bay St George Artists Association. Joanne has been volunteering with the OLMCC for two years with a focus on broadening the stage for music, textiles and art in the heritage structure; developing working relationships with local and regional partners; and expanding the gift shop representation of local artisans</Text>

  <Text style={styles.b5Heading}>Sandra Hunt- Vice Chair
            </Text>
            <Text style={styles.b5text}>Sandra is originally from Black Duck Siding and moved to Port au Port West in 1989 where it has been her home for 35 years. Port au Port West is the community where she raised her two daughters; one of whom is now a champion for sports and recreation and the other for social work and counselling. Both of Sandra’s daughters have previously worked at Our Lady of Mercy Museum in their youth.

Sandra is retired from a career of working with individuals with special needs, at-risk teens, and infant care. Sandra also has experience developing programs for her clients that target social needs but also develop life skills. Sandra has 12 years of experience volunteering at St Thomas Aquinas when her daughters were attending school there. She assisted with the preschool accelerated reading program. Sandra has experience volunteering at the Stephenville Dome while her daughter was involved in Minor Hockey.

Sandra is interested in community development and thinks it is never too late to try something new.</Text>

<Text style={styles.b5Heading}>Andrew Hibbitts- Secretary
            </Text>
            <Text style={styles.b5text}>Andrew Hibbitts currently works as an Economic Development Officer with Horizon TNL (formerly known as RDÉE TNL), Newfoundland and Labrador’s bilingual economic development organization. Through this position he is involved with various committees and non-profit organizations throughout the area. The mandate of Horizon TNL includes tourism, immigration, entrepreneurship, and employability.

Prior this position, he worked in various capacities in the tourism sector in Saint-Pierre et Miquelon. After spending years on the French archipelago, he returned home and is now a resident of Stephenville and works on the scenic Port au Port peninsula.

Andrew graduated from Cape Breton University with a Bachelor of Business Administration in Human Resources and a Bachelor of Arts in Community Studies. He also holds diplomas in Business Administration Marketing and Human Resource Management from College of the North Atlantic, a certificate in Indigenous Studies from the University of Alberta and a certificate in Economic Development from the University of Waterloo. He is currently working on a Master of Arts degree through distance learning at Athabasca University.</Text>

<Text style={styles.b5Heading}>Cindy Coffin- Treasurer
            </Text>
            <Text style={styles.b5text}>Cindy has been an avid volunteer in the community and with OLMCC. For the 2023 and 2024 seasons she was the on-site manager for the heritage church, museum, tearoom and gift shop. Cindy brings a wealth of career experience with operations management. She welcomes to opportunity to work with the board and sees the inclusion of the community as a priority for the board. She and her husband Matt can often been seen volunteering at the organization events.</Text>

<Text style={styles.b5Heading}>Phyllis Doucette- Director
            </Text>
            <Text style={styles.b5text}>Phyllis is a director on Our Lady of Mercy Complex Committee. In 1992, she along with her husband began and operated a successful fishing enterprise for twenty-nine years. Phyllis has been an active volunteer with; the Port au Port West Leisure Club from 1985 to 2010, the Port au Port West Volunteer Fire Dept from 1995 to 2013 and the Campbell’s Creek Fundraising Committee from 2005 to 2019.

In 1997, Phyllis was elected as a Councillor for the Town of Port au Port West, Aguathuna, Felix Cove. She served in the capacity of Deputy Mayor before accepting the position of Mayor in 2005 where she fulfilled her role as Mayor for two full four-year terms. At present, she is the Treasurer of the Port au Port Economic Development Association and has been since 2016. Born and raised in the community of Campbell’s Creek on the Port au Port Peninsula, Phyllis now calls Port au Port West home.</Text>

<Text style={styles.b5Heading}>Douglas Dwyer- Director
            </Text>
            <Text style={styles.b5text}>Having only been a resident of Port au Port for under a year, Doug has been looking for the right opportunity to get involved locally. He was born at St. Mike’s hospital in downtown Toronto, but escaped north to Sudbury, Ontario, as a toddler. His youth and teen years were primarily focused on a stunningly average, yet passionate, amateur sports career and a keen interest in both church, public service, and volunteerism. While his career has primarily centered on Information Technology Management and Project and Implementation management, his vocation has been quite separate from his employment. In addition to being a single parent raising two now adult boys, Doug’s passion has always been around organizational development and fundraising. Specifically, Doug forged a working relationship with the municipal government of Tottenham, ON, the lead the fundraising and installations of baseball stadium lights benefitting the community of baseball players in the area. He bridged the representation of multiple leagues and organizations to present a consolidated view to Town Council.

Doug has volunteered with Food Banks and was a foundational member of the JAK Fund Charity which supports Teens in Transition as well as being a supporting and planning partner for the Help the Kids Play Charity which supports financially challenged families with registration, equipment, and travel.

Professionally Doug brings a long record of proposal writing and evaluation as well as contract administration from both public and private sectors. Personally, writing, questionable humour, and cooking are passionate activities.</Text>

<Text style={styles.b5Heading}>Joanne Targett-  Director
            </Text>
            <Text style={styles.b5text}>Joanne is a native of Port au Port East. Joanne has travelled the world having experiences living in other countries and communities. After having a career in public service in data entry, she has retired to home be with her grandchildren. Joanne brings her experience in bookkeeping and taxation and is bonded. She has been actively involved as a volunteer with the complex over the years and is one of the newest board members. Joanne believes in the preservation of the heritage site for the history and for the community.</Text>

<Text style={styles.b5Heading}>Lynn MacDonald- Director
            </Text>
            <Text style={styles.b5text}>Lynn MacDonald is a newly retired teacher, currently enjoying some substituting at our local high schools. For 25 years, she had the pleasure of teaching mathematics at Stephenville High School. Throughout her 30 year career, she was actively involved with the students and their extracurricular activities. Lynn also served on many committees at the school, district and provincial level that focused on curriculum development, leadership, and assessment. She has always been a community minded individual and looks forward to an opportunity to help preserve one of Port au Port’s greatest treasures.

Many years ago, Lynn was one of the first student tour guides at Our Lady of Mercy Church. We had the pleasure of sharing stories of how an entire community, my paternal grandparents included, sacrificed and worked together to build this magnificent structure. It seems fitting to continue the tradition.</Text>

<Text style={styles.b5Heading}>Kathleen Lawlor- Director
            </Text>
            <Text style={styles.b5text}>Kathleen Lawlor is a retired teacher in the town of Port au Port West. She has a Bachelor of Education and a Bachelor of Arts majoring in History from Memorial University of Newfoundland. Kathleen received her Master’s degree in Arts majoring in Guidance. She is a well-known teacher and guidance counsellor in the community having done so for 31 years before retiring. Kathleen has been integral in the history of Our Lady of Mercy, having served on the parish board for 20 years, then on the Gravels Development Committee throughout their tenure as guardians of the site. She also played a leadership role in the establishment of the on-site Museum.

Kathleen has been an avid researcher on the history of Port au Port, speaking to many of the original builders. She has played a vital role in the previous projects to revitalize the historic church and has been directly involved in preserving the history of the building, the people and the community. In 2023, Kathleen received the Provincial Southcott Lifetime Achievement Award recognizing a lifetime dedicated to the protection, promotion and preservation of Newfoundland and Labrador built heritage.</Text>

<Text style={styles.b5Heading}>Melissa Targett- Director
            </Text>
            <Text style={styles.b5text}>Melissa is a local enthusiast of the community culture and history and proud that her family’s involvement with the church goes back to its very beginning. Melissa is also a registered member of the Port au Port Indian Band and has status with the Qalipu Mi’kmaq First Nation. She brings with her a diverse set of work skills, knowledge and experience ranging from management and customer service to sales. Melissa successfully operated and sold a roofing and siding company. She brings strong managerial skills to the table with experience in logistics and retail management. Melissa has an educational background in business and engineering and is looking forward to bringing her experience and skills to the committee. She is excited to be in a chair position to preserve the community legacy and history.</Text>

<Text style={styles.b5Heading}>
            </Text>
            <Text style={styles.b5text}></Text>

      </View>
    </ScrollView>

    
  </View>
  );
}
export default history

const styles = StyleSheet.create({
  base: {
    flex:1,
    backgroundColor: '#ecf0f1',
  },

   container: {
    backgroundColor: '#ecf0f1',
    padding:0,
  },

    block1: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 70,
  },

      block1Int: {
      flex:1,
      flexDirection:"column",
      justifyContent: 'center',
      borderColor:'#59B6CF',
      borderWidth: 2,
      backgroundColor: '#ffffff',
      padding: 150,
    },

      block1IntTitle: {
        fontSize:60,
        fontFamily:'Madrid',
        textAlign:'center'
      },

      block1IntText: {
        fontSize:20,
        fontWeight: 'bold',
        textAlign:'center'
      },



    block2: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 70,
    columnGap: 40,
  },
      b2Image: {
        width: 500,
        height: 'auto',
        backgroundColor: '#59B6CF'
      },

      b2TextContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
      },

      b2TextTitle: {
        fontSize:30,
        fontFamily:'Madrid',
      },

      b2Text: {
        fontSize:25,
      },
    
    block3: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 90,
    gap:40
  },

      b3Container: {
        flex:1,
        flexDirection:'column'
      },

      b3Image: {
        width: 'auto',
        height: 500,
        backgroundColor: '#59B6CF'
      },

       b3Text: {
        fontSize:25,
        textAlign:'center',
      },

    block4: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 70,
  },
      b4Text: {
        fontSize:25,
        textAlign:'center'
      },

      b4Title: {
        fontSize:30,
        fontFamily:'Madrid',
        textAlign:'center'
      },

    block5: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 200,
    },
      b5Title: {
        fontSize:40,
        textAlign:'center',
        fontFamily:'Madrid'
      },
      b5Heading:{
        fontSize:25,
        color: '#59B6CF',
        fontWeight:'bold'
      },
      b5text:{
        fontSize:20,
        fontWeight:'bold'
      },
})