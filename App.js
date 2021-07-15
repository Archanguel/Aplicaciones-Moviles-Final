import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import background from './imgs/pokebola.jpg';

export default function App() {
  const [pokeData, setPokeData] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');

  function searchPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`)
      .then(response => response.json().then(data => setPokeData(data)))
      .catch(error => console.error(error))
  }

  function randomPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${ Math.floor(Math.random() * 898) + 1 }`)
      .then(response => response.json().then(data => setPokeData(data)))
      .catch(error => console.error(error))
  }

  function ShowFav(){
    if(status === "hide"){
      setStatus("show");
    }else if(status === "show"){
      setStatus("hide");
    }
  }

  return (
    <ImageBackground source={background}>
      <View style={styles.home}>
        <View style={styles.container}>
          <View style={ styles.pokecontainer }>
            <Image style={ styles.img } source={require("./imgs/pokemonFinder.png")}/>
          </View>
          <TextInput style={ styles.searchBar } placeholder="Search a Pokémon" onChangeText={text => setSearchText(text)} />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={ styles.btns } onPress={() => searchPokemon()}><Text style={ styles.btnsTxt } >Search</Text></TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => ShowFav()}><Text style={ styles.btnsTxt } >{(status==="show") ?  "Hide Fav" : "Show Fav"}</Text></TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => randomPokemon()}><Text style={ styles.btnsTxt } >Random</Text></TouchableOpacity>
          </View>
          <View style={ styles.pokecontainer }>
            {pokeData && <Image style={ styles.pokeimg } source={{ uri: pokeData.sprites.front_default }} /> }
          </View>
          <StatusBar style="auto" />
        </View>
      </View>
    </ImageBackground>
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
    justifyContent: "center",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",*/
    width: "50%",
  },
  img: {
    /*display: "flex",
    justifyContent: "center",
    alignItems: "center",*/
    width: "100%",
    height: "100%",
    marginBottom: 10,
    borderWidth: 3,
  },
  searchBar: {
    height: 50,
    fontSize: 20,
    textAlign: "center",
    borderColor: "rgb(40, 162, 219)",
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    //outline: 0,
    marginBottom: 10,
  },
  btnContainer: {
    borderWidth: 3,
    height: "10%",
    display: "flex",
    flexDirection: "row",
    gap: "5%",
    //backgroundColor: "#000000",
    color: "#ffffff",
  },
  btns: {
    borderWidth: 3,
    justifyContent: "center",
    backgroundColor: "red",
    border: "none",
    borderRadius: 6,
    //transition: "all ease-out 0.3s",
    width: "30%",
  },
  btnsTxt: {
    borderWidth: 3,
    textAlign: "center",
    color: "white",
    fontSize: 10,
    fontWeight: 600,
  },
  pokecontainer: {
    borderWidth: 3,
    display: "flex",
    width: "100%",
    height: "100px",
  },
  pokeimg: {
    borderWidth: 3,
    /*display: "flex",
    justifyContent: "center",
    alignItems: "center",*/
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
  },
});