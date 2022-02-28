/** @jsxImportSource @emotion/react */
import React, { createContext, useCallback, useContext } from 'react';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

let filters = {
    gen: {
        params: '$genId: [Int!]',
        query: 'generation_id: {_in: $genId}'
    },
    color: {
        params: '$colorId: [Int!]',
        query: 'pokemon_v2_pokemoncolor: {id: {_in: $colorId}}'
    },
    type: {
        params: '$typeId: [Int!]',
        query: 'pokemon_v2_pokemontypes: {pokemon_v2_type: {id: {_in: $typeId}}},'
    }
}

let filters_params = [];
let filters_query_specy = [];
let filters_query_types = [];

const setListQuery = () => {
    let paramsQuery = `
        ${filters_params.length > 0 ? '' + '(' + filters_params.join(',') + ')' : ''}
    `;
    let whereQuery = `, where: {
        _and: {

            pokemon_v2_pokemonspecy: {
                ${filters_query_specy.join(',')}
            },
            ${filters_query_types.join(',')}
        }
    }`;
    let listQuery = gql`
        query samplePokeAPIquery ${paramsQuery} {
            pokemon_v2_pokemon(limit: 20${whereQuery}, order_by: {id: asc}) {
                id
                name
                pokemon_v2_pokemonspecy {
                    generation_id
                    pokemon_v2_pokemoncolor {
                        id
                        name
                    }
                }
                pokemon_v2_pokemontypes {
                    pokemon_v2_type {
                        id
                        name
                    }
                }
            }
        }
    `;
    return listQuery;
}

let inData = {
    genId: [],
    colorId: [],
    typeId: []
}

const FilterContext = createContext(null);

const List = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const cardClick = useCallback((id) => navigate('/' + id + '/detail'), [navigate]);
    const { mine, updateMine } = useContext(DataContext);
    const [Query, setQuery] = useState(setListQuery());
    const [show, setShow] = useState('none')

    function filterClick() {
        setShow(show => show == 'none' ? 'block' : 'none');
    }
    const windowFilter = (e) => {
        if (e.target.id == 'filter-modal') filterClick();
    }

    let ref = function () {};
    let uq = null;
    let qss = {};

    const setFilters = (type) => {
        let filters_type = type.replace('Id', '');
        filters_params = filters_params.filter(function (d) { return d != filters[filters_type].params });
        if (filters_type == 'gen' || filters_type == 'color') {
            filters_query_specy = filters_query_specy.filter(function (d) { return d != filters[filters_type].query });
        } else {
            filters_query_types = filters_query_types.filter(function (d) { return d != filters[filters_type].query });
        }
        if (inData[type].length > 0) {
            filters_params.push(filters[filters_type].params);
            if (filters_type == 'gen' || filters_type == 'color') {
                filters_query_specy.push(filters[filters_type].query);
            } else {
                filters_query_types.push(filters[filters_type].query);
            }
        }
    } 

    inData.genId = searchParams.get('genId') ? searchParams.get('genId').toString().split(',') : [];
    inData.colorId = searchParams.get('colorId') ? searchParams.get('colorId').toString().split(',') : [];
    inData.typeId = searchParams.get('typeId') ? searchParams.get('typeId').toString().split(',') : [];
    setFilters('genId');
    setFilters('colorId');
    setFilters('typeId');

    const onChangeChk = (e, type, val) => {
        inData[type] = inData[type].filter(function (d) { return d != val });
        if (e.target.checked) {
            inData[type].push(val);
        }

        setFilters(type);

        
        console.log(filters_params);
        console.log(filters_query_specy);
        console.log(filters_query_types);
        console.log(inData);
        ref();
        setQueryString();
    }

    const setQueryString = () => {
        qss = {
            genId: inData['genId'].join(','),
            colorId: inData['colorId'].join(','),
            typeId: inData['typeId'].join(','),
        };
        if (!qss['genId']) delete qss['genId'];
        if (!qss['colorId']) delete qss['colorId'];
        if (!qss['typeId']) delete qss['typeId'];
        setSearchParams(qss);
    }

    function GetFilterData() {
        const { loading, error, data } = useQuery(mastersQuery, {fetchPolicy: 'cache-first'});
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        
        return (
            <div css={gstyle.filter}>
                <div css={css`${gstyle.separator}; width: 40%; height: 3px; border-radius: .5rem;`}></div>
                <div css={gstyle.separator}></div>
                <div><label>Generation</label></div>
                <div css={gstyle.separator}></div>
                <div>
                    {data.generations.map(function (d) {
                        return (
                            <div key={d.id}> 
                                <label css={css`text-transform: uppercase;`}>
                                    <input type="checkbox" defaultChecked={inData['genId'].find(function (dd) { return dd == d.id })} onChange={(e) => onChangeChk(e, 'genId', d.id)} /> {d.name}
                                </label> 
                            </div>
                        )
                    })}
                </div>

                <div css={gstyle.separator}></div>
    
                <div><label>Type</label></div>
                <div css={gstyle.separator}></div>
                <div>
                    {data.pokemon_v2_type.map(function (d) {
                        return (
                            <div key={d.id}> 
                                <label css={css`text-transform: capitalize;`}>
                                    <input type="checkbox" defaultChecked={inData['typeId'].find(function (dd) { return dd == d.id })} onChange={(e) => onChangeChk(e, 'typeId', d.id)} /> {d.name}
                                </label> 
                            </div>
                        )
                    })}
                </div>

                <div css={gstyle.separator}></div>
    
                <div><label>Color</label></div>
                <div css={gstyle.separator}></div>
                <div>
                    {data.pokemon_v2_pokemoncolor.map(function (d) {
                        return (
                            <div key={d.id}> 
                                <label css={css`text-transform: capitalize;`}>
                                    <input type="checkbox" defaultChecked={inData['colorId'].find(function (dd) { return dd == d.id })} onChange={(e) => onChangeChk(e, 'colorId', d.id)} /> {d.name}
                                </label> 
                            </div>
                        )
                    })}
                </div>
                <div css={gstyle.separator}></div>
            </div>
        );
    }
    
    function GetData() {
        try {
            setQuery(Query => setListQuery());
        } catch (e) {
            
        }
        const { loading, error, data, refetch, updateQuery } = useQuery(Query, {
            variables: inData
        });
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        
        ref = refetch;
        uq = updateQuery;
    
        return (
            <div css={gstyle.column}>
                
                <div css={gstyle.listRow}>
                    {data.pokemon_v2_pokemon.map(function (d) {
                        let link_url = '/' + d.id + '/detail'
                        return (
                            <div css={gstyle.card} key={d.id} onClick={() => cardClick(d.id)}>
                                <img css={gstyle.cardAvatar} src={'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' + d.id.toString().padStart(3, '0') + '.png'} />
                                <h1 css={gstyle.cardTitle} onClick={(e) => e.stopPropagation()} >{d.name}</h1>
                                <small onClick={(e) => e.stopPropagation()} >owned: {mine.mine.owned.filter(function (mmo) { return mmo.id == d.id }).length}</small>
                                <div css={gstyle.listRow}>
                                {d.pokemon_v2_pokemontypes.map(function (dd) {
                                    return (
                                        <label css={css`background-color: ${gstyle.typeColor[dd.pokemon_v2_type.name]}; ${gstyle.cardLink}`} key={dd.pokemon_v2_type.id} ><span onClick={(e) => e.stopPropagation()}>{dd.pokemon_v2_type.name}</span></label>
                                    );
                                })}
                                </div>
                                <div css={css`background-color: ${d.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name}; ${gstyle.cardColorFoot}`}></div>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        )
    }

    return (
        <ApolloProvider client={client}>
            <FilterContext.Provider value={{ show, filterClick }}>
            <div css={gstyle.row}>
                <div id={'dedlen-content'} css={css`text-align: center; text-align: -webkit-center; @media (min-width: 900px) { margin-left: 1rem; }`}>
                    <div css={css`
                        width: 100%;
                        padding: .5rem;
                        border: 1px solid black;
                        @media (min-width: 900px) {
                            display: none;
                        }
                    `}>
                        <div css={css`
                            align-items: center;
                            text-align: center;
                            background-color: white;
                            color: black;
                            width: 50%;
                            height: auto;
                            border: 1px solid black;
                            border-radius: 1rem;
                            &:hover {
                                background-color: rgba(0, 0, 0, 0.5);
                            }
                            cursor: pointer;
                        `} onClick={filterClick}>
                            Filters
                        </div>
                    </div>
                    <div css={css`${gstyle.separator}; @media (min-width: 900px) { display: none; }`}></div>
                    <div css={css`
                        ${gstyle.filterContent}; 
                        display: block;
                        @media (max-width: 900px) {
                            display: ${show};
                        }
                    `} onClick={(e) => windowFilter(e)} id={'filter-modal'}>
                        <GetFilterData />
                    </div>
                </div>
                <GetData />
            </div>
            </FilterContext.Provider>
        </ApolloProvider>
    )
}
 
export default List;