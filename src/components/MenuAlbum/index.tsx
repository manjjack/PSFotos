import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { House, SignOut, Images, User, ShareFat } from 'phosphor-react-native';
import { ModalA } from '../ModalA';
import { useState, useEffect } from 'react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import AddParticipant from '../../screens/AddParticipant';
import NetInfo from '@react-native-community/netinfo';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { createAlbum, findUserByUsername } from './api';

export function Menu({ navigation }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectModal, setSelectModal] = useState(0);
  const [foundUser, setFoundUser] = useState<any | null>(null);
 

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const nav = useNavigation();

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
    console.log('ID do Usuário:', user.idUser);
  }, [user.idUser]);

  return (
    <View style={styles.menuContainer}>
      <View style={styles.itemMenu}>
        <House size={24} color="#878787" />
        <Text style={styles.text}>Home</Text>
      </View>

      <TouchableOpacity onPress={() => {
        showModal()
        modal1()
      }}>
        <View style={styles.itemMenu}>
          <Images size={24} color="#878787" />
          <Text style={styles.text}>Álbuns</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        showModal()
        modal2()
      }}>
        <View style={styles.itemMenu}>
          <ShareFat size={24} color="#878787" />
          <Text style={styles.text}>Partilhar</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.itemMenu}>
        <User size={24} color="#878787" />
        <Text style={styles.text}>User</Text>
      </View>
      {escolherModal()}
    </View>
  );

  async function handleCreateAlbum(albumName: string) {
    console.log(`Criar álbum com o nome: ${albumName}`);
    await createAlbum(albumName, user.idUser, albumName);
    hideModal();
  }

  async function handleFindUser(username: string) {
    const foundUser = await findUserByUsername(username);
    setFoundUser(foundUser);

    if (foundUser) {
     // dispatch(setUser(foundUser.idUser));
      return (
        <NavigationContainer>
          <AddParticipant />
        </NavigationContainer>
      );
    }

    hideModal();
  }

  function escolherModal() {
    if (selectModal === 1) {
      return (
        <ModalA
          isVisible={isVisible}
          onClose={hideModal}
          onOk={handleCreateAlbum}
          title="Criar Album"
          placeh="Nome do Album"
        />
      );
    } else {
      return (
        <ModalA
          isVisible={isVisible}
          onClose={hideModal}
          onOk={handleFindUser}
          title="Encontrar Utilizador"
          placeh="Digite o nome de utilizador"
        />
      );
    }

    setSelectModal(0);
  }
}
