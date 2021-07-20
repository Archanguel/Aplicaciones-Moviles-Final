import React, { useState } from "react";
import { useHistory } from "react-router";
//import styled from "styled-components";
import { Button, Image, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import background from '../../imgs/pokebola.jpg';
import pokemonFinder from "../../imgs/pokemonFinder.png";
import AsyncStorage from "@react-native-community/async-storage";

export const HomePage = ({ setPokemon, favorites, deleteFav }) => {
  const history = useHistory();
  const [status, setStatus] = React.useState("show");
  const [searchText, setSearchText] = React.useState('');
  
  React.useEffect(() => {
    AsyncStorage.setItem("favorites", favorites);
  }, [favorites]);
  
  function handleSearchClick() {
    history.replace("/card");
  }

  function handleRandomClick() {
    setPokemon( Math.floor( Math.random() *  898 ) + 1 );
    history.replace("/card");
  }

  function handleSubmit(event){
    event.preventDefault();
    setPokemon((event.target.value).toLowerCase());
  }

  function ShowFav(){
    if(status === "hide"){
      setStatus("show");
    }else if(status === "show"){
      setStatus("hide");
    }
  }
//onChangeText={searchText => setSearchText(searchText)}
  return (
    <ImageBackground source={background}>
      <View style={styles.home}>
        <View style={styles.container}>
          <View style={ styles.imgContainer }>
            <Image style={ styles.img } source={pokemonFinder}/>
          </View>
          <TextInput style={ styles.searchBar } placeholder="Search a Pokémon" onChangeText={handleSubmit} /> 
          <View style={styles.btnContainer}>
            <TouchableOpacity style={ styles.btns } onPress={() => handleSearchClick}><Text style={ styles.btnsTxt } >Search</Text></TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => ShowFav}><Text style={ styles.btnsTxt } >{(status==="show") ?  "Hide Fav" : "Show Fav"}</Text></TouchableOpacity>
            <TouchableOpacity style={ styles.btns } onPress={() => handleRandomClick}><Text style={ styles.btnsTxt } >Random</Text></TouchableOpacity>
          </View>
          

        </View>
      </View>
    </ImageBackground>
  );
};

export default HomePage;

/*<Home>
      <Wrapper>
        <PokemonLogo src={pokemonFinder} alt="Pokemon Logo" />
        <input className="searchBar" onChange={handleSubmit} style={{ marginBottom: "20px", marginTop: "20px" }} type="search" placeholder="Search a Pokémon"/>
        <ButtonsWrapper>
          <button onClick={handleSearchClick}>Search</button>
          <button onClick={ShowFav}>{(status==="show") ?  "Hide Favorites" : "Show Favorites"}</button>
          <button onClick={handleRandomClick}>Random</button>
        </ButtonsWrapper>

          <Pokebola>
            { (status==="show") ?  favorites.map((favorite, index) => 
            <div className="favs" key={index}> 
              <div> #{favorite.id} </div> 
              <img className="image" onClick={() => deleteFav(favorite.name)} src={favorite.sprites.front_default} alt="Favorite Pokémon" />
              <div className="deleteText">DELETE</div>
              <div>{favorite.name}</div>
            </div>) : ""}
          </Pokebola>
          
      </Wrapper>
    </Home>*/
    
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
    width: "50%",
  },
  imgContainer: {
    borderWidth: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100px",
  },
  img: {
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
    marginBottom: 10,
  },
  btnContainer: {
    borderWidth: 3,
    height: "10%",
    display: "flex",
    flexDirection: "row",
    gap: "5%",
    color: "#ffffff",
  },
  btns: {
    borderWidth: 3,
    justifyContent: "center",
    backgroundColor: "red",
    border: "none",
    borderRadius: 6,
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  pokeimg: {
    borderWidth: 3,
    width: "100%",
    height: "100%",
  },
});