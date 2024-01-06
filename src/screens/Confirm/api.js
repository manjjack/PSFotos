
const BASE_URL = 'http://192.168.1.13:3000';

export const createParticipant = async (participantData) => {
  try {
    const response = await fetch(`${BASE_URL}/participant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(participantData),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error(`Erro ao criar participante: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Erro ao criar participante: ${error.message}`);
  }
};
