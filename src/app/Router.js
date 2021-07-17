import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PokeCard, HomePage } from "../pages";

export const Router = () => {
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
    <NavigationContainer>
      <Switch>
        <Route path="/card">
          <PokeCard pokemon={pokemon} addFavorite={handleAddFavorite} favorites={favorites} deleteFav={deleteFavorite} />
        </Route>

        <Route path="/">
          <HomePage  setPokemon={handleSetPokemon} favorites={favorites} deleteFav={deleteFavorite} />
        </Route>
      </Switch>
    </NavigationContainer>
  );
};