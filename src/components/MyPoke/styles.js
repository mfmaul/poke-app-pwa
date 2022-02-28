/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const gstyle = {
    filter: css`
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        flex: 1;
        align-items: center;
        @media (max-width: 900px) {
            justify-content: center;
        }
    `,
    listRow: css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
    `,
    row: css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        @media (max-width: 900px) {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
        }
    `,
    column: css`
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        flex: 5;
        align-items: center;
        @media (max-width: 900px) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
        }
    `,
    card: css`
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 15rem auto;
        height: 16.5rem;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.19), 0 2px 2px rgba(0, 0, 0, 0.23);
        border-radius: 10px;
        margin: .3rem;
        overflow: hidden;
        cursor: pointer;
    `,
    cardAvatar: css`
        width: 100%;
        height: 10rem;
        object-fit: cover;
    `,
    cardTitle: css`
        color: #222;
        font-weight: 700;
        text-transform: capitalize;
        font-size: 1.1rem;
        margin-top: 0.5rem;
    `,
    cardLink: css`
        font-size: 0.8rem;
        text-decoration: none;
        // background: #858b94;
        color: #fff;
        padding: 0.3rem 1rem;
        border-radius: 20px;
        text-transform: capitalize;
    `,
    cardColorFoot: css`
        height: 16px;
        width: 100%;
        margin-top: 0.3rem;
        border: 1px solid;
    `,
    typeColor: {
        normal: '#5DDDBE',
        fighting: '#9D3973',
        flying: '#E3359A',
        poison: '#0A5415',
        ground: '#98E5CE',
        rock: '#8D91AD',
        bug: '#551F65',
        ghost: '#FFFFFF',
        steel: '#83C1CA',
        fire: '#E43A27',
        water: '#227C9C',
        grass: '#49F127',
        electric: '#46DFF1',
        psychic: '#CEE982',
        ice: '#E0F7FA',
        dragon: '#EDB4C7',
        dark: '#313955',
        fairy: '#E38F19',
        unknown: '#DCDAE9',
        shadow: '#8431B1',
    }
}

export default gstyle;