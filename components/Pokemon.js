import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { backgrounds } from "@/backgrounds";
import { icons } from "@/typeIcons";
import Sparkles from "./Sparkles";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  padding: 3rem;
  gap: 2rem;
`;

const SelectPokemon = styled.select`
  width: 250px;
  height: 70px;
  border-radius: 5px;
  border: 3px solid gold;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
`;

const SelectOption = styled.option`
  font-size: 1.2rem;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PokemonCard = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  background: ${({ poketype, colorsmap }) => colorsmap[poketype]};
  padding: 1rem;
  border: 8px solid gold;
  position: relative;

  transform: ${({ rotatex, rotatey }) =>
    `rotateX(${rotatex}deg) rotateY(${rotatey}deg)`};

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    opacity: ${({ ishovered }) => (ishovered ? 1 : 0)};
    transition: opacity 0.7s ease;

    background: ${({ x, y }) => `radial-gradient(
      800px circle at ${x}px ${y}px,
      rgba(255, 255, 255, 0.4),
     transparent 40%
    )`};
  }
`;

const NameTypeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const TypeIconContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.3);
`;

const Name = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  text-transform: capitalize;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const ImagesContainer = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 12;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 3px solid gold;
  z-index: 15;
  opacity: ${({ ishovered }) => (ishovered ? 0 : 1)};
  background: radial-gradient(
    circle,
    rgba(212, 151, 178, 1) 19%,
    rgba(194, 206, 221, 1) 100%
  );
  transition: all 0.7s ease;
`;

const PreviousEvolutionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid gold;
  border-radius: 5px;
  z-index: ${({ ishovered }) => (ishovered === true ? "1000" : "-5")};
  background: radial-gradient(
    circle,
    rgba(212, 151, 178, 1) 19%,
    rgba(194, 206, 221, 1) 100%
  );
  opacity: ${({ ishovered }) => (ishovered ? 1 : 0)};
  transition: all 0.7s ease;
`;

const Evolves = styled.div`
  font-size: 0.7rem;
  display: flex;
  gap: 4px;
  position: relative;

  font-weight: 600;

  &::after {
    position: absolute;
    content: "";
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: gold;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-weight: 600;
`;

const TypePill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.4);
  text-transform: capitalize;
  font-size: 0.7rem;
  color: #fff;
`;

const AbilitiesContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  font-weight: 600;
`;

const AbilitiesPill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-weight: 500;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  font-size: 0.7rem;
  text-transform: capitalize;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.3);
`;

const pokeballWiggle = keyframes`
0%{
  transform: translate(-50%, -50%) rotateZ(330deg);
  
}
25%{
  transform: translate(-50%, -50%) rotateZ(350deg) ;
}

50%{
  transform: translate(-50%, -50%) rotateZ(330deg);
}
75%{
  transform: translate(-50%, -50%) rotateZ(350deg);
}
100%{
  transform: translate(-50%, -50%) rotateZ(330deg);
}
`;

const InfoCursor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ ishovered }) => (ishovered === true ? 0.7 : 0)};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid black;
  position: relative;
  background: linear-gradient(
    0deg,
    rgb(255, 255, 255) 50%,
    rgba(247, 27, 27, 1) 50%
  );
  position: absolute;

  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
  z-index: 10000000;
  transition: opacity 0.5s ease;
  cursor: none;

  animation: ${pokeballWiggle} 3s linear 1s infinite;

  &::before {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 5px solid black;
    position: absolute;
    content: "";
    top: 32px;
    left: 29px;
    z-index: 100000000000000;
    background-color: white;
  }

  &::after {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: black;
  }
`;

//create pokeball loader
//useQuery for fetch

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [selected, setSelected] = useState(
    "https://pokeapi.co/api/v2/pokemon-species/29/"
  );
  const [pokemonObject, setPokemonObject] = useState({
    name: "",
    id: "",
    isLegendary: false,
    isMythical: false,
    evolvesFrom: "",
    text: "",
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const colorsMap = {
    fire: backgrounds.fire,
    water: backgrounds.water,
    grass: backgrounds.grass,
    electric: backgrounds.electric,
    bug: backgrounds.bug,
    ghost: backgrounds.ghost,
    psychic: backgrounds.psychic,
    rock: backgrounds.rock,
    normal: backgrounds.normal,
    poison: backgrounds.poison,
    ground: backgrounds.ground,
    fighting: backgrounds.fighting,
    dragon: backgrounds.dragon,
    ice: backgrounds.ice,
    fairy: backgrounds.fairy,
    dark: backgrounds.dark,
    steel: backgrounds.steel,
  };

  const iconsMap = {
    fire: icons.fire.img,
    water: icons.water.img,
    grass: icons.grass.img,
    electric: icons.electric.img,
    bug: icons.bug.img,
    ghost: icons.ghost.img,
    psychic: icons.psychic.img,
    rock: icons.rock.img,
    normal: icons.normal.img,
    poison: icons.poison.img,
    ground: icons.ground.img,
    fighting: icons.fighting.img,
    dragon: icons.dragon.img,
    rock: icons.rock.img,
    ice: icons.ice.img,
    fairy: icons.fairy.img,
    dark: icons.dark.img,
    steel: icons.steel.img,
  };

  const bgMap = {
    fire: icons.fire.color,
    water: icons.water.color,
    grass: icons.grass.color,
    electric: icons.electric.color,
    bug: icons.bug.color,
    ghost: icons.ghost.color,
    psychic: icons.psychic.color,
    rock: icons.rock.color,
    normal: icons.normal.color,
    poison: icons.poison.color,
    ground: icons.ground.color,
    fighting: icons.fighting.color,
    dragon: icons.dragon.color,
    rock: icons.rock.color,
    ice: icons.ice.color,
    fairy: icons.fairy.color,
  };

  const generations = [1, 2, 3, 4, 5, 6, 7, 8];
  const imageRef = useRef();
  const cardRef = useRef();
  const [mouseCardPos, setMouseCardPos] = useState({ x: "200", y: "250" });
  const [mousePos, setMousePos] = useState({ x: "", y: "" });
  const [rotation, setRotation] = useState({ rotatex: 0, rotatey: 0 });
  const [generation, setGeneration] = useState(1);

  const calculateRotation = (x, y) => {
    if (x < 200 && y < 250) {
      setRotation({
        rotatex: Math.min((200 - x) / 4, 20),
        rotatey: Math.max(360 - (250 - y) / 4, 340),
      });
    } else if (x > 200 && y > 250) {
      setRotation({
        rotatex: Math.max(360 - (x - 200) / 4, 340),
        rotatey: Math.min((y - 250) / 4, 20),
      });
    } else if (x > 200 && y < 250) {
      setRotation({
        rotatex: Math.min((x - 200) / 4, 20),
        rotatey: Math.min((250 - y) / 4, 20),
      });
    } else if (x < 200 && y > 250) {
      setRotation({
        rotatex: Math.min((200 - x) / 4, 20),
        rotatey: Math.min((y - 250) / 4, 20),
      });
    }
  };

  useEffect(() => {
    const fetchAllPokemon = async () => {
      await axios
        .get(`https://pokeapi.co/api/v2/generation/${generation}`)
        .then((response) => {
          setPokemon(response.data.pokemon_species);
        });
    };
    fetchAllPokemon();

    cardRef.current.onmousemove = (e) => {
      const x = e.clientX - cardRef.current.getBoundingClientRect().x;
      const y = e.clientY - cardRef.current.getBoundingClientRect().y;
      setMouseCardPos({ x: x, y: y });
      calculateRotation(x, y);
    };

    cardRef.current.onmouseleave = (e) => {
      setRotation({ rotatex: 0, rotatey: 0 });
    };

    imageRef.current.onmousemove = (e) => {
      const x = e.clientX - imageRef.current.getBoundingClientRect().x;
      const y = e.clientY - imageRef.current.getBoundingClientRect().y;
      setMousePos({ x: x, y: y });
    };
  }, [generation]);

  useEffect(() => {
    const fetchPokemonData = async (pokemonURL) => {
      const result = await axios.get(pokemonURL).then((response) =>
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${response.data.id}/`)
          .then((response2) => {
            if (response.data.evolves_from_species !== null) {
              axios
                .get(response.data.evolves_from_species.url)
                .then((response3) =>
                  axios
                    .get(
                      `https://pokeapi.co/api/v2/pokemon/${response3.data.id}/`
                    )
                    .then((response4) => {
                      setPokemonObject({
                        name: response.data.name,
                        gender: response.data.name.includes("-f")
                          ? "female"
                          : response.data.name.includes("-m")
                          ? "male"
                          : null,
                        id: response.data.id,
                        isLegendary: response.data.is_legendary,
                        isMythical: response.data.is_mythical,
                        evolvesFrom: response.data.evolves_from_species?.name,
                        text: response.data.flavor_text_entries[2].flavor_text.replace(
                          "\f",
                          " "
                        ),
                        type: response2.data.types[0].type.name,
                        sprite:
                          response2.data.sprites.other["official-artwork"]
                            .front_default,
                        abilities: response2.data.abilities.map(
                          (ability, id) => ability.ability.name
                        ),
                        previousEvolution:
                          response4.data.sprites?.other["official-artwork"]
                            .front_default,
                      });
                    })
                );
            }

            setPokemonObject({
              name:
                response.data.name.split("-")[1] === "f" ||
                response.data.name.split("-")[1] === "m"
                  ? response.data.name.split("-")[0]
                  : response.data.name,
              id: response.data.id,
              gender: response.data.name.includes("-f")
                ? "female"
                : response.data.name.includes("-m")
                ? "male"
                : null,
              isLegendary: response.data.is_legendary,
              isMythical: response.data.is_mythical,
              evolvesFrom: response.data.evolves_from_species?.name,
              text: response.data.flavor_text_entries[2].flavor_text.replace(
                "\f",
                " "
              ),
              type: response2.data.types[0].type.name,
              sprite:
                response2.data.sprites.other["official-artwork"].front_default,
              abilities: response2.data.abilities.map(
                (ability, id) => ability.ability.name
              ),
            });
          })
      );

      // setPokemonObject(result);
    };
    fetchPokemonData(selected);
  }, [selected]);

  return (
    <Container>
      <SelectPokemon
        onChange={(e) => {
          setSelected(e.target.value);
        }}
        value={selected}
      >
        {pokemon &&
          pokemon.map((pokemon, idx) => {
            return (
              <SelectOption key={idx} value={pokemon.url}>
                {idx + 1}. {pokemon.name.toUpperCase()}
              </SelectOption>
            );
          })}
      </SelectPokemon>
      <SelectPokemon
        style={{ width: 100 }}
        onChange={(e) => {
          setGeneration(e.target.value);
        }}
        value={generation}
      >
        {generations.map((gen, idx) => {
          return (
            <SelectOption key={idx} value={gen}>
              {gen}
            </SelectOption>
          );
        })}
      </SelectPokemon>

      {pokemonObject.isMythical || pokemonObject.isLegendary ? (
        <PokemonCard
          ref={cardRef}
          poketype={pokemonObject.type}
          colorsmap={colorsMap}
          x={mouseCardPos.x}
          y={mouseCardPos.y}
          rotatex={rotation.rotatex}
          rotatey={rotation.rotatey}
          ishovered={isCardHovered}
          onMouseOver={() => setIsCardHovered(true)}
          onMouseLeave={() => {
            setIsCardHovered(false);
            setMouseCardPos({
              x: cardRef.current.clientWidth / 2,
              y: cardRef.current.clientHeight / 2,
            });
          }}
        >
          <Sparkles>
            <NameContainer>
              {pokemonObject.evolvesFrom && (
                <Evolves>
                  {" "}
                  Evolves from{" "}
                  <p style={{ textTransform: "capitalize" }}>
                    {pokemonObject.evolvesFrom}
                  </p>
                </Evolves>
              )}
              <NameTypeContainer
                style={{
                  color:
                    pokemonObject.type === "ice" ||
                    pokemonObject.type === "electric" ||
                    pokemonObject.type === "fire" ||
                    pokemonObject.type === "psychic"
                      ? "black"
                      : "white",
                }}
              >
                <Name>{pokemonObject.name}</Name>
                <TypeIconContainer
                  style={{ backgroundColor: bgMap[pokemonObject.type] }}
                >
                  <Image
                    alt="type icon"
                    src={iconsMap[pokemonObject.type]}
                    width={40}
                    height={40}
                  />
                </TypeIconContainer>
              </NameTypeContainer>
            </NameContainer>
          </Sparkles>

          <ImagesContainer
            ref={imageRef}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {pokemonObject.previousEvolution && (
              <InfoCursor
                x={mousePos.x}
                y={mousePos.y}
                ishovered={isHovered}
              ></InfoCursor>
            )}

            <ImageContainer>
              <Image
                alt="pokemon"
                src={pokemonObject.sprite}
                width={200}
                height={200}
              />
            </ImageContainer>
            {pokemonObject.previousEvolution && (
              <PreviousEvolutionContainer ishovered={isHovered}>
                <Image
                  alt="pokemon"
                  src={pokemonObject.previousEvolution}
                  width={200}
                  height={200}
                />
              </PreviousEvolutionContainer>
            )}
          </ImagesContainer>

          <Sparkles>
            {pokemonObject.isLegendary && (
              <p
                style={{
                  color:
                    pokemonObject.type === "ice" ||
                    pokemonObject.type === "electric" ||
                    pokemonObject.type === "fire" ||
                    pokemonObject.type === "psychic"
                      ? "black"
                      : "white",
                }}
              >
                Legendary Pokemon
              </p>
            )}
          </Sparkles>

          <Sparkles>
            {pokemonObject.isMythical && (
              <p
                style={{
                  color: pokemonObject.type === "psychic" ? "black" : " white",
                }}
              >
                Mythical Pokemon
              </p>
            )}
          </Sparkles>

          <Sparkles>
            <p style={{ color: "black", fontWeight: 500 }}>
              {pokemonObject.text}
            </p>
          </Sparkles>

          <Sparkles>
            <TypeContainer
              style={{
                color:
                  pokemonObject.type === "ice" ||
                  pokemonObject.type === "electric" ||
                  pokemonObject.type === "fire" ||
                  pokemonObject.type === "psychic"
                    ? "black"
                    : "white",
              }}
            >
              Type: <TypePill>{pokemonObject.type}</TypePill>
            </TypeContainer>
          </Sparkles>
          <Sparkles>
            <AbilitiesContainer
              style={{
                color:
                  pokemonObject.type === "ice" ||
                  pokemonObject.type === "electric" ||
                  pokemonObject.type === "fire" ||
                  pokemonObject.type === "psychic"
                    ? "black"
                    : "white",
              }}
            >
              Abilities:
              {pokemonObject.abilities?.map((ability, idx) => (
                <AbilitiesPill key={idx}>{ability}</AbilitiesPill>
              ))}
            </AbilitiesContainer>
          </Sparkles>
        </PokemonCard>
      ) : (
        <PokemonCard
          ref={cardRef}
          poketype={pokemonObject.type}
          colorsmap={colorsMap}
          x={mouseCardPos.x}
          y={mouseCardPos.y}
          rotatex={rotation.rotatex}
          rotatey={rotation.rotatey}
          ishovered={isCardHovered}
          onMouseOver={() => setIsCardHovered(true)}
          onMouseLeave={() => {
            setIsCardHovered(false);
            setMouseCardPos({
              x: cardRef.current.clientWidth / 2,
              y: cardRef.current.clientHeight / 2,
            });
          }}
        >
          <NameContainer>
            {pokemonObject.evolvesFrom && (
              <Evolves
                style={{
                  color:
                    pokemonObject.type === "ghost" ||
                    pokemonObject.type === "ground" ||
                    pokemonObject.type === "dragon"
                      ? "white"
                      : "black",
                }}
              >
                {" "}
                Evolves from{" "}
                <p style={{ textTransform: "capitalize" }}>
                  {pokemonObject.evolvesFrom}
                </p>
              </Evolves>
            )}
            <NameTypeContainer>
              <Name
                style={{
                  color:
                    pokemonObject.type === "ghost" ||
                    pokemonObject.type === "ground" ||
                    pokemonObject.type === "dragon"
                      ? "white"
                      : "black",
                }}
              >
                {pokemonObject.name}{" "}
                {pokemonObject.gender === "male" ? (
                  <BsGenderMale />
                ) : pokemonObject.gender === "female" ? (
                  <BsGenderFemale />
                ) : null}
              </Name>
              <TypeIconContainer
                style={{ backgroundColor: bgMap[pokemonObject.type] }}
              >
                <Image
                  alt="type icon"
                  src={iconsMap[pokemonObject.type]}
                  width={40}
                  height={40}
                />
              </TypeIconContainer>
            </NameTypeContainer>
          </NameContainer>

          <ImagesContainer
            ref={imageRef}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {pokemonObject.previousEvolution && (
              <InfoCursor
                x={mousePos.x}
                y={mousePos.y}
                ishovered={isHovered}
              ></InfoCursor>
            )}

            <ImageContainer>
              <Image
                alt="pokemon"
                src={pokemonObject.sprite}
                width={200}
                height={200}
              />
            </ImageContainer>
            {pokemonObject.previousEvolution && (
              <PreviousEvolutionContainer ishovered={isHovered}>
                <Image
                  alt="pokemon"
                  src={pokemonObject.previousEvolution}
                  width={200}
                  height={200}
                />
              </PreviousEvolutionContainer>
            )}
          </ImagesContainer>

          {pokemonObject.isLegendary && <p>Legendary Pokemon</p>}

          {pokemonObject.isMythical && <p>Mythical Pokemon</p>}

          <p
            style={{
              color:
                pokemonObject.type === "ghost" ||
                pokemonObject.type === "ground" ||
                pokemonObject.type === "dragon"
                  ? "white"
                  : "black",
            }}
          >
            {pokemonObject.text}
          </p>
          <TypeContainer
            style={{
              color:
                pokemonObject.type === "ghost" ||
                pokemonObject.type === "ground" ||
                pokemonObject.type === "dragon"
                  ? "white"
                  : "black",
            }}
          >
            Type: <TypePill>{pokemonObject.type}</TypePill>
          </TypeContainer>
          <AbilitiesContainer
            style={{
              color:
                pokemonObject.type === "ghost" ||
                pokemonObject.type === "ground" ||
                pokemonObject.type === "dragon"
                  ? "white"
                  : "black",
            }}
          >
            Abilities:
            {pokemonObject.abilities?.map((ability, idx) => (
              <AbilitiesPill key={idx}>{ability}</AbilitiesPill>
            ))}
          </AbilitiesContainer>
        </PokemonCard>
      )}
    </Container>
  );
};

export default Pokemon;
