import React,{useEffect, useState,useLayoutEffect,useCallback} from "react";
import { Alert,View,TouchableOpacity,Text,StyleSheet,Dimensions,useWindowDimensions,StatusBar,VirtualizedList, SafeAreaView,TextInput, FlatList } from "react-native";
import { useNavigation,CommonActions } from "@react-navigation/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
import {auth,database} from '../config/firebase'
import { ChatBubble } from "../components/ChatBubble";

const { width, height } = Dimensions.get('window');


const addNewCollection = async () => {
    try {
      const newCollectionRef = collection(database, newCollectionName);
      await addDoc(newCollectionRef, { field: "value" });
      console.log("New collection added to Firestore");
      //OnSend()
    } catch (error) {
      console.error("Error adding new collection to Firestore: ", error);
    }
  };


const Home =()=>
{
    const navigation=useNavigation();

    const userName = 'test'
    const[chat_rooms,setChat_rooms]=useState([]);

    const [newCollectionName,setNewCollectionName]=useState("");

    const addCollection = () =>{
        //console.log('attempting to add new collection')
        addNewCollection()
        
        
        }
    
    
    const addNewCollection = async () => {
        try {
          const newCollectionRef = collection(database, newCollectionName);
          await addDoc(newCollectionRef, { field: "value" });
          const name = newCollectionName
          addDoc(collection(database,'COLLECTION_NAMES'),{
            name
            
        }); 
          console.log("New collection added to Firestore");
          //OnSend()
        } catch (error) {
          console.error("Error adding new collection to Firestore: ", error);
        }
      };


    useEffect(()=>
    {
        navigation.setOptions({
            headerleft:()=>(
                <FontAwesome name="search" size={24} color={color.gray} style={{marginLeft:15}}/>
            ),
        })
    },[navigation])

    useEffect(()=>
    {
        // console.log("the chat rooms are " + chat_rooms)
        console.log('USE LAYOUT EFFECT CALLED')
        const collectionRef=collection(database,'COLLECTION_NAMES');
        // const q=query(collectionRef,orderBy('createdAt','desc'));
        const unsubscribe=onSnapshot(collectionRef,snapshot=>{
            console.log('snapshot');
            setChat_rooms(snapshot.docs.map(doc=>({
                _id: doc.id,
                collectionName: doc.data().name
            })) )
        });
        console.log("the chat rooms are " + JSON.stringify(chat_rooms))
        return unsubscribe;
    },[]);
/*
    const OnSend=useCallback((message=[])=>{

        
        console.log('ON SEND CALLED')
        //message.user = 'Robbie'
        //message[0].user = {name: user};
        message[0].name = 'Robbie';
        console.log("the massage is " + message)
        setChat_rooms([...chat_rooms, newItem]);
        const {name}=chat_rooms[0];
        addDoc(collection(database,'COLLECTION_NAME'),{
            name,
           
            
        //}); 
    },[] )*/
    //setlist(Chat_rooms);
    
    const renderMessage = ({item}) => {
        // console.log('renderMessage called')
        // console.log(item.collectionName)
        // console.log(userName)
        // console.log(item.collectionName === userName)
        /*if (item.user == userName){
        return <View style={styles.date}><Text>{item.timeStamp}</Text><ChatBubble user={item.user} tailDirection="right">{item.message}</ChatBubble></View>
        }
        else {
            return <View style={styles.date}><Text>{item.timeStamp}</Text><ChatBubble user={item.user} tailDirection="left">{item.message}</ChatBubble></View>
        }*/
        return(
          <View style={styles.listview}>
            <TouchableOpacity onPress={() => navigation.navigate({ name: 'Chat', params: { myParam: item.collectionName } })}>
          <Text>{item.collectionName}</Text>
          <Entypo name="chat" size={24}/>
        </TouchableOpacity>
          </View> 
        )

      
    }
  

      return(
        <View>
          <View style={{height:height/2}}>
          <FlatList
                data={chat_rooms}
                renderItem={(renderMessage)}
                keyExtractor={item => item._id}
                // getItemCount={(data) => data.length}
                // getItem={getItem}
      />
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={styles.input} onPress={addCollection}>
                <Text>Add new Chat Collections</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} onChangeText={(text)=>setNewCollectionName(text)}></TextInput>
          </View>     
        <View>
        </View>
            
        </View>
    )
    
    }
  
ßß

const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      margin: 10,
      width: 200

    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        
      },
      inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      inputContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        maxHeight: 130
        

      },
      chatPanel: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        
        paddingBottom: 0,
        height:height-460
      },
      container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        height: height,
        width: width,
        padding: 10,
        
      },
      item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
      },
      title: {
        fontSize: 32,
      },
      topNav: {
        height: 70,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
      },
      topNavButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      date: {
        alignItems: 'center',
      },
      listview:{
        backgroundColor: '#ff7f50',
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
      }

  });

export default Home;