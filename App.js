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
          <Image style={ styles.image } source={require("./imgs/pokemonFinder.png")}/>
          <TextInput style={ styles.searchBar } placeholder="Search a Pokémon" onChangeText={text => setSearchText(text)} />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={ styles.btns } /*title="Search"*/ onPress={() => searchPokemon()}> Search </TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => ShowFav()}> {(status==="show") ?  "Hide Fav" : "Show Fav"} </TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => randomPokemon()}> Random </TouchableOpacity>
          </View>
          {pokeData && <Image style={ styles.image } source={{ uri: pokeData.sprites.front_default }} /> }
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
  image: {
    display: "flex",
    width: 100,
    height: 100,
    //backgroundSize: "cover",
  },
  container: {
    /*flex: 1,
    alignItems: "center",
    justifyContent: "center",*/
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
  },
  image: {
    /*width: 550,
    height: 100,
    backgroundColor: 'red',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",*/
    
    width: "100%",
    height: "100%",
    //alignSelf: "center",
    marginBottom: 10,
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    //backgroundColor: "#000000",
    color: "#ffffff",
  },
  btns: {
    textAlign: "center",
    color: "white",
    padding: 10,
    fontWeight: 600,
    backgroundColor: "red",
    border: "none",
    borderRadius: 6,
    //transition: "all ease-out 0.3s",
    width: "30%",
  },
  searchBar: {
    height: 50,
    fontSize: 30,
    textAlign: "center",
    borderColor: "rgb(40, 162, 219)",
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    //outline: 0,
    marginBottom: 10,
  }
});