import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { View, Button, StyleSheet, Image, Text  } from "react-native";
//import styled from "styled-components";
//import loadingScreen from "../../imgs/loadingimg.gif";
//import errorScreen from "../../imgs/snorlax.gif";
//import pokelogo from "../../imgs/pokedex4.png";
//import { useHistory } from "react-router";

export const PokeCard = ({ addFavorite, /*favorites,*/ deleteFav, route }) => {
    //const [pokeData, setPokeData] = React.useState("pikachu"); //AsyncStorage.getItem("pokemon")
    const [pokemonData, setPokemonData] = React.useState();
    //const history = useHistory();
    //const favoriteNames = favorites.map(favorite => favorite.name);
    //const isPokemonAdded = pokemonData && favoriteNames.includes(pokemonData.name);
    const [status, setStatus] = React.useState("idle");
    const {pokemon} = route.params;

  React.useEffect(() => {
    setStatus("loading");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) //AsyncStorage.setItem("pokemon", searchText)
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

  //React.useEffect(() => {
    //AsyncStorage.setItem("pokemon", JSON.stringify(pokemon));
    //localStorage.setItem("favorites", JSON.stringify(favorites));
  //}, [pokemon/*, favorites*/]);

  if(status === "idle"){
    return(
        <>
            <View>
                {pokemonData && ( /*<Image style={ styles.pokeimg } source={{ uri: pokemonData.sprites.front_default }} />*/
                    <View style={ styles.ContainerMainSectionContainer }>
                        <View style={ styles.ContainerMainSection } >
                            <View style={ styles.MainSectionWhite } >
                                <View style={ styles.MainSectionBlack } >
                                    <View style={ styles.MainScreen } /*className={`main-screen `+pokemonData.types[0].type.name}*/>
                                        <View style={ styles.ScreenHeader }>
                                            <Text style={ styles.PokeName }>{pokemonData.name}</Text>
                                            <Text style={ styles.PokeId }>#{pokemonData.id}</Text>
                                        </View>

                                        <View style={ styles.ScreenImage }>
                                            <Image source={{ uri: pokemonData.sprites.front_default }} style={ styles.PokeFrontimage } alt="front"/>
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
                    </View> 
                )}
            </View>
        </>
    )} else if(status === "loading") {
        return(
        <>
        <View>

        </View>
        </>
        );
    }else if(status === "error"){
        return (
        <>
        <View>
            <Button className="btnError" onClick={() => navigation.navigation("Home")}>Go To Menu</Button>
        </View>
        </>
        );
    };
};

export default PokeCard;

const styles = StyleSheet.create({
    /*pokeimg: {
      borderWidth: 3,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "200px",
      height: "200px",
    },*/
    body:{
        height: "100vh",
        width: "100vw",
    },


    ContainerMainSectionContainer: {
        display: "flex",
        height: "calc(100% - 50px)",
    },
      
    ContainerMainSection : {
        height: "100%",
        padding: "25px",
        width: "500px",
    },
      
    MainSectionWhite : {
        backgroundColor: "#F9F9F9",
        border: "3px solid black",
        boxShadow: "inset 0 0 3px 3px rgba(0,0,0,.3)",
        height: "325px",
    },
      
    MainSectionBlack : {
        backgroundColor: "#000000",
        height: "calc(100% - 50px)",
        margin: "25px",
        padding: "10px",
        width: "calc(100% - 50px)",
    },
     
    MainScreen : {
        borderRadius: "15px",
        height: "100%",
        padding: "15px",
    },
      
    ScreenHeader : {
        alignItems: "center",
        display: "flex",
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
        height: "100px",
        justifyContent: "space-around",
    },
      
    ScreenStats : {
        backgroundColor: "rgba(0,0,0,.3)",
        borderRadius: "5px",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "20px 15px",
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