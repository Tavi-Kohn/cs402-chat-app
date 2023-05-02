import React,{useState,useEffect,useCallback, useLayoutEffect} from "react";
import { TouchableOpacity,Text } from "react-native";
import {GiftedChat} from "react-native-gifted-chat";
import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
// import { signOut } from "firebase/auth";
import {auth,database} from '../config/firebase'
import {useNavigation} from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Chat(){
    const[message,setMessage]=useState([]);
    const navigation=useNavigation();

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
        const collectionRef=collection(database,'chats');
        const q=query(collectionRef,orderBy('createdAt','desc'));
        const unsubscribe=onSnapshot(q,snapshot=>{
            console.log('snapshot');
            setMessage(snapshot.docs.map(doc=>({
                _id:doc.id,
                createdAt:doc.data().createdAt.toDate(),
                text:doc.data().text, 
                user:doc.data().user 
            })) )
        });
        return unsubscribe;
    },[]);

    const OnSend=useCallback((message=[])=>{
        setMessage(previousMessage=>GiftedChat.append(previousMessage,message));
        const {_id,createdAt,text,user}=message[0];
        addDoc(collection(database,'chats'),{
            _id,
            createdAt,
            text,
            user
        }); 
    },[] )
    return(
        <GiftedChat
            messages={message}
            onSend={message=>OnSend(message)}
            // _user={{
            //     _id:auth?.currentUser?.email,

            // }}
            messagesContainerStyle={{
                backgroundColor:'#fff'
            }}
        />
    )
}
