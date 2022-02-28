/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom'
import gstyle from './styles';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import { writeCookies, readCookies } from '../../utils/common';
import { DataContext } from '../App';

const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache()
});

const mastersQuery = gql`
    query samplePokeAPIquery {
        generations: pokemon_v2_generation {
            name
            id
        }
        pokemon_v2_pokemoncolor {
            id
            name
        }
        pokemon_v2_type {
            id
            name
        }
    }
`;

const onChangeChk = (e) => {
    
}

const MyPoke = () => {
    const navigate = useNavigate();
    const cardClick = useCallback((id) => navigate('/' + id + '/detail'), [navigate]);
    const { mine, updateMine } = useContext(DataContext);

    function releasePoke (e, data) {
        e.preventDefault();
        e.stopPropagation();
        let prep = mine;
        prep.mine.owned = prep.mine.owned.filter(function (d) { return d.nickname != data.nickname });
        prep.mine.total = prep.mine.owned.length;
        writeCookies(prep);
        updateMine();
    }

    return (
        <div css={gstyle.row}>
            <div css={gstyle.column}>
            
                <div css={gstyle.listRow}>
                    {mine.mine.owned.map(function (d) {
                        let link_url = '/' + d.id + '/detail'
                        return (
                            <div css={gstyle.card} key={d.id} onClick={() => cardClick(d.id)}>
                                <img css={gstyle.cardAvatar} src={'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' + d.id.toString().padStart(3, '0') + '.png'} />
                                <h1 css={gstyle.cardTitle} onClick={(e) => e.stopPropagation()} >{d.nickname}</h1>
                                <small css={css`text-transform: capitalize;`} onClick={(e) => e.stopPropagation()} >{d.name}</small>
                                <div css={gstyle.listRow}>
                                {d.pokemon_v2_pokemontypes.map(function (dd) {
                                    return (
                                        <label css={css`background-color: ${gstyle.typeColor[dd.pokemon_v2_type.name]}; ${gstyle.cardLink}`} key={dd.pokemon_v2_type.id} ><span onClick={(e) => e.stopPropagation()}>{dd.pokemon_v2_type.name}</span></label>
                                    );
                                })}
                                </div>
                                <label css={css`
                                    font-size: 0.8rem;
                                    text-decoration: none;
                                    padding: 0.1rem .2rem;
                                    background-color: white; 
                                    color: black; 
                                    border: 1px solid black; 
                                    border-radius: .5rem;
                                    margin-top: .2rem;
                                    cursor: pointer;

                                    &:hover {
                                        background-color: rgba(0, 0, 0, 0.5);
                                        color: white;
                                    }
                                `
                                } ><span onClick={(e) => releasePoke(e, d)}><small>release</small></span></label>
                                <div css={css`background-color: ${d.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name}; ${gstyle.cardColorFoot}`}></div>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}
 
export default MyPoke;