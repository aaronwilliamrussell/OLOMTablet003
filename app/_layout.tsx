import { useFonts } from 'expo-font';
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { setStatusBarHidden } from "expo-status-bar";
import { useEffect } from "react";
export default function RootLayout() {


NavigationBar.setPositionAsync("relative");
NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("overlay-swipe");
NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
setStatusBarHidden(true, "none");


function useStickyImmersiveReset() {
  const visibility = NavigationBar.useVisibility();

  useEffect(() => {
    if (visibility === "visible") {
      const interval = setTimeout(() => {
        NavigationBar.setVisibilityAsync("hidden");
      }, /* 3 Seconds */ 3000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [visibility]);
}

useStickyImmersiveReset();
  
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
