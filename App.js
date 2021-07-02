import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [pokeData, setPokeData] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');

  function searchPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`)
      .then(response => response.json().then(data => setPokeData(data)))
      .catch(error => console.error(error))
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search Pokémon" onChangeText={text => setSearchText(text)} />
      <Button title="Search" onPress={() => searchPokemon()}/>
      {pokeData && <Image style={ styles.image } source={{ uri: pokeData.sprites.front_default }} /> }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200
  },
});
