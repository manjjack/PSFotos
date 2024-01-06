import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import { createParticipant } from './api';

export default function Confirm({ navigation }: any) {

  const route = useRoute();
  const { params } = route;
  const { userId, albumId }: any = params;

  const [participantData, setParticipantData] = useState({
    idUserP: userId,
    idAlbumP: albumId,
  });

 

  useEffect(() => {
    setParticipantData({
      idUserP: userId,
      idAlbumP: albumId,
    });

    handleCreateParticipant();
  }, [userId, albumId]);

  const handleCreateParticipant = async () => {
    try {
      const success = await createParticipant(participantData);
      if (success) {
        console.log('Participante criado com sucesso!');
      } else {
        console.error('Erro ao criar participante');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AlbumScreen')}>
          <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Adicionado com sucesso</Text>
      </View>
    </View>
  );
}
