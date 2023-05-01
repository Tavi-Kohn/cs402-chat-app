import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity, SafeAreaView,VirtualizedList,Dimensions,useWindowDimensions,StatusBar, } from 'react-native';
import Constants from 'expo-constants';
import { PropsWithChildren } from "react";
import { ChatBubble } from "./ChatBubble";





 /*
  const getItem = (data, index) => {
    const item = chatLog[index];
    return {
      id: item.id,
      title: item.message,
    };
  };*/



const { width, height } = Dimensions.get('window');

export const ChatSession = ({setScreen,userName,SessionID}) => {
    
    const [list, setlist] = useState([]);

    const[message,setMessage] = useState('');



    var chatLog = [{user:'person1',message:'I sure love writing react native code!',timeStamp:'10:26'},
    {user:'person1',message:'lmao',timeStamp:'10:28'},
    {user:'Rob',message:'I hope I can finish this in time.',timeStamp:'10:29'},
    {user:'Fred',message:'We got this!.',timeStamp:'10:35'},
    {user:'Anna',message:'Wow this chat app is soo cool!',timeStamp:'10:40'},
]
    //setlist(chatLog);
    
    const renderMessage = ({item}) => {
        console.log('renderMessage called')
        console.log(item.user)
        console.log(userName)
        console.log(item.user === userName)
        if (item.user == userName){
        return <View style={styles.date}><Text>{item.timeStamp}</Text><ChatBubble user={item.user} tailDirection="right">{item.message}</ChatBubble></View>
        }
        else {
            return <View style={styles.date}><Text>{item.timeStamp}</Text><ChatBubble user={item.user} tailDirection="left">{item.message}</ChatBubble></View>
        }
    }

    const getItem = (_data, index) => ({
        id: Math.random().toString(12).substring(0),
        //title: `Item ${index }`,
        user: chatLog[index].user,
        message: chatLog[index].message,
        timeStamp : chatLog[index].timeStamp
      });

    const getItemCount = _data => 1;

    const Item = ({title}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
    );

    const Disconnect = () => {
        // Do something here when the back button is pressed
        setScreen('join')
        return true; // Return true to prevent default behavior (exit app)
      };
    const sendMessage = () => {
        console.log('send Message Pressed')
        console.log(message)
    }
    const handleMessageInputChange = (text) => {
        setMessage(text)
        console.log('send Message Pressed')
      }

    return (
    
        <View style={styles.container}>
            <View style={styles.topNav}>
                <View style={styles.topNavButtons}>
                    <TouchableOpacity style={styles.button} onPress={Disconnect}>
                    <Text style={styles.buttonText}>Disconnect</Text>
                    </TouchableOpacity>
                    <Text>Session ID:{SessionID}</Text>
                    <Text>User Name: {userName}</Text>
                   
                </View>
            </View>
            <View style ={styles.chatPanel}>
            
                <VirtualizedList
                    data={chatLog}
                    initialNumToRender={4}
                    renderItem={renderMessage}
                
                    keyExtractor={item => item.id}
                    getItemCount={(data) => data.length}
                    getItem={getItem}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                <TextInput style={styles.input} onChangeText={handleMessageInputChange} multiline={true} ></TextInput>
                <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>

    
    );
  }
  /*return (
        <View style={styles.chatPanel}>
        <View>
        <SafeAreaView style={styles.container}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>

        </View>

        
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
        <TextInput style={styles.input} multiline={true} ></TextInput>
        <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>Send</Text>
    </TouchableOpacity>
    </View>
      </View>
      </View>
    );*/
  
  
  
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