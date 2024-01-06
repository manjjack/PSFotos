// apiService.js
const BASE_URL = 'http://192.168.1.13:3000';

export const createAlbum = async (albumName, authorId, catalog) => {
  try {
    const response = await fetch(`${BASE_URL}/album`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: albumName,
        authorId: authorId,
        catalog: catalog,
      }),
    });

    if (response.ok) {
      console.log('Álbum criado com sucesso!');
    } else {
      console.log('Erro ao criar o álbum:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao criar o álbum:', error);
  }
};

export const findUserByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/user/by-username?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const user = await response.json();
      console.log('Usuário encontrado:', user);
      return user;
    } else {
      console.log('Erro ao encontrar o usuário:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Erro ao encontrar o usuário:', error);
    return null;
  }
};
