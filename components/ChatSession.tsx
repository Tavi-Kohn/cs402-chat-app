import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity, SafeAreaView,VirtualizedList, } from 'react-native';
import Constants from 'expo-constants';
import { PropsWithChildren } from "react";

export function ChatSession() {
    const [list, setlist] = useState([]);
    


    return (
      <View>
        <Text>current chat session</Text>
        
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