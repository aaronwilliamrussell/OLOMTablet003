import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
export default function RootLayout() {
  
//Initializing some fancy fonts
  useFonts({
    'Madrid': require('../assets/fonts/Madrid.ttf'),
    'TNR': 'times-new-roman'
  }
  )

  return <Stack  screenOptions={{
        headerStyle: {
          backgroundColor: '#59B6CF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Madrid',
          fontSize: 50
        },
        headerTitleAlign: 'center'
      }}>
    <Stack.Screen name= "index" options={{headerShown: false}}/>
    <Stack.Screen name= "photos" options={{headerShown: true,
    headerTitle: 'Photos'
    }}/>
    <Stack.Screen name= "videos" options={{headerShown: true,
    headerTitle: 'Videos'
    }}/>
     <Stack.Screen name= "history" options={{headerShown: true,
    headerTitle: 'Our History'
    }}/>
     <Stack.Screen name= "events" options={{headerShown: true,
    headerTitle: 'Events'
    }}/>
     <Stack.Screen name= "guestbook" options={{headerShown: true,
    headerTitle: 'Guestbook'
    }}/>
    

    </Stack>;
}
