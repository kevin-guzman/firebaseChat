import PushNotification from 'react-native-push-notification'
import {GetColorByUserName} from './GetColorByUserName'

export function PushANotification(title, message, color){

    PushNotification.localNotification({
        title,
        message,
        playSound: true,
        priority:'high',
        soundName:'default',
        color:'green', // rgb(123,200,34)  rgb(123,200,34)
        vibrate: true
    })
}
