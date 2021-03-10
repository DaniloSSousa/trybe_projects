const d = () => {}; // Função sem uso, só para eliminar a escrita de vários 'exports'

const getElt = (query) => document.querySelector(query);

//  LS === Local Storage
const getLS = (key) => JSON.parse(localStorage.getItem(key));

const setLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));

//  SS === Session Storage
const getSS = (key) => JSON.parse(sessionStorage.getItem(key));

const setSS = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

export { d as default, getElt, getLS, setLS, getSS, setSS };
