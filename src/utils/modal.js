/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../components/Detail/index';
import gstyle from '../components/Detail/styles';

// animation
const slideIn = keyframes`
    from {bottom: -300px; opacity: 0}
    to {bottom: 0; opacity: 1}
`

const fadeIn = keyframes`
    from {opacity: 0} 
    to {opacity: 1}
`

// w3school modal
const modal = css`
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    -webkit-animation-name: ${fadeIn}; /* Fade in the background */
    -webkit-animation-duration: 0.4s;
    animation-name: ${fadeIn};
    animation-duration: 0.4s
`
  
const modalContent = css`
    margin: 15% auto;
    background-color: #fefefe;
    width: 80%;
    -webkit-animation-name: ${slideIn};
    -webkit-animation-duration: 0.4s;
    animation-name: ${slideIn};
    animation-duration: 0.4s;
    @media (max-width: 900px) {
        margin: 60% auto;
    }
`

const close = css`
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;

    &:hover, &:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`
  
const modalHeader = css`
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
 `
  
const modalBody = css`padding: 2px 16px;`
  
const modalFooter = css`
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
`

const Modal = () => {
    const { show, mod, windowModal, modalStyles, submitNickname, data } = useContext(ModalContext);
    const [ nickname, setNickname ] = useState(data.pokemon_v2_pokemon_by_pk.name);

    return (
        // <div css={css`${modal}; display: ${show};`} onClick={windowModal} id={'theMod'}>
        <div css={css`${modal}; display: ${show};`} id={'theMod'}>

            <div css={modalContent}>
                <div css={css`${modalHeader}; ${modalStyles};`}>
                    <span css={close} onClick={mod.hide}>&times;</span>
                    <h2>Success! Give it a name!</h2>
                </div>
                <div css={modalBody}>
                    <div css={css`padding: 1rem; ${gstyle.detCol}`}>
                        <input css={css`text-align: center;`} type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
                        <div css={gstyle.separator}></div>
                        <button type="button" onClick={(e) => submitNickname(e, data, nickname)}>Submit</button>
                    </div>
                </div>
                <div css={css`${modalFooter}; ${modalStyles};`}>
                    
                </div>
            </div>

        </div>
    )
}

export default Modal;