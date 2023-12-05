//Page represents a page where the user updates ONE location in a hunt.
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Modal, TextInput, TouchableOpacity} from 'react-native';
import {FlatList, ImageBackground } from 'react-native';
import { useEffect } from 'react';
import { useState} from 'react';

export function Chat({route, navigation}){
    const [name, setName] = useState(route.params.name);
    const [chat, setChat] = useState("");
    const [chats, setChats] = useState([]);
    const [error, setError] = useState("");
    const addChat = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("message", chat);
        let fetchURL = "https://cpsc345final.jayshaffstall.com/add_chat.php"
        try {
            const result =
            await fetch(fetchURL, {
                method: 'POST',
                body: formData
            })
            let newResult = await result.json();
        
        if (newResult.status !== "okay"){
            setError("Error adding chat");
        }
    }
        catch{
            setError("error adding chat");
        }
    }
    
    const getChats = async () => {
        let fetchURL = "https://cpsc345final.jayshaffstall.com/get_chats.php"
        //Create POST request and get results
        try {
            const result =
            await fetch(fetchURL, {
                method: 'POST',
            })
            let newResult = await result.json();
        if (newResult.status === "okay"){
            setChats(newResult.messages);
        }
        else{
            setError("Error collecting messages");   
        }
    }
    catch{
        setError("Error collecting messages");
    }

}

    useEffect(() => {
        (async () => {
           await getChats()
        })()}, []);
    

    const displayChat = (item,index) => {
        return (<View>
            <Text>{item.item.name + ": " + item.item.message}</Text>
        </View>)
    }

    return (<View>
        <FlatList
                style = {{height: 500}}
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