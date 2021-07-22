import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favorites({navigation}) {

    return (
        <View>
            <View>
                <TouchableHighlight underlayColor="#E71D23" /*style={ styles.RightButton }*/ onPress={() => navigation.navigate("Home")}><Text>Go To Menu</Text></TouchableHighlight>
            </View>

            
            <View>
                {/*AsyncStorage.getItem("favorites").map((favorite, index) => <View><Text> {favorite.name}  #{favorite.id} </Text></View>)*/}
            </View>
        </View>
    );
};