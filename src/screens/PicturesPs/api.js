import axios from 'axios';

const BASE_URL = 'http://192.168.1.13:3000';

// recebe o nome do album e transform em id

export const fetchAlbumId = async (albumName) => {
    try {
      const response = await axios.get(`${BASE_URL}/album/id/${albumName}`);
      return response.data;
    } catch (error) {
      console.error('Erro na requisição AlbumId:', error);
      return null; 
    }
  };

  //recebe o id do album e retora os id onde ele participa

  export const fetchParticipantIdsByAlbumId = async(idAlbum) => {
    try {
      const response = await axios.get(`${BASE_URL}/participant/participants/${idAlbum}`);
      return response.data;
    } catch (error) {
      console.error('Erro na requisição partic :', error);
      throw error;
    }

  };

  // recebe o id o participante e retorna os id fatia album onde participa
  export const fetchidFatiaAlbumbyIdParticipant = async (idP) => {
    try {
      const response = await axios.get(`${BASE_URL}/fatia-album/idf/${idP}`);
      return response.data;
    } catch (error) {
      console.error('Erro na requisição idF:', error);
      throw error;
    }
  };

  // recebe o id o proprietario e retorna os id fatia album onde participa
  export const fetchidFatiaAlbumbyIdProp = async (idP) => {
    try {
      const response = await axios.get(`${BASE_URL}/fatia-album/idprop/${idP}`);
      return response.data;
    } catch (error) {
      console.error('Erro na requisição idF:', error);
      throw error;
    }
  };
  
  // recebe o idF e retorna as url 
  export const fetchurlFatiaAlbum = async (idF) => {
    try {
      const response = await axios.get(`${BASE_URL}/fatia-album/url/${idF}`);
      return response.data;
    } catch (error) {
      console.error('Erro na requisição url2 :', error);
      throw error;
    }
  };

