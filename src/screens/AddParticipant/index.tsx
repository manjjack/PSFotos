import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { ModalA } from '../../components/ModalA';
import { getUserIdByUsername, getAlbumIdByName } from './api';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';

export default function AddParticipant({ navigation }: any) {

  const [isVisible, setIsVisible] = useState(false);
  const [selectModal, setSelectModal] = useState(0);
  const [valor, setValor] = useState('');
  const route = useRoute();
  const { params } = route;
  const { albumName }: any = params;
  const [albumId, setAlbumId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.user);

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const modal1 = () => {
    setSelectModal(1);
  };

  const modal2 = () => {
    setSelectModal(2);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const albumIdData = await getAlbumIdByName(albumName);
        setAlbumId(albumIdData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [albumName]);


  const handleChange = (text: any) => {
    setValor(text);
  };


  const renderModal = () => {
    if (isVisible) {
      return (
        <ModalA
          isVisible={isVisible}
          onClose={hideModal}
          onOk={() => navigation.navigate('Confirm', { userId, albumId })}
          title="Verificar"
          placeh={valor}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AlbumScreen')}>
          <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.text}></Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="username"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={valor}
        onChangeText={handleChange}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleFindUser(String(valor))}>
          <Text style={styles.textButton}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {renderModal()}
    </View>
  );

  
  async function handleFindUser(username: string) {
    try {
      const userIdData = await getUserIdByUsername(username);
      console.log('Usuário encontrado:', username);
      setUserId(userIdData);
      console.log('userid:', userId)
      console.log('albumid', albumId);
      showModal();
    } catch (error) {
      console.error('Erro ao encontrar o usuário:', error);
      Alert.alert(`Erro ao encontrar o usuário: ${error}`);
    }
  }

  
}