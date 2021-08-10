import React from "react";
import { View, StyleSheet, Image, Text, TouchableHighlight, ScrollView  } from "react-native";
import loadingScreen from "../imgs/loadingimg.gif";
import errorScreen3 from "../imgs/error404screen.png";

export const PokeCard = ({ route, navigation }) => {
  const [pokemonData, setPokemonData] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  const {pokemon } = route.params;
  const [favorites, setFavorites] = React.useState([]);

  const favoriteName = favorites.map(favorite => favorite.name);
  const isPokemonAdded = pokemonData && favoriteName.includes(pokemonData.name);

  function addFavorites(pokemon) {
    setFavorites((olvFavorites) => [...olvFavorites, pokemon]);
  };

  function deleteFavorites(pokemonName) {
    setFavorites(favorites.filter((favorite) => favorite.name !== pokemonName));
  };

  React.useEffect(() => {
    setStatus("loading");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then( (response) => response.json().then((data) => {
            setPokemonData(data)
            setStatus("idle")
          })
        )
        .catch((error) => setStatus("error"));
  },[pokemon]);

  if(status === "idle"){
    return(
        <View>
            <ScrollView style={ styles.Body }>
                {pokemonData && (
                    <View style={ styles.ContainerMainSectionContainer }>
                        <View style={ styles.ContainerMainSection } >
                            <View style={ styles.MainSectionWhite } >
                                <View style={ styles.MainSectionBlack } >
                                    <View style={ [styles.MainScreen, 
                                      pokemonData.types[0].type.name === "normal" ? styles.normal : 
                                      pokemonData.types[0].type.name === "fighting" ? styles.fighting : 
                                      pokemonData.types[0].type.name === "flying" ? styles.flying : 
                                      pokemonData.types[0].type.name === "poison" ? styles.poison : 
                                      pokemonData.types[0].type.name === "ground" ? styles.ground : 
                                      pokemonData.types[0].type.name === "rock" ? styles.rock : 
                                      pokemonData.types[0].type.name === "bug" ? styles.bug : 
                                      pokemonData.types[0].type.name === "ghost" ? styles.ghost : 
                                      pokemonData.types[0].type.name === "steel" ? styles.steel : 
                                      pokemonData.types[0].type.name === "fire" ? styles.fire : 
                                      pokemonData.types[0].type.name === "water" ? styles.water : 
                                      pokemonData.types[0].type.name === "grass" ? styles.grass : 
                                      pokemonData.types[0].type.name === "electric" ? styles.electric : 
                                      pokemonData.types[0].type.name === "psychic" ? styles.psychic : 
                                      pokemonData.types[0].type.name === "ice" ? styles.ice : 
                                      pokemonData.types[0].type.name === "dragon" ? styles.dragon : 
                                      pokemonData.types[0].type.name === "dark" ? styles.dark : 
                                      pokemonData.types[0].type.name === "fairy" ? styles.fairy : ""] }>
                                        <View style={ styles.ScreenHeader }>
                                            <Text style={ styles.PokeName }>{pokemonData.name}</Text>
                                            <Text style={ styles.PokeId }>#{pokemonData.id}</Text>
                                        </View>

                                        <View style={ styles.ScreenImage }>
                                            <Image source={{ uri: pokemonData.sprites.front_default }} style={ styles.PokeFrontImage } alt="front"/>
                                            <Image source={{ uri: pokemonData.sprites.back_default }} style={ styles.PokeBackImage } alt="back"/>
                                        </View>

                                        <View style={ styles.ScreenDescription } >
                                            <View style={ styles.StatsTypes } >
                                                {pokemonData.types.map((types, index) => <Text style={ styles.PokeTypeOne } key={index}>{types.type.name}</Text>)}
                                            </View>
                                            <View style={ styles.ScreenStats } >
                                                <Text style={ styles.StatsWeight } >
                                                    Weight: <Text style={ styles.PokeWeight } >{pokemonData.weight}</Text>
                                                </Text>
                                                <Text style={ styles.StatsHeight } >
                                                    Height: <Text style={ styles.PokeHeight } >{pokemonData.height}</Text>
                                                </Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={ styles.RightContainer }>

                          <View style={ styles.RightContainerBlack }>
                            <ScrollView style={ styles.RightContainerScreen }>
                              {favorites.map((favorite, index) => <View style={ styles.ListItem } key={index} ><Text onPress={() => deleteFavorites(favorite.name)}> ❤️{favorite.name}  #{favorite.id} </Text></View>)}
                            </ScrollView>
                          </View>

                          <View style={ styles.RightContainerButtons }>
                            <TouchableHighlight underlayColor="#E71D23" style={ styles.LeftButton } onPress={isPokemonAdded ? () => deleteFavorites(pokemonData.name) : () => addFavorites(pokemonData)}><Text> {isPokemonAdded ? '❤️' : '🖤'} </Text></TouchableHighlight>
                            <TouchableHighlight underlayColor="#E71D23" style={ styles.RightButton } onPress={() => navigation.navigate("Home")}><Text>Go To Menu</Text></TouchableHighlight>
                          </View>

                        </View>
                    </View> 
                )}
            </ScrollView>
        </View>
    )} else if(status === "loading") {
        return(
        <>
          <Image source={{ uri: loadingScreen }} style={ styles.loadingImage } alt="Loading Screen"/>
        </>
        );
    }else if(status === "error"){
        return (
        <View>
          <Image source={{ uri: errorScreen3 }} style={ styles.errorImage } alt="Error Screen"/>
          <TouchableHighlight underlayColor="blue" style={ styles.btnError } onPress={() => navigation.navigate("Home", {favorites: favorites})}><Text>Go To Menu</Text></TouchableHighlight>
        </View>
        );
    };
};

export default PokeCard;

const styles = StyleSheet.create({
    Body : {
      backgroundColor: "#E71D23",
      height: "100vh",
      width: "100vw",
    },

    ContainerMainSectionContainer: {
      display: "flex",
    },

    /* TOP CONTAINER */
      
    ContainerMainSection : {
      height: "50vh",
      padding: "15px",
      width: "100vw",
      flex: 1,
    },
      
    MainSectionWhite : {
      backgroundColor: "#F9F9F9",
      border: "3px solid black",
      boxShadow: "inset 0 0 3px 3px rgba(0,0,0,.3)",
      alignItems: "center",
      justifyContent: "center"
    },
      
    MainSectionBlack : {
        backgroundColor: "#000000",
        height: "calc(100% - 30px)",
        margin: "25px",
        padding: "10px",
        width: "calc(100% - 30px)",
    },
     
    MainScreen : {
        borderRadius: "15px",
        height: "100%",
        padding: "10px",
        backgroundColor: "blue",
    },
      
    ScreenHeader : {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
      
    PokeName : {
        color: "#FFFFFF",
        fontSize: "20px",
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    
    PokeId : {
        color: "#FFFFFF",
        fontSize: "20px",
    },

    StatsWeight : {
        color: "#FFFFFF",
    },
    PokeWeight : {
        color: "#FFFFFF",
    },

    StatsHeight : {
        color: "#FFFFFF",
        marginTop: "30px",
    },
    PokeHeight : {
        color: "#FFFFFF",
    },
      
    ScreenImage : {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
      
    PokeFrontImage: {
        alignSelf: "flex-start",
        height: "96px",
        width: "96px",
    },
    PokeBackImage : {
        alignSelf: "flex-end",
        height: "96px",
        width: "96px",
    },
      
    ScreenDescription : {
        display: "flex",
        flexDirection: "row",
        height: "100px",
        justifyContent: "space-around",
    },
      
    ScreenStats : {
        backgroundColor: "rgba(0,0,0,.3)",
        borderRadius: "5px",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
    },
      
    StatsTypes : {
        height: "100%",
        padding: "5px",
    },
      
    PokeTypeOne: {
        backgroundColor: "rgba(255,255,255,.3)",
        borderRadius: "25px",
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        listStyle: "none",
    },
    PokeTypeTwo : {
        backgroundColor: "rgba(255,255,255,.3)",
        borderRadius: "25px",
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        listStyle: "none",
    },

    normal : {
        backgroundColor: "#BABAAE",
      },
      
      fighting : {
        backgroundColor: "#A75543",
      },
      
      flying : {
        backgroundColor: "#78A2FF",
      },
      
      poison : {
        backgroundColor: "#A95CA0",
      },
      
      ground : {
        backgroundColor: "#EECC55",
      },
      
      rock : {
        backgroundColor: "#CCBD72",
      },
      
      bug : {
        backgroundColor: "#C2D21E",
      },
      
      ghost : {
        backgroundColor: "#7975D7",
      },
      
      steel : {
        backgroundColor: "#C4C2DB",
      },
      
      fire : {
        backgroundColor: "#FA5643",
      },
      
      water : {
        backgroundColor: "#56ADFF",
      },
      
      grass : {
        backgroundColor: "#8CD750",
      },
      
      electric : {
        backgroundColor: "#FDE139",
      },
      
      psychic : {
        backgroundColor: "#FA65B4",
      },
      
      ice : {
        backgroundColor: "#96F1FF",
      },
      
      dragon : {
        backgroundColor: "#8673FF",
      },
      
      dark : {
        backgroundColor: "#8D6855",
      },
      
      fairy : {
        backgroundColor: "#F9AEFF",
      },

    /* BOTTOM CONTAINER */

    RightContainer : {
      padding: "15px",
      height: "45vh",
      marginTop: "5px",
      flex: 1,
    },
    
    RightContainerBlack : {
      backgroundColor: "black",
      boxShadow: "0 0 2px 2px rgba(0,0,0,.3)",
      height: "240px",
      padding: "10px",
      display: "flex",
    },
    
    RightContainerScreen : {
      backgroundColor: "#43B0F2",
      borderRadius: "15px",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      height: "100%",
      padding: "15px 15px 0",
    },
    
    ListItem : {
      fontSize: "10px",
      height: "25px",
      paddingLeft: "5px",
      textTransform: "capitalize",
    },
    
    RightContainerButtons : {
      justifyContent: "space-around",
      marginTop: "10px",
      flexDirection: "row",
    },
    
    LeftButton : {
      alignItems: "center",
      backgroundColor: "#DEDEDE",
      borderRadius: "3px",
      border: "2px solid black",
      boxShadow: "0 0 2px 2px rgba(0,0,0,.3)",
      fontWeight: "bold",
      height: "30px",
      justifyContent: "center",
      textTransform: "uppercase",
      width: "120px",
    },
    RightButton : {
      alignItems: "center",
      backgroundColor: "#DEDEDE",
      borderRadius: "3px",
      border: "2px solid black",
      boxShadow: "0 0 2px 2px rgba(0,0,0,.3)",
      fontWeight: "bold",
      height: "30px",
      justifyContent: "center",
      textTransform: "uppercase",
      width: "120px",
    },

    /* LOADING SCREEN */

    loadingImage : {
      height: "100vh",
    },

    /* ERROR SCREEN */

    errorImage : {
      height: "100vh",
    },

    btnError : {
      alignSelf:"center",
      textAlign: "center",
      justifyContent: "center",
      fontSize: "30px",
      backgroundColor:"yellow",
      borderStyle: "none",
      height: "50px",
      width: "200px",

      position: "absolute",
      top: "66%",
      borderRadius: "50px",
    },
});
