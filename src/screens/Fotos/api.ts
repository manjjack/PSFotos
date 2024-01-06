import axios from 'axios';
import { CreateFatiaAlbumDto } from './CreateFatiaAlbumDto';

const BASE_URL = 'http://192.168.1.13:3000';



export const fetchParticipant = async (idUser:any, idAlbum:any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/participant/id/${idUser}/${idAlbum}`,
    );
    return response.data;
  } catch (error) {
    console.error('Erro na requisição Paticipant:', error);
    return null;
  }
};


export const fetchAuthorId = async (albumName:any) => {
  try {
    const response = await axios.get(`${BASE_URL}/album/authorId/${albumName}`);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição authorId:', error);
    return null; 
  }
};

export const createFatiaAlbum = async (data: CreateFatiaAlbumDto) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/fatia-album`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Resposta da criação de FatiaAlbum:', response.data);

    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
