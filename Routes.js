import React from "react";
//import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import PokeCard from "./screens/PokeCard";
import Favorites from "./screens/Favorites";
import NotFound from "./screens/NotFound";


const Stack = createStackNavigator();

export const Routes = ({}) => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{header: () => null}} initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="PokeCard" component={PokeCard} />
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="NotFound" component={NotFound} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
