import React,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Chat from './src/screens/Chat'
import Login from './src/screens/Login'
import PushNotification from 'react-native-push-notification'

export default function App(){
  const [userName, setUserName] = useState(null) //null
  const [room, setRoom] = useState(null)
  useEffect(()=>{

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            // process the notification
            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
          // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);
        },
        onRegistrationError: function(err) {
            console.error(err.message, err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    })
},[])
  
  return(
    <View style={{flex:1}} >
      {
        userName && room?
          <Chat userName={userName}  room={room} />
        :
          <Login setUserName={setUserName} setRoom={setRoom} />
      }
    </View>
  )
}
