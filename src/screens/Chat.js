import React,{useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView
} from 'react-native';
import database from '@react-native-firebase/database';
import moment from 'moment'
import { TextInput, Title, Button, Text} from 'react-native-paper'
import Message from '../components/Message'
import {PushANotification} from '../functions/PushANotification'
import {GetColorByUserName} from '../functions/GetColorByUserName'

const {height} = Dimensions.get('window')
const {width}= Dimensions.get('window')

export default function Chat(props){
    const {userName, room} = props
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const chatScrollRef = useRef()

    const sendMessage = () =>{
        if (message.length > 1){
            database()
            .ref(room)
            .push({
                userName,
                text: message,
                time: moment().format('hh:mm a')
            })

            setMessage('')
        }
    }

    useEffect(()=>{
        database()
        .ref(room)
        .on('value', snapshot => {
            let values = []
            snapshot.forEach((x)=> values.push(x.val()))
            setMessages(values)
            if (values.length > 0){
                if(values[values.length-1].userName !== userName){
                    const color = `rbga(${GetColorByUserName(values[values.length-1].userName)},0.5)`
                    PushANotification(values[values.length -1 ].userName, values[values.length -1 ].text, color)
                }
            }
        })
    },[])

    useEffect(()=>{
        chatScrollRef.current.scrollTo({y: 1000000})
    },[messages])

    return(
        <View style={{flex:1}} >
            <View style={{flex:1,backgroundColor:'rgba(43,4,84,0.8)',}} >
                <Title style={{textAlign:'center', color:'#fff', marginTop:10}} >
                    FireChat
                </Title>
            </View>
            <View style={{flex:8, }} >
                <ScrollView style={{marginTop:10,marginBottom:1, }} ref={chatScrollRef}  >
                    {messages && (
                        messages.map((message, index)=>(
                            <Message key={index} message={message} name={userName} />
                        ))
                    )}
                </ScrollView>
            </View>
            <View style={{flex:2, flexDirection:'row'}} >
                <View style={{flex:10}} >
                    <TextInput 
                        style={{backgroundColor:'#fff',}} 
                        placeholder='Envía un mensaje' 
                        onChangeText={(text)=> setMessage(text) }
                        value={message}
                    />
                </View>
                <View style={{flex:2, alignSelf:'center', }} >
                    <Button icon="send" onPress={()=>sendMessage()} />
                </View>
            </View>

        </View>
    )
    }


const styles = StyleSheet.create({
    viewTitle:{
        //marginTop:120,
        alignSelf:'center',
        width:'100%',
        height:'5%',
        backgroundColor:'rgba(43,4,84,0.8)',
        flex:1,
        marginVertical:'5%',
        marginHorizontal:'5%'
    },
    title:{
        fontSize: 25,
        textAlign:'center',
        color:'gray',
    },
    container:{
        justifyContent:'space-between',
        flex:1,
        flexDirection:'column'
    },
    viewFooter:{
        //marginTop:height-110,
        //flex:1,
        flexDirection:'row',
        //justifyContent:'flex-end',
        marginVertical:'10%',
        marginHorizontal:'1%',
        alignItems:'center',
        flex:1,
        backgroundColor:'red'
    },
    viewTextInput:{
        borderColor:'gray',
        borderWidth:1,
        //width:'85%',
        flex:2
    },
    viewButton:{
        flex:1,
        alignSelf:'center',
        height:'100%'
    },
    button:{
        /* textAlign:'center',
        alignSelf:'center', */
        flex:1
    }
})