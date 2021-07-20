import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import PokeCard from "./screens/PokeCard";
import Favorites from "./screens/Favorites";
import NotFound from "./screens/NotFound";


const Stack = createStackNavigator();

export const Routes = ({}) => {
    const [pokemon, setPokemon] = React.useState(AsyncStorage.getItem("pokemon") || ( Math.floor( Math.random() *  898 ) + 1 ));
    const [favorites, setFavorite] = React.useState(AsyncStorage.getItem("favorites") || []); //`${JSON.parse(localStorage.getItem("favorites"))}`
  
    function handleSetPokemon(pokemon) {
      setPokemon(pokemon);
    }
    
    function handleAddFavorite(pokemon){
      setFavorite((oldFavorites) => [...oldFavorites, pokemon]);
    }
  
    function deleteFavorite(pokemonName){
      setFavorite(favorites.filter((favorite) => favorite.name !== pokemonName));
    }
  
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{header: () => null}} initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} setPokemon={handleSetPokemon} favorites={favorites} deleteFav={deleteFavorite} />
                <Stack.Screen name="PokeCard" component={PokeCard} pokemon={pokemon} addFavorite={handleAddFavorite} favorites={favorites} deleteFav={deleteFavorite} />
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="NotFound" component={NotFound} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


/*
import { Routes } from "./Routes";

export default Routes;
*/