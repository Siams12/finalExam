import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ActivityIndicator, Button } from "react-native";
import { Chat } from "./chat";
import { StyleSheet } from "react-native-web";
import { Login } from "./name";
import { useNavigation } from "@react-navigation/native";
//const persistor = persistStore(store);


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name= "Login" component={Login} />
            <Stack.Screen name="Chat" component={Chat} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
