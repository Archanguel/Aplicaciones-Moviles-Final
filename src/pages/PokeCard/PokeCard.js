import React from "react";
import styled from "styled-components";
import loadingScreen from "../imgs/loadingimg.gif";
import errorScreen from "../imgs/snorlax.gif";
import pokelogo from "../imgs/pokedex4.png";
import { useHistory } from "react-router";

export const PokeCard = ({ pokemon, addFavorite, favorites, deleteFav }) => {
  const [pokemonData, setPokemonData] = React.useState();
  const history = useHistory();
  const favoriteNames = favorites.map(favorite => favorite.name);
  const isPokemonAdded = pokemonData && favoriteNames.includes(pokemonData.name);
  const [status, setStatus] = React.useState("idle");

  React.useEffect(() => {
    setStatus("loading");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then( (response) =>  
          response.json().then(
            (data) => {
            setPokemonData(data)
            setStatus("idle")
          })
        )
        .catch((error) => setStatus("error"));
  },[pokemon])

  React.useEffect(() => {
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [pokemon, favorites]);

  if(status === "idle"){
    return(
        <></>
    )};
};


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