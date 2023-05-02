import React,{useEffect, useState} from "react";
import { Alert,View,TouchableOpacity,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";


const Home =()=>
{
    const navigation=useNavigation();
    useEffect(()=>
    {
        navigation.setOptions({
            headerleft:()=>(
                <FontAwesome name="search" size={24} color={color.gray} style={{marginLeft:15}}/>
            ),
        })
    },[navigation])

    return(
        <View>
            <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
                <Entypo name="chat" size={24}/>
            </TouchableOpacity>
        </View>
    )
}

export default Home;