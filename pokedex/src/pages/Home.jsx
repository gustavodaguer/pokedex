import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
export const Home = () => {
    const [pokemons, setPokemons] = useState([])
    useEffect (() => {
        getPokemons();
    }, []);
    const getPokemons = () => {
        var endpoints = []
        for(var i=1; i<=50; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
        }
        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((res) => setPokemons(res))
            .catch((err) => console.log(err));
    }
  return (
    <div>
        <Navbar />
        <Container maxWidth="xg">
            <Grid justifyContent="space-evenly" container spacing={4}>
                {pokemons.map((pokemon, key) => (
                    <Grid item key={key}>
                        <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} />
                    </Grid>
                ))}
            </Grid>
        </Container>
        
    </div>
  );
};
