
import axios from 'axios';

const BASE_URL = 'http://192.168.1.13:3000';

export const fetchAlbums = async (authorId) => {
  try {
    const response = await axios.get(`${BASE_URL}/album/album-authorId/${authorId}`);

    if (response.status !== 200) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Erro ao fazer a requisição: ${error.message}`);
  }

  
};

export const fetchAlbumIdsByUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/participant/albums/${userId}`);

    if (response.status !== 200) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Erro ao fazer a requisição: ${error.message}`);
  }
};

export const fetchAlbumNameById = async (albumId) => {
  try {
    const response = await axios.get(`${BASE_URL}/album/name/${albumId}`);

    if (response.status !== 200) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Erro ao fazer a requisição: ${error.message}`);
  }
};
