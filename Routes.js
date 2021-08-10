import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import PokeCard from "./screens/PokeCard";


const Stack = createStackNavigator();

export const Routes = ({}) => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{header: () => null}} initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="PokeCard" component={PokeCard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
