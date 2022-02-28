/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const gstyle = {
    detCol: css`
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        flex: 1;
        @media (max-width: 900px) {
            align-items: center;
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
            align-items: center;
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

    statContainer: css`
        width: 100%;
        padding-bottom: .3rem;
    `,

    details: css`
        display: flex;
        align-items: center;
        flex-direction: column;
        background: #fff;
        margin: .3rem;
        // overflow: hidden;
    `,

    detailsImg: css`
        width: 100%;
        height: 20rem;
        object-fit: cover;
    `,

    textCenter: css`
        text-align: center;
        vertical-align: middle;
    `,
    separator: css`
        border: 0;
        clear: both;
        display: block;
        width: 100%;
        background-color: #cfcfcf;
        height: 1px;
        margin-top: .5rem;
        margin-bottom: .5rem;
    `,
    
    catchDiv: css`
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: white;
        text-align: center;
    `,

    card: css`
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 23rem;
        background: #fff;
        margin: .3rem;
        overflow: hidden;
        @media (max-width: 900px) {
            height: 18rem;
        }
    `,
    cardAvatar: css`
        width: 100%;
        height: 20rem;
        object-fit: cover;
        @media (max-width: 900px) {
            height: 15rem;
        }
    `,
    cardTitle: css`
        color: #222;
        font-weight: 700;
        text-transform: capitalize;
        font-size: 1.1rem;
        margin-top: 0.5rem;
    `,
    cardLink: css`
        font-size: 1rem;
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
    },
    colorHex: {
        black: {
            val: 'rgba(0, 0, 0, 0.6)',
            text: 'white'
        },
        blue: {
            val: 'rgba(0, 0, 255, 0.6)',
            text: 'white'
        },
        brown: {
            val: 'rgba(165, 42, 42, 0.6)',
            text: 'white'
        },
        gray: {
            val: 'rgba(128, 128, 128, 0.6)',
            text: 'white'
        },
        green: {
            val: 'rgba(0, 128, 0, 0.6)',
            text: 'white'
        },
        pink: {
            val: 'rgba(255, 192, 203, 0.6)',
            text: 'black'
        },
        purple: {
            val: 'rgba(128, 0, 128, 0.6)',
            text: 'white'
        },
        red: {
            val: 'rgba(255, 0, 0, 0.6)',
            text: 'white'
        },
        white: {
            val: 'rgba(255, 255, 255, 0.6)',
            text: 'black'
        },
        yellow: {
            val: 'rgba(255, 255, 0, 0.6)',
            text: 'black'
        },
    },
}

export default gstyle;