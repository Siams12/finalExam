//Page represents a page where the user updates ONE location in a hunt.
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Modal, TextInput, TouchableOpacity} from 'react-native';
import {FlatList, ImageBackground } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from './fetch.js';
import { useState} from 'react';

export function Chat({route, navigation}){
    console.log(route.params);
    const [name, setName] = useState(route.params.name);
    const [chat, setChat] = useState("");
    const [chats, setChats] = useState([]);
    const [error, setError] = useState("");
    const addChat = async () => {
        let result = await postRequest({name: name, message: chat}, "add_chat.php");
        if (result.status !== "okay"){
            setError("Error adding chat");
        }
    }
    
    const getChats = async () => {
        let result = await postRequest({}, "get_chats.php");
        if (result.status === "okay"){
            setChats(result.messages);
        }
        else{
            setError("Error collecting messages");   
        }
    }

    useEffect(() => {
        (async () => {
           await getChats()
        })()}, []);
    

    const displayChat = (item,index) => {
        return (<View>
            <Text>{item.item.name + " " + item.item.message}</Text>
        </View>)
    }

    return (<View>
        <Text>THIS IS MY APP</Text>
        <FlatList
                style = {{height: 300}}
                data={ chats }
                renderItem={ (item , index) => displayChat(item, index) }
                keyExtractor={ (item, index) => index }
            />
        <TextInput style={{ padding: 8, backgroundColor: '#f5f5f5'}}
            onChangeText={text => setChat(text)}
            placeholder='Say something!'/>
        <Button title = "Send" onPress={addChat}/>
        <Text>{error}</Text>
    </View>)
}