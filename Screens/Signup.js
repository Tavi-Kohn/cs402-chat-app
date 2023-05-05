import React,{useState,useLayoutEffect,useCallback,} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
import {auth,database} from '../config/firebase'
import { Alert, TouchableOpacity, View, Button,StyleSheet,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Text } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login({navigation})
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const[message,setMessage]=useState([]);
    


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
    /*
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
        addDoc(collection(database,'USER_DATA'),{
            username,
            password,
           
        }); 
    },[] )
*/

    
    const onHandleLogin=()=>
    {
        if(email !=="" && password !=="")
        {
            
            signInWithEmailAndPassword(auth,email,password)
            .then(()=>console.log("Login Check!"))
            .catch((err)=>Alert.alert("Login error",err.message))
        }
        else{
            Alert.alert("Your Email or Password is not valid, Please try again")
        }
    };
        return(
            <View>
                <View style={styles.container}>
                    <SafeAreaView>
                        <Text>Login Page</Text>
                        <TextInput
                            placeholder="Enter Email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            autoFocus={true}
                            value={email}
                            onChangeText={(text)=>setEmail(text)}
                            style={styles.input}
                        />
    
                        <TextInput
                            placeholder="Enter Password"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType="password"
                            value={password}
                            onChangeText={(text)=>setPassword(text)}
                            style={styles.input}
                        />
                        <Button title="Login" onPress={onHandleLogin}></Button>
                        <View>
                            <Text style={{color:'gray',fontWeight:'600',fontSize:14}}>Don't have an account?</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                            <Text style={{color:'orange',fontWeight:'600',fontSize:14}}>Sign Up</Text>
                            </TouchableOpacity>
    
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        )
}


const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        top:windowHeight/5
      },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      width: 200,
      margin:20
    },
  });