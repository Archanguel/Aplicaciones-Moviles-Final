import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { View, Button, StyleSheet, Image, Text, TouchableOpacity, TouchableHighlight, ScrollView  } from "react-native";
//import styled from "styled-components";
import loadingScreen from "../src/imgs/loadingimg.gif";
//import errorScreen from "../src/imgs/snorlax.gif";
//import errorScreen2 from "../src/imgs/error404.png";
import errorScreen3 from "../src/imgs/error404screen.png";
//import pokelogo from "../../imgs/pokedex4.png";
//import { useHistory } from "react-router";

export const PokeCard = ({ /*pokemon,*/ addFavorite, favorites, deleteFav, route, navigation }) => {
  //const [pokemonData, setPokemonData] = React.useState(AsyncStorage.getItem("pokemon") || ( Math.floor( Math.random() *  898 ) + 1 )); //AsyncStorage.getItem("pokemon") ? "" : ( Math.floor( Math.random() *  898 ) + 1 )
  const [pokemonData, setPokemonData] = React.useState("");
  //const history = useHistory();
  const [status, setStatus] = React.useState("idle");
  const {pokemon} = route.params;

  //const [favorites, setFavorite] = React.useState(["pikachu"]);
  //const [favorites, setFavorite] = React.useState(AsyncStorage.getItem("favorites") || []);
  //const favoritesName = favorites.map(favorite => favorite.name); //((types, index) => <Text style={ styles.PokeTypeOne } key={index}>{types.type.name}</Text>)
  //const isPokemonAdded = pokemonData && favoritesNames.includes(pokemonData.name);

  /*function handleAddFavorite(pokemon) {
    setFavorite((oldFavorites) => [...oldFavorites, pokemon]);
  }
  function deleteFavorite(pokemonName) {
    setFavorite(favorites.filter((favorite) => favorite.name !== pokemonName));
  }*/


  React.useEffect(() => {
    setStatus("loading");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) //AsyncStorage.getItem("pokemon")
        .then( (response) => response.json().then((data) => {
            setPokemonData(data)
            setStatus("idle")
          })
        )
        .catch((error) => setStatus("error"));
  },[pokemon])

  /*function searchPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeData.toLowerCase()}`)
      .then(response => response.json().then(data => setPokeData(data)))
      .catch(error => console.error(error))
  }*/

  /*React.useEffect(() => {
    AsyncStorage.setItem("pokemon", pokemon);
    AsyncStorage.setItem("favorites", favorites);
  }, [pokemon, favorites]);*/

  if(status === "idle"){
    return(
        <View>
            <ScrollView style={ styles.Body }>
                {pokemonData && (
                    <View style={ styles.ContainerMainSectionContainer }>
                        <View style={ styles.ContainerMainSection } >
                            <View style={ styles.MainSectionWhite } >
                                <View style={ styles.MainSectionBlack } >
                                    <View style={ [styles.MainScreen, styles.normal ] } /*className={`main-screen `+pokemonData.types[0].type.name}*/>
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
                            <View style={ styles.RightContainerScreen }>
                              {/*favorites.map((favorite, index) =>*/ <View style={ styles.ListItem } /*key={index} onPress={() => deleteFavorite(favorite.name)}*/><Text> {/*favorite.name}  #{favorite.id*/} </Text></View>/*)*/}
                            </View>
                          </View>

                          <View style={ styles.RightContainerButtons }>
                            <TouchableHighlight underlayColor="#E71D23" style={ styles.LeftButton } /*onPress={isPokemonAdded ? () => deleteFavorite(pokemonData.name) : () => handleAddFavorite(pokemonData)}*/><Text> ❤️{/*isPokemonAdded ? '❤️' : '🖤'*/} </Text></TouchableHighlight>
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
          <TouchableHighlight underlayColor="blue" style={ styles.btnError } onPress={() => navigation.navigate("Home")}><Text>Go To Menu</Text></TouchableHighlight>
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
      //height: "calc(100% - 50px)",
      //height: "100vh",
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
      //height: "325px",
      //height: "50vh",
      alignItems: "center",
      justifyContent: "center"
    },
      
    MainSectionBlack : {
        backgroundColor: "#000000",
        height: "calc(100% - 30px)",
        //height: "100%",
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
        color: "#FFFFFF",/* rgba(255, 253, 253, 0.5);*/
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
        //backgroundColor: "#151515",
    },
      
    ScreenStats : {
        backgroundColor: "rgba(0,0,0,.3)",
        borderRadius: "5px",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        //height: "100%",
        //justifyContent: "space-between",
        //marginTop: "15px",
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
        /*text-align: center;*/
        listStyle: "none",
    },
    PokeTypeTwo : {
        backgroundColor: "rgba(255,255,255,.3)",
        borderRadius: "25px",
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        /*text-align: center;*/
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
      //backgroundColor: "#E71D23",
      //height: "calc(100% - 50px)",
      //width: "calc(50% - 50px)",
      //display: "flex",

      padding: "15px",
      height: "45vh",
      marginTop: "5px",
      flex: 1,
    },
    
    RightContainerBlack : {
      backgroundColor: "black",
      boxShadow: "0 0 2px 2px rgba(0,0,0,.3)",
      height: "240px",
      //height: "100%",
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
    /*
    RightContainerScreen::-webkit-scrollbar : {
      width: "2px",
      height: "10px",
    },
    
    .right-container__screen::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    },
    
    .right-container__screen::-webkit-scrollbar-thumb {
      background: red; 
      border-radius: 10px;
    },
    */
    ListItem : {
      alignItems: "center",
      color: "white",
      //display: "flex",
      fontSize: "12px",
      height: "40px",
      overflowX: "hidden",
      paddingLeft: "5px",
      width: "50%",/*width: 100%;*/
      textTransform: "capitalize",
    },
    /*ListItem::before : {
      content: "❤️",
    },
    ListItem:hover::before : {
      content: "❌",
    },
    ListItem:active : {
      backgroundColor: "#1280f2",
      color: "white",
    },*/
    
    RightContainerButtons : {
      //display: "flex",
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
      //display: "flex",
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
      //display: "flex",
      fontWeight: "bold",
      height: "30px",
      justifyContent: "center",
      textTransform: "uppercase",
      width: "120px",
    },
    
    /*LeftButton:active : {
      boxShadow: "inset 0 0 2px 2px rgba(0,0,0,.3)",
    },
    RightButton:active : {
      boxShadow: "inset 0 0 2px 2px rgba(0,0,0,.3)",
    },*/

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
/*return (
    <>
      {pokemonData && (
        <div className="pokedex">
          <div className="left-container">
      
            <div className="left-container__top-section">
              <div className="top-section__blue"></div>
      
              <div className="top-section__small-buttons">
                <div className="top-section__red"></div>
                <div className="top-section__yellow"></div>
                <div className="top-section__green"></div>
              </div>

                <img className="pokelogo" src={pokelogo} alt="Pokémon Logo" />
      
            </div>
      
            <div className="left-container__main-section-container">
              <div className="left-container__main-section">
                <div className="main-section__white">
                  <div className="main-section__black">
                    <div className={`main-screen `+pokemonData.types[0].type.name}>
                      <div className="screen__header">
                        <span className="poke-name">{pokemonData.name}</span>
                        <span className="poke-id">#{pokemonData.id}</span>
                      </div>

                      <div className="screen__image">
                        <img src={pokemonData.sprites.front_default} className="poke-front-image" alt="front"/>
                        <img src={pokemonData.sprites.back_default} className="poke-back-image" alt="back"/>
                      </div>

                      <div className="screen__description">
                        <div className="stats__types">
                          {pokemonData.types.map((types, index) => <span className="poke-type-one" key={index}>{types.type.name}</span>)}
                        </div>
                        <div className="screen__stats">
                          <p className="stats__weight">
                            Weight: <span className="poke-weight">{pokemonData.weight}</span>
                          </p>
                          <p className="stats__height">
                            Height: <span className="poke-height">{pokemonData.height}</span>
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
      
                <div className="left-container__controllers">
                  <div className="controllers__d-pad">
                    <div className="d-pad__cell top"></div>
                    <div className="d-pad__cell left"></div>
                    <div className="d-pad__cell middle"></div>
                    <div className="d-pad__cell right"></div>
                    <div className="d-pad__cell bottom"></div>
                  </div>
      
                  <div className="controllers__buttons">
                    <div className="buttons__button">B</div>
                    <div className="buttons__button">A</div>
                  </div>
                </div>
      
              </div>
      
              <div className="left-container__right">
                <div className="left-container__hinge"></div>
                <div className="left-container__hinge"></div>
              </div>
            </div>
          </div>
      
          <div className="right-container">
      
            <div className="right-container__black">
              <div className="right-container__screen">
                {favorites.map((favorite, index) => <div className="list-item" key={index} onClick={() => deleteFav(favorite.name)}>{favorite.name}  #{favorite.id} </div>)}
              </div>
            </div>
      
            <div className="right-container__buttons">
              <div className="left-button" onClick={isPokemonAdded ? () => deleteFav(pokemonData.name) : () => addFavorite(pokemonData)}> {isPokemonAdded ? '❤️' : '🖤'} </div>
              <div className="right-button" onClick={() => history.push("./")}>Go To Menu</div>
            </div>
      
          </div>
        </div>
      )}
    </>
  );

}else if(status === "loading"){
    return(
      <>
      <LoadingImg>

      </LoadingImg>
      </>
    );
}else if(status === "error"){
    return (
      <>
      <ErrorScreen>
        <button className="btnError" onClick={() => history.push("./")}>Go To Menu</button>
      </ErrorScreen>
      </>
    );
}*/