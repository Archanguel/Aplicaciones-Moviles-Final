import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import background from '../src/imgs/pokebola.jpg';
import pokemonFinder from "../src/imgs/pokemonFinder.png";
//import {Router, Switch, Route,} from "react-router";
//import asd from "../asd";
//import Navigator from "./HomeStack";

export default function App({setPokemon, favorites, deleteFav, navigation}) {
  const [pokeData, setPokeData] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  const [status, setStatus] = React.useState("idle");

  /*React.useEffect(() => {
    setStatus("loading");
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`)
        .then( (response) =>  
          response.json().then(
            (data) => {
            setPokemonData(data)
            setStatus("idle")
          })
        )
        .catch((error) => setStatus("error"));
  },[searchText])*/

  function handleSearchClick() {
    AsyncStorage.setItem("pokemon", searchText);
    navigation.navigate("PokeCard", {pokemon: searchText.toLocaleLowerCase()});
  }
  function handleRandomClick() {
    //setPokemon( Math.floor( Math.random() *  898 ) + 1 );
    const num = Math.floor( Math.random() *  898 ) + 1;
    AsyncStorage.setItem("pokemon", num);
    navigation.navigate("PokeCard", {pokemon: num});
  }
  /*function handleSubmit(){
    setPokemon;
  }

  function searchPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`)
      .then(response => response.json().then(data => setPokeData(data)))
      .catch(error => console.error(error))
  }

  function randomPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${ Math.floor(Math.random() * 898) + 1 }`)
      .then(response => response.json().then(data => setPokeData(data)))
      .catch(error => console.error(error))
  }*/

  function ShowFav(){
    if(status === "hide"){
      setStatus("show");
    }else if(status === "show"){
      setStatus("hide");
    }
  }
//source={require("./imgs/pokemonFinder.png")}
//    <Navigator/>
//onChangeText={handleSubmit()}
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
            <TouchableOpacity style={ styles.btns } onPress={() => navigation.navigate("NotFound")/*ShowFav()*/}><Text style={ styles.btnsTxt } >{(status==="show") ?  "Hide Fav" : "Show Fav"}</Text></TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => handleRandomClick()}><Text style={ styles.btnsTxt } >Random</Text></TouchableOpacity>
          </View>
          <View style={ styles.pokecontainer }>
            {pokeData && <Image style={ styles.pokeimg } source={{ uri: pokeData.sprites.front_default }} /> }
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
    //background:{ uri: background },
    //backgroundImage: {uri: "./imgs/pokebola.jpg"},
    backgroundSize: "cover",
  },
  container: {
    /*flex: 1,
    alignItems: "center",
    justifyContent: "center",*/

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "calc(100% - 50px)",
  },
  imgContainer: {
    //borderWidth: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "calc(100% - 30px)",
  },
  img: {
    /*display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: (Dimensions.get('window').height/3) - 12,
    width: (Dimensions.get('window').width),*/
    height: "100%",
    marginBottom: 10,
    //borderWidth: 3,
  },
  searchBar: {
    height: 50,
    fontSize: 15,
    textAlign: "center",
    borderColor: "rgb(40, 162, 219)",
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    //outline: 0,
    marginBottom: 10,
  },
  btnContainer: {
    //borderWidth: 3,
    height: "50%",
    display: "flex",
    flexDirection: "row",
    gap: "5%",
    //backgroundColor: "#000000",
    color: "#ffffff",
  },
  btns: {
    //borderWidth: 3,
    justifyContent: "center",
    backgroundColor: "red",
    border: "none",
    borderRadius: 6,
    //transition: "all ease-out 0.3s",
    width: "30%",
  },
  btnsTxt: {
    //borderWidth: 3,
    textAlign: "center",
    color: "white",
    fontSize: 10,
    fontWeight: 600,
  },
  /*
  pokecontainer: {
    borderWidth: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },pokeimg: {
    borderWidth: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },*/
});