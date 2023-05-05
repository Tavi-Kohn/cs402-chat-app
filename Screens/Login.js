import React,{useState,useLayoutEffect,useCallback,} from "react";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";

import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
import {auth,database} from '../config/firebase'
import { Alert, TouchableOpacity, View,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Text } from "react-native";


export default function Login({navigation})
{
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[message,setMessage]=useState([]);

/*
    useLayoutEffect(()=>
    {
        
        const collectionRef=collection(database,'USER_DATA');
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
    },[]);*/

    const OnSend=useCallback((message=[])=>{
        
        //message.user = 'Robbie'
    
        const username = 'Robbie';
        //const password = password
        //const email = email
        //console.log(message)
        
        addDoc(collection(database,'USER_DATA'),{
            username,
            password,
            email
            
        }); 
    },[] )
    




    const onHandleLogin=()=>
    {
        if(email !=="" && password !=="")
        {
            signInWithEmailAndPassword(auth,email,password)
            .then(()=>console.log("Login Check!"))
            .catch((err)=>Alert.alert("Login error",err.message))
        }
    };

    const onHandleSignup=()=>
        {
            if(email !=="" && password !=="")
            {   
                createUserWithEmailAndPassword(auth,email,password)
                .then(()=>console.log("Signup Check!"),
                OnSend(message))
                .catch((err)=>Alert.alert("Login error",err.message))
            }
            else{
                Alert.alert("Your Email or Password is not valid, Please try again")
            }
        };

    
    return(
        <View>
            <View >
                <SafeAreaView>

                <Text style={styles.buttonText}>User Name:</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter userName"
                        keyboardType="default"
                        textContentType="emailAddress"
                        autoFocus={true}
                        value={username}
                        onChangeText={(text)=>setUsername(text)}
                    />
                    <Text style={styles.buttonText}>Enter Your Email:</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoFocus={true}
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />
                    <Text style={styles.buttonText}>Enter Your Password</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter Password"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                    />
                    {/* <TouchableOpacity onPress={onHandleLogin}> */}
                    <TouchableOpacity style={styles.button} onPress={/*onHandleSignup*/onHandleSignup}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{color:'gray',fontWeight:'600',fontSize:14}}>Already Have an account?</Text>
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Login")}>
                        <Text style={{color:'orange',fontWeight:'600',fontSize:14}}>Login</Text>
                        </TouchableOpacity >

                    </View>
                </SafeAreaView>
            </View>
        </View>
    )


    

}

const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      marginLeft: 70,
      marginBottom: 10,
      width: 200,
      justifyContent:'center',
      alignItems: 'center'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
      },

  });