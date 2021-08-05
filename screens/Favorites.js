import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, ImageBackground, Image, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import background from "../src/imgs/pokebola.jpg";
import favbg from "../src/imgs/favoriteBackground.jpg";

export default function Favorites({navigation, route}) {
    //const favorites = AsyncStorage.getItem("favorites");
    
  const {favorites, setFavorites, /*favoriteName,*/ deleteFavorites} = route.params;
  /*const asd = async () => {
    return await AsyncStorage.getItem("favorites");
  }*/
  //const asd = await AsyncStorage.getItem("favorites");

  //const [favorites, setFavorites] = React.useState([]); //AsyncStorage.getItem("favorites") || 


  /*function deleteFavorites(pokemonName) {
    setFavorites(favorites.filter((favorite) => favorite.name !== pokemonName));
    //console.log(favorites);
  };*/

    return (
        <ImageBackground source={background}>
            <View style={ styles.home }>
                <View style={ styles.btnContainer }>
                    <TouchableHighlight underlayColor="#E71D23" style={ styles.btns } onPress={() => navigation.navigate("Home")}><Text style={ styles.btnsTxt }>Hide Favs</Text></TouchableHighlight>
                </View>

                
                <View style={ styles.Pokebola } >
                    {favorites.map((favorite, index) => 
                    <View style={ styles.favs } key={index}> 
                        <Text> #{favorite.id} </Text> 
                        {/*<TouchableWithoutFeedback source={favbg} style={ styles.image } onPress={() => deleteFavorites(favorite.name)} >
                            <Image source={favorite.sprites.front_default} alt="Favorite Pokémon" />
                        </TouchableWithoutFeedback>*/}
                        <ImageBackground source={favbg} style={ styles.bkgImage } >
                            <Image style={ styles.image } onClick={() => deleteFavorites(favorite.name)} source={favorite.sprites.front_default} alt="Favorite Pokémon" />
                        </ImageBackground>
                        <Text style={ styles.deleteText }>DELETE</Text>
                        <Text>{favorite.name}</Text>
                    </View>)}

                    {/*AsyncStorage.getItem("favorites").map((favorite, index) => <View key={index} ><Text> {favorite.name}  #{favorite.id} </Text></View>)
                    <View ><Text> {AsyncStorage.getItem("favorites")} </Text></View>*/}
                </View>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    home: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        //alignItems: "center",
        backgroundSize: "cover",
    },
    btnContainer: {
        color: "#ffffff",
        //height: "100%",
        //weight: "100%",
        paddingTop: "5px",
    },
    btns: {
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "white",
        border: "none",
        borderRadius: 6,
        height: "40px",
        weight: "100%",
    },
    btnsTxt: {
        textAlign: "center",
        color: "red",
        fontSize: 10,
        fontWeight: 600,
        padding: "20px",
    },

    Pokebola : {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingTop: "5px",
        gap: "5px",
        justifyContent: "center",
    },
      
    favs : {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(40, 162, 219)",
        border: "none",
        borderRadius: "6px",
        textTransform: "capitalize",
        textAlign: "center",
    },
      
    bkgImage : {
        display: "flex",
        width: "49px",
        height: "49px",
        //background:url("../imgs/favoriteBackground.jpg"),
        backgroundSize: "49px",
        //border: "none",
        borderRadius: "300px",
        alignSelf: "center",
        zIndex: "1",
    },
    image : {
        display: "flex",
        width: "49px",
        height: "49px",
        //background:url("../imgs/favoriteBackground.jpg"),
        backgroundSize: "49px",
        alignSelf: "center",
        zIndex: "2",
    },
      
    deleteText : {
        position: "absolute",
        alignSelf: "center",
        userSelect: "none",
        marginTop: "28px",
        fontSize: "10px",
        color: "red",
        cursor: "default",
        fontWeight: "bold",
        pointerEvents: "none",
    },
});