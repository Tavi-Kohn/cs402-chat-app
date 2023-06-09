import * as React from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { PropsWithChildren } from "react";

export const CreateSession = ({setScreen,setSessionID,userName,SessionID}) => {
    const cancelPress = () => { 
        setScreen('join')
    }
    const createSession = () => {
      console.log('creating new Session')
    }
    
    return (
      <View>
        <Text>User Name</Text>
        <TextInput style={styles.input}>{userName}</TextInput>
        <Text>Session ID</Text>
        <TextInput style={styles.input}></TextInput>

        <TouchableOpacity style={styles.button} onPress={createSession} >
      <Text style={styles.buttonText}>create</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={cancelPress} >
      <Text style={styles.buttonText}>Cancel</Text>
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