import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import App from "./app/App";

export default () => (
    <NavigationContainer>
        <App />
    </NavigationContainer>
);