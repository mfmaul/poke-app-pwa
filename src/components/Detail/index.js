/** @jsxImportSource @emotion/react */
import { createContext, useContext, useCallback } from 'react';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gstyle from './styles';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import { writeCookies } from '../../utils/common';
import { DataContext } from '../App';
import Modal from '../../utils/modal';

const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache()
});

const detailQuery = gql`
    query samplePokeAPIquery($id: Int!) {
        pokemon_v2_pokemon_by_pk(id: $id) {
            id
            name
            height
            weight
            pokemon_v2_pokemonstats(order_by: {pokemon_v2_stat: {id: asc}}) {
                id
                base_stat
                pokemon_v2_stat {
                    name
                }
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                    id
                    name
                }
            }
            pokemon_v2_pokemonmoves(where: {order: {_is_null: false}}, distinct_on: move_id, order_by: {level: asc, move_id: asc}) {
                id
                move_id
                pokemon_id
                order
                version_group_id
                level
                pokemon_v2_move {
                    name
                    power   
                    pp
                    priority
                    pokemon_v2_type {
                        name
                    }
                    pokemon_v2_moveflavortexts(where: {language_id: {_eq: 9}, version_group_id: {_eq: 20}}) {
                        flavor_text
                    }
                }
            }
            pokemon_v2_pokemonspecy {
                generation_id
                pokemon_v2_pokemoncolor {
                    name
                }
                pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}, version_id: {_eq: 34}}) {
                    flavor_text
                    version_id
                }
            }
        }
  }
`

export const ModalContext = createContext(null);

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const myPoke = useCallback(() => navigate('/poke-app-pwa/my-poke'), [navigate]);
    const { mine, updateMine } = useContext(DataContext);

    const [ show, setShow ] = useState('none');
    const mod = {
        show: function () {
            setShow(show => 'block');
        },
        hide: function () {
            setShow(show => 'none');
        }
    };
    const windowModal = (e) => {
        if (e.target.id == 'theMod') mod.hide();
    }

    function submitNickname(e, data, nickname) {
        let findNickname = mine.mine.owned.find(function (d) { return d.nickname == nickname });
        if (findNickname) { return alert('nickname already exists. please change to another!') }
        let prep = mine;
        prep.mine.owned.push({
            id: data.pokemon_v2_pokemon_by_pk.id,
            nickname: nickname,
            name: data.pokemon_v2_pokemon_by_pk.name,
            pokemon_v2_pokemontypes: data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes,
            pokemon_v2_pokemonspecy: data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy,
        });
        prep.mine.total = prep.mine.owned.length;
        writeCookies(prep);
        updateMine();
        alert('success'); // harusnya modal sih
        mod.hide();
    }

    function pokeCatch(e, data) {
        e.preventDefault();
        let rng = Math.floor(Math.random()*2); // mungkin ini 50%?
        if (rng) {
            mod.show();
        } else {
            alert('failed');
        };
    }

    function GetData() {
        const { loading, error, data } = useQuery(detailQuery, {
            fetchPolicy: 'cache-first',
            variables: {
                id: id
            }
        });
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const modalStyles = css`
            background-color: ${gstyle.colorHex[data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name].val};
        `
        
        return (
            <div css={gstyle.row}>
                <div css={gstyle.details}>
                    <ModalContext.Provider value={{ show, mod, windowModal, modalStyles, submitNickname, data }}>
                        <Modal />
                    </ModalContext.Provider>
                    <div css={gstyle.catchDiv}>
                        <div css={gstyle.listRow}>
                            <div css={gstyle.detCol}>
                                
                                    <div css={css`
                                        padding: 1.5rem; 
                                        width: 100%;
                                        color: white; 
                                        font-size: 1.5em; 
                                        font-weight: bold;
                                        background-color: ${gstyle.colorHex[data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name].val};
                                        color: ${gstyle.colorHex[data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name].text};
                                        border: 1px solid;
                                        `} onClick={(e) => pokeCatch(e, data)}>
                                        Catch!
                                    </div>

                            </div>
                            <div css={gstyle.detCol}>
                                
                                    <div css={css`
                                        padding: 1.5rem; 
                                        width: 100%;
                                        color: white; 
                                        font-size: 1.5em; 
                                        font-weight: bold;
                                        background-color: white;
                                        color: black;
                                        border: 1px solid;
                                        `} onClick={myPoke}>
                                        My Poké!
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                    <div css={gstyle.row}>
                        <div css={gstyle.column}>
                            <div css={gstyle.card}>
                                <img css={gstyle.cardAvatar} src={'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' + data.pokemon_v2_pokemon_by_pk.id.toString().padStart(3, '0') + '.png'} alt={data.pokemon_v2_pokemon_by_pk.name} />
                                <div css={css`padding-top: 1rem; ${gstyle.listRow}`}>
                                {data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes.map(function (dd) {
                                    return (
                                        <label css={css`background-color: ${gstyle.typeColor[dd.pokemon_v2_type.name]}; ${gstyle.cardLink}`} key={dd.pokemon_v2_type.id} ><span onClick={(e) => e.stopPropagation()}>{dd.pokemon_v2_type.name}</span></label>
                                    );
                                })}
                                </div>
                            </div>
                        </div>
                        <div css={gstyle.detCol}>
                            <div css={gstyle.separator}></div>
                            <h1 css={css`text-transform: capitalize; width: 20rem; @media (max-width: 900px) { text-align: center; }`}>{data.pokemon_v2_pokemon_by_pk.name}</h1>
                            <small>owned: {mine.mine.owned.filter(function (mmo) { return mmo.id == data.pokemon_v2_pokemon_by_pk.id }).length}</small>
                            <p css={css`@media (max-width: 900px) { text-align: center; }`}>{data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0] ? data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text : ''}</p>
                            <div css={gstyle.separator}></div>
                            {data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats.map(function (dd) {
                                return (
                                    <div css={css`width: 100%`} key={dd.id}>
                                        <p css={css`text-transform: capitalize; width: 100%; @media (max-width: 900px) { text-align: center; }`}>{dd.pokemon_v2_stat.name}</p>
                                        <div css={gstyle.statContainer}>
                                            <div css={css`
                                                width: ${dd.base_stat/255*20}rem;
                                                background-color: ${gstyle.colorHex[data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name].val};
                                                color: ${gstyle.colorHex[data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name].text};
                                                padding-top: .8rem;
                                                padding-bottom: .8rem;
                                                border-radius: .5rem;
                                                border: 1px solid;
                                                @media (max-width: 900px) {
                                                    margin: auto;
                                                }
                                            `}></div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>
                    <div css={gstyle.separator}></div>
                    <div css={gstyle.row}>
                        <div css={gstyle.column}>
                            <table css={css`
                                overflow-x: auto; 
                                td, th { 
                                    padding: .5rem; 
                                }
                                td {
                                    border-top: 1px solid black;
                                }
                            `}>
                                <thead>
                                    <tr>
                                        <th css={css`text-align: left;`}>Moves</th>
                                        <th css={css`border-left: 1px solid black; `}>Level</th>
                                        <th css={css`border-left: 1px solid black; `}>Type</th>
                                        <th css={css`border-left: 1px solid black; text-align: left;`}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonmoves.map(function (d) {
                                        return (
                                            <tr key={d.id}>
                                                <td css={css`text-transform: capitalize;`}>{d.pokemon_v2_move.name}</td>
                                                <td css={css`border-left: 1px solid black; ${gstyle.textCenter}`}>{d.level}</td>
                                                <td css={css`border-left: 1px solid black; ${gstyle.textCenter}`}>
                                                    <label css={css`background-color: ${gstyle.typeColor[d.pokemon_v2_move.pokemon_v2_type.name]}; font-size: .5rem; ${gstyle.cardLink}`} >{d.pokemon_v2_move.pokemon_v2_type.name}</label>
                                                </td>
                                                <td css={css`border-left: 1px solid black;`}>{d.pokemon_v2_move.pokemon_v2_moveflavortexts[0] ? d.pokemon_v2_move.pokemon_v2_moveflavortexts[0].flavor_text : ''}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div css={css`height: 5rem;`}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ApolloProvider client={client}>
            <GetData />
        </ApolloProvider>
    )
}
 
export default Detail;