import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import * as Location from 'expo-location';

export default function Index() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("")

  useEffect(() => {
    console.log("Initializing location")

    async function initLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync()
      console.log(status)

      if(status !== 'granted' ){
        setError("No permission")
        return
      }
      const location = await Location.getCurrentPositionAsync();
      console.log("Lok", location);
    }
    initLocation()
    
  }, [])

  let output ='Waiting...'
  if(error){
    output= error
  } else if (location){
    output = JSON.stringify(location)
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{output}</Text>
    </View>
  );
}
