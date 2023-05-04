import React,{useState,useEffect,useCallback, useLayoutEffect} from "react";
import { TouchableOpacity,Text } from "react-native";
import {GiftedChat, Bubble} from "react-native-gifted-chat";
import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
// import { signOut } from "firebase/auth";
import {auth,database} from '../config/firebase'
import {useNavigation,route,CommonActions } from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ChatBubble } from "../components/ChatBubble";
import { useRoute } from '@react-navigation/native';
export default function Chat({propKey }){
    const[message,setMessage]=useState([]);
    const navigation=useNavigation();
    const[user,setUser]=useState('robbies var');
    const route = useRoute();
    const myParam = route.params.myParam;
    console.log(myParam)
    //const { myParam } = propKey 
    // const onSignout =()=>{
    //     signOut(auth).catch(error=>console.log(error))
    // };
    // useLayoutEffect(()=>
    // {
    //     headerRight:()=>
    //     {
    //         <TouchableOpacity onPress={onSignout}>

    //         </TouchableOpacity>
    //     }
    // },[navigation])

    useLayoutEffect(()=>
    {
        console.log('USE LAYOUT EFFECT CALLED')
        const collectionRef=collection(database,myParam);
        const q=query(collectionRef,orderBy('createdAt','desc'));
        const unsubscribe=onSnapshot(q,snapshot=>{
            console.log('snapshot');
            setMessage(snapshot.docs.map(doc=>({
                _id:doc.id,
                createdAt:doc.data().createdAt.toDate(),
                text:doc.data().text, 
                user:doc.data().user,
             
            })) )
        });
        return unsubscribe;
    },[]);

    const OnSend=useCallback((message=[])=>{
        //console.log(auth.currentUser.uid)
        //message.user = 'Robbie'
        //message[0].user = {name: user};
        //message[0].user1 = 'Robbie';
        console.log(message)
        setMessage(previousMessage=>GiftedChat.append(previousMessage,message));
        const {_id,createdAt,text,user}=message[0];
        addDoc(collection(database,myParam),{
            _id,
            createdAt,
            text,
            user,
            
        }); 
    },[] )
    /*
    return(
        
        <GiftedChat
            messages={message} 
            user = {user}
            onSend={message=>OnSend(message)}
            
            //renderBubble={}
            // _user={{
            //     _id:auth?.currentUser?.email,

            // }}
            messagesContainerStyle={{
                backgroundColor:'#fff'
            }}
        />
    )
*/  
    return(
        
        <GiftedChat
            messages={message} 
            //user = {{
            //    _id:2,
            //    user:user
           // }}
           user={user}
            onSend={message=>OnSend(message)}
            
            //renderBubble={}
            // _user={{
            //     _id:auth?.currentUser?.email,

            // }}
            messagesContainerStyle={{
                backgroundColor:'#fff',
                borderBottomRightRadius: 0,
            }}
        />
    )
}
