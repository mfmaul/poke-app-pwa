/** @jsxImportSource @emotion/react */
import { useContext, useCallback } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetCookies } from '../../utils/common';
import gstyle from './styles';
import { DataContext } from '../App';

const SearchBar = () => {

    const navigate = useNavigate();
    const myPoke = useCallback(() => navigate('/poke-app-pwa/my-poke'), [navigate]);
    // const home = useCallback(() => navigate('/poke-app-pwa'), [navigate]);
    const { updateMine } = useContext(DataContext);
    const [ SearchParams, setSearchParams ] = useSearchParams();

    const resetData = () => {
        resetCookies();
        updateMine();
        setSearchParams({});
        console.log(SearchParams);
    }

    return (
        <div css={gstyle.topDiv}>
            <div css={css`
                border: 1px solid black;
                align-items: center;
                ${gstyle.listRow}
                `}>
                <img css={css`margin: auto 1rem; height: 3rem; width: auto;`} src="https://img.icons8.com/material-outlined/384/000000/home--v2.png" onClick={() => navigate(-1)} alt={'back-home'} />
                <div css={gstyle.separatorVertical}></div>
                <h2 css={css`margin: auto 1rem;`}>Pokemons</h2>
                <div>
                    <p css={css`
                        font-size: 0.8rem;
                        text-decoration: none;
                        background: #fccf00;
                        color: #2468b1;
                        padding: 0.3rem 1rem;
                        border-radius: 20px;
                    `} onClick={myPoke}>My Poké!</p>
                </div>
                <div css={css`margin-left: 2rem`}>
                    <p css={css`
                        font-size: 0.8rem;
                        text-decoration: none;
                        background: red;
                        color: white;
                        padding: 0.2rem .5rem;
                        border-radius: 20px;
                    `} onClick={resetData}><small>Reset</small></p>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;