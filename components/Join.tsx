import * as React from 'react';
import {useState,useEffect} from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity, } from 'react-native';
import Constants from 'expo-constants';
import { PropsWithChildren } from "react";

export const Join = ({setScreen,setUserName,setSessionID,userName,SessionID}) => {
  //const [NameValue, setNameValue] = useState('Rob');
  //const [IDValue, setIDValue] = useState('');
  
  const handleIDInputChange = (text) => {
    setSessionID(text)
  }
  const handleNameInputChange = (text) => {
    setUserName(text)
  }
  const joinSessionPress = () => {
    // Do something here when the back button is pressed
    setScreen('session')
   

    return true; // Return true to prevent default behavior (exit app)
  };
  
  const createSessionPress = () => {
    // Do something here when the back button is pressed
    setScreen('create')
    return true; // Return true to prevent default behavior (exit app)
  };
  
    return (
      <View>
        <Text>User Name</Text>
        <TextInput style={styles.input} onChangeText={handleNameInputChange}>{userName}</TextInput>
        <Text>Session ID</Text>
        <TextInput style={styles.input} onChangeText={handleIDInputChange}>{SessionID}</TextInput>

        <TouchableOpacity style={styles.button} onPress={joinSessionPress}>
      <Text style={styles.buttonText}>Join</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={createSessionPress}>
      <Text style={styles.buttonText}>Create</Text>
    </TouchableOpacity>
      </View>
    );
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
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },

  });