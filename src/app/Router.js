import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PokeCard, HomePage } from "../pages";
import { Switch } from "react-native-gesture-handler";
import { Route } from "@react-navigation/routers";
import { createStackNavigator } from "@react-navigation/stack";

export const Router = () => {
  const Stack = createStackNavigator();

  const [pokemon, setPokemon] = React.useState(JSON.parse(localStorage.getItem('pokemon')) || ( Math.floor( Math.random() *  898 ) + 1 ));
  const [favorites, setFavorite] = React.useState(JSON.parse(localStorage.getItem("favorites")) || []); //JSON.parse(localStorage.getItem("favorites"))       `${JSON.parse(localStorage.getItem("favorites"))}`

  function handleSetPokemon(pokemon) {
    setPokemon(pokemon);
  }
  
  function handleAddFavorite(pokemon){
    setFavorite((oldFavorites) => [...oldFavorites, pokemon]);
  }

  function deleteFavorite(pokemonName){
    setFavorite(favorites.filter((favorite) => favorite.name !== pokemonName));
  }

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="card" component={PokeCard} pokemon={pokemon} addFavorite={handleAddFavorite} favorites={favorites} deleteFav={deleteFavorite} />
        <Stack.Screen name="home" component={HomePage} setPokemon={handleSetPokemon} favorites={favorites} deleteFav={deleteFavorite} />
      </Stack.Navigator>
    </>
  );
};

/*
    <Route path="/card">
      <PokeCard pokemon={pokemon} addFavorite={handleAddFavorite} favorites={favorites} deleteFav={deleteFavorite} />
    </Route>
  
    <Route path="/">
      <HomePage  setPokemon={handleSetPokemon} favorites={favorites} deleteFav={deleteFavorite} />
    </Route>
*/