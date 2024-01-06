
const BASE_URL = 'http://192.168.1.13:3000';

export const getUserIdByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/user/by-username?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user.idUser;
    } else {
      throw new Error(`Erro ao encontrar o usuário: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Erro ao encontrar o usuário: ${error.message}`);
  }
};

export const getAlbumIdByName = async (albumName) => {
  try {
    const response = await fetch(`${BASE_URL}/album/id/${albumName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Erro ao buscar o ID do álbum: ${error.message}`);
  }
};
