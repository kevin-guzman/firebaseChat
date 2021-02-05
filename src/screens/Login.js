import React,{useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import {PushANotification} from '../functions/PushANotification'


export default function Login(props){

    const [name, setName] = useState('')
    const [roomName, setRoomName]= useState('')
    const {setUserName, setRoom} = props

    useEffect(()=>{
        PushANotification('Kevin', 'Hola weeee como estas', 'purple')
    },[])

    return(
        <View>
            <View style={styles.viewTitle} >
                <Text style={styles.title} >¡FirebaseChat!</Text>
            </View>
            <View style={styles.viewInput} >
                <TextInput 
                    style={styles.input}  
                    placeholder='Ingresa un nombre de usuario' 
                    onChangeText={(text)=>setName(text)}
                />
                <TextInput 
                    style={styles.input}  
                    placeholder='Ingresa el nombre del chat' 
                    onChangeText={(text)=>setRoomName(text)}
                />
            </View>
            <View style={styles.viewButton} >
                <Button 
                    title='Entrar' 
                    onPress={()=>{setUserName(name), setRoom(roomName)}}
                >
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewTitle:{
        marginTop:120,
        alignSelf:'center'
    },
    title:{
        fontSize: 35,
        textAlign:'center'
    },
    viewInput:{
        marginTop:100,
        alignSelf:'center'
    },
    input:{
        borderBottomColor:'#000',
        borderBottomWidth:1
    },
    viewButton:{
        marginVertical:'10%',
        marginHorizontal:'20%'
    }
})