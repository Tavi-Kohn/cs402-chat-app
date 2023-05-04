import React,{useEffect, useState,useLayoutEffect} from "react";
import { Alert,View,TouchableOpacity,Text,StyleSheet,Dimensions,useWindowDimensions,StatusBar,VirtualizedList, SafeAreaView, } from "react-native";
import { useNavigation,CommonActions } from "@react-navigation/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
import {auth,database} from '../config/firebase'
import { ChatBubble } from "../components/ChatBubble";

const { width, height } = Dimensions.get('window');

const addCollection = () =>{
console.log('new collection added')
addNewCollection()

}


const addNewCollection = async () => {
    try {
      const newCollectionRef = collection(database, "new_collection1");
      await addDoc(newCollectionRef, { field: "value" });
      console.log("New collection added to Firestore");
    } catch (error) {
      console.error("Error adding new collection to Firestore: ", error);
    }
  };

/*
const usersCollectionRef = collection(database, 'users')

const addUser = async () => {
    const document = await addDoc(usersCollectionRef, {
      name: newName,
      grade: Number(newGrade),
      role: newRole,
      hours: Number(newHours),
    })

    const newCollectionRef = collection(database, 'users', document.id, 'name of new subcollection')

    await addDoc(newCollectionRef, {
        data: 'Hello there World',
    })
  }
*/




const Home =()=>
{
    const navigation=useNavigation();

    const userName = 'test'
   
    var Chat_rooms = [{collectionName:'person1'},
    {collectionName:'chats'},
    {collectionName:'new_collection1'},
    {collectionName:'Fred'},
    {collectionName:'Anna'},
]



    useEffect(()=>
    {
        navigation.setOptions({
            headerleft:()=>(
                <FontAwesome name="search" size={24} color={color.gray} style={{marginLeft:15}}/>
            ),
        })
    },[navigation])

    useLayoutEffect(()=>
    {
        console.log('use layout called')
        

    },[]);
    //setlist(Chat_rooms);
    
    const renderMessage = ({item}) => {
        console.log('renderMessage called')
        console.log(item.collectionName)
        console.log(userName)
        console.log(item.collectionName === userName)
        /*if (item.user == userName){
        return <View style={styles.date}><Text>{item.timeStamp}</Text><ChatBubble user={item.user} tailDirection="right">{item.message}</ChatBubble></View>
        }
        else {
            return <View style={styles.date}><Text>{item.timeStamp}</Text><ChatBubble user={item.user} tailDirection="left">{item.message}</ChatBubble></View>
        }*/
        return <TouchableOpacity onPress={() => navigation.navigate({ name: 'Chat', params: { myParam: item.collectionName } })}>
        <Text>{item.collectionName}</Text>
        <Entypo name="chat" size={24}/>
      </TouchableOpacity>
      
    }
/*
    const getItem = (_data, index) => ({
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`,

        
      });*/
      const getItem = (_data, index) => ({
        id: Math.random().toString(12).substring(0),
        //title: `Item ${index }`,
        collectionName: Chat_rooms[index].collectionName,
      });
      
      const getItemCount = _data => 50;
      
      const Item = ({table}) => (
       
        
        <TouchableOpacity onPress={()=>navigation.navigate({table})}><Text>{table}</Text>
                <Entypo name="chat" size={24}/>
            </TouchableOpacity>
      );
      const RenderItem = ({item}) => ({})

      

    return(
        <View>
            <VirtualizedList
                data={Chat_rooms}
                renderItem={(renderMessage)}
                keyExtractor={item => item.id}
                getItemCount={(data) => data.length}
                getItem={getItem}
      />
            
        <View>
        
            
      
    
        
            <Text>test</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Chat")}><Text></Text>
                <Entypo name="chat" size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
                <Entypo name="chat" size={24}/>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.input} onPress={addCollection}>
                <Text>Add new Chat Collections</Text>
            </TouchableOpacity>
            <Text>test</Text>
        </View>
    )
}

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
      }

  });

export default Home;