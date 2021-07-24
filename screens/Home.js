import AsyncStorage from "@react-native-async-storage/async-storage";
//import AsyncStorage from "@react-native-community/async-storage";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Image, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import background from "../src/imgs/pokebola.jpg";
import pokemonFinder from "../src/imgs/pokemonFinder.png";

export default function App({/*route,*/ navigation}) {
  const [searchText, setSearchText] = React.useState("");
  //const [status, setStatus] = React.useState("idle");
  //const {favorites} = route.params;
  //const [favorites, setFavorites] = React.useState([]);

  function handleSearchClick() {
    if (searchText === "") { 
      navigation.navigate("PokeCard", {pokemon: AsyncStorage.getItem("pokemon")/*, favorites, setFavorites*/});
      return
    } 
    AsyncStorage.setItem("pokemon", searchText);
    navigation.navigate("PokeCard", {pokemon: searchText.toLocaleLowerCase()/*, favorites, setFavorites*/});
  }

  function handleRandomClick() {
    //setPokemon( Math.floor( Math.random() *  898 ) + 1 );
    const num = Math.floor( Math.random() *  898 ) + 1;
    AsyncStorage.setItem("pokemon", num);
    navigation.navigate("PokeCard", {pokemon: num/*, favorites, setFavorites*/});
  }

  /*
  function ShowFav(){
    if(status === "hide"){
      setStatus("show");
    }else if(status === "show"){
      setStatus("hide");
    }
  }
  <View style={ styles.pokecontainer }>
    {pokeData && <Image style={ styles.pokeimg } source={{ uri: pokeData.sprites.front_default }} /> }
  </View>
  */
  return (
    <>
    <ImageBackground source={background}>
      <View style={styles.home}>
        <View style={styles.container}>
          <View style={ styles.imgContainer }>
            <Image style={ styles.img } source={pokemonFinder}/>
          </View>
          <TextInput style={ styles.searchBar } placeholder="Search a Pokémon" onChangeText={text => setSearchText(text)} />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={ styles.btns } onPress={() => handleSearchClick()}><Text style={ styles.btnsTxt } >Search</Text></TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => navigation.navigate("Favorites")}><Text style={ styles.btnsTxt } >Show Fav</Text></TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => handleRandomClick()}><Text style={ styles.btnsTxt } >Random</Text></TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      </View>
    </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  home: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "calc(100% - 50px)",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "calc(100% - 30px)",
  },
  img: {
    height: "100%",
    marginBottom: 10,
  },
  searchBar: {
    height: 50,
    fontSize: 15,
    textAlign: "center",
    borderColor: "rgb(40, 162, 219)",
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  btnContainer: {
    height: "50%",
    display: "flex",
    flexDirection: "row",
    gap: "5%",
    color: "#ffffff",
  },
  btns: {
    justifyContent: "center",
    backgroundColor: "red",
    border: "none",
    borderRadius: 6,
    width: "30%",
  },
  btnsTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 10,
    fontWeight: 600,
  },
});