import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import pokemonFinder from "../imgs/PokemonFinder.png";
import background from "../imgs/background3.png";

export const HomePage = ({ setPokemon, favorites, deleteFav }) => {
  const history = useHistory();
  const [status, setStatus] = React.useState("show");
  
  React.useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
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

  return (
    <></>
  );
};

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