// import React,{useState} from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {auth} from "../config/firebase"
// import { Alert, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { TextInput } from "react-native-gesture-handler";
// import { Text } from "react-native";


// export default function Signup({navigation})
// {
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");

//     const onHandleSignup=()=>
//     {
//         if(email !=="" && password !=="")
//         {
//             createUserWithEmailAndPassword(auth,email,password)
//             .then(()=>console.log("Signup Check!"))
//             .catch((err)=>Alert.alert("Login error",err.message))
//         }
//     };
//     return(
//         <View>
//             <View>
//                 <SafeAreaView>
//                     <Text>Signup</Text>
//                     <TextInput
//                         placeholder="Enter Email"
//                         keyboardType="email-address"
//                         textContentType="emailAddress"
//                         autoFocus={true}
//                         value={email}
//                         onChangeText={(text)=>setEmail(text)}
//                     />

//                     <TextInput
//                         placeholder="Enter Password"
//                         autoCorrect={false}
//                         secureTextEntry={true}
//                         textContentType="password"
//                         value={password}
//                         onChangeText={(text)=>setPassword(text)}
//                     />
//                     <TouchableOpacity onPress={onHandleSignup}>
//                         <Text>Signup</Text>
//                     </TouchableOpacity>
//                     <View>
//                         <Text style={{color:'gray',fontWeight:'600',fontSize:14}}>Have an account?</Text>
//                         <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
//                         <Text style={{color:'orange',fontWeight:'600',fontSize:14}}>Log In</Text>
//                         </TouchableOpacity>

//                     </View>
//                 </SafeAreaView>
//             </View>
//         </View>
//     )
// }

import React,{useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/firebase"
import { Alert, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Text } from "react-native";


export default function Login({navigation})
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const onHandleLogin=()=>
    {
        if(email !=="" && password !=="")
        {
            signInWithEmailAndPassword(auth,email,password)
            .then(()=>console.log("Login Check!"))
            .catch((err)=>Alert.alert("Login error",err.message))
        }
    };
    return(
        <View>
            <View>
                <SafeAreaView>
                    <Text>Login</Text>
                    <TextInput
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoFocus={true}
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />

                    <TextInput
                        placeholder="Enter Password"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                    />
                    <TouchableOpacity onPress={onHandleLogin}>
                        <Text>Login</Text>
                    </TouchableOpacity>
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