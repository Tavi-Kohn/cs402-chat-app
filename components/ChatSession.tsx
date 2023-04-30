import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity, SafeAreaView,VirtualizedList,Dimensions,useWindowDimensions,StatusBar, } from 'react-native';
import Constants from 'expo-constants';
import { PropsWithChildren } from "react";
import { ChatBubble } from "./ChatBubble";


const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  });
  
  const getItemCount = _data => 20;

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const { width, height } = Dimensions.get('window');

export const ChatSession = ({setScreen}) => {
    const [list, setlist] = useState([]);
    const Disconnect = () => {
        // Do something here when the back button is pressed
        setScreen('join')
        return true; // Return true to prevent default behavior (exit app)
      };
    


    return (
    
        <View style={styles.container}>
            <View style={styles.topNav}>
                <View style={styles.topNavButtons}>
                    <TouchableOpacity style={styles.button} onPress={Disconnect}>
                    <Text style={styles.buttonText}>Disconnect</Text>
                    </TouchableOpacity>
                    <Text>Session ID</Text>
                   
                </View>
            </View>
            <View style ={styles.chatPanel}>
            
                <VirtualizedList
                    initialNumToRender={4}
                    renderItem={({item}) => <ChatBubble user="Person 1" tailDirection="left">{item.title}</ChatBubble>}
                    keyExtractor={item => item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
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

  });