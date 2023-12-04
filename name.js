//Page represents a page where the user updates ONE location in a hunt.
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Modal, TextInput, TouchableOpacity} from 'react-native';
import {FlatList, ImageBackground } from 'react-native';
import { useState} from 'react';

export function Login({route, navigation}){
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    return (<View>
        <Text>Please enter your name</Text>
        <TextInput style={{ padding: 8, backgroundColor: '#f5f5f5'}}
            onChangeText={text => setName(text)}
            placeholder='Your name'/>
        <Button title = "Login" onPress={() => {
            if (name.length > 0){
            navigation.navigate("Chat", {name: name})
            }
            else{
                setError("Your name has to have at least 1 character.")
            }
        }
    }
            />
            <Text>{error}</Text>
    </View>)
}