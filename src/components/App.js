/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { writeCookies, readCookies } from '../utils/common';

import List from "./List/index";
import Detail from "./Detail/index";
import MyPoke from "./MyPoke/index";
import SearchBar from "./SearchBar/index";

import { css } from '@emotion/react';
import { createContext, useState } from "react";

const container = css`
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  margin-top: 4rem;
`

writeCookies();

export const DataContext = createContext(null);

function App() {
  const [ mine, setMine ] = useState(readCookies);
  function updateMine() {
    setMine(mine => readCookies());
  }

  return (
    <Router>
      <DataContext.Provider value={{ mine, updateMine }}>
      <SearchBar />
      <div css={container}>
        <Routes>
          <Route path="/poke-app-pwa" element={<List />} />
          <Route path="/poke-app-pwa/:id/detail" element={<Detail />} />
          <Route path="/poke-app-pwa/my-poke" element={<MyPoke />} />
        </Routes>
      </div>
      </DataContext.Provider>
    </Router>
  );
}

export default App;
