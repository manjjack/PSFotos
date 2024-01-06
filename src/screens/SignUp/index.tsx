import React, {useEffect, useId, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import axios from 'axios';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessTokenPS, setIdUser, setUsername } from '../../redux/slice';

export function SignUp({navigation}: any) {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log('ID do Usuário:', user.idUser);
  }, [user.idUser]);
  
  useEffect(() => {
    console.log('Nome do Usuário:', user.username);
  }, [user.username]);
  
  useEffect(() => {
    console.log('Access Token PS:', user.accessTokenPS);
  }, [user.accessTokenPS]);
  
  const handleSignUp = async () => {
    if (!isConnected) {
      Alert.alert(
        'Sem conexão com a Internet',
        'Por favor, verifique sua conexão com a Internet.',
      );
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.13:3000/auth/signup', {
        username: username,
        password: password,
      });

      console.log('Usuário registrado:', response.data);
        dispatch(setIdUser(response.data.idUser));
      dispatch(setUsername(response.data.username));
    

      navigation.navigate('AlbumScreen');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      Alert.alert(
        'Erro ao registrar',
        'Ocorreu um erro durante o registro. Tente novamente.',
      );
    }
  };
  return (
    <SafeAreaView style={styles.containerSignIn}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/image4.png')}
          style={styles.imagem}
        />
      </View>
      <Text style={styles.title}>Registre-se ao PSFotos</Text>
      <Text style={styles.description} numberOfLines={2}>
        Nós nos preocupamos com a segurança das suas informações.
      </Text>
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>Nome do usuário</Text>
        <TextInput
          placeholder="Digite o seu nome do usuário"
          style={styles.input}
          onChangeText={text => setUser(text)}
        />
        <Text style={styles.text}>Senha</Text>
        <TextInput
          placeholder="Digite a sua senha"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={text => setPassword(text)}
        />
        <Text style={styles.text}>
          Já possui uma conta?{' '}
          <Text
            style={styles.textColor}
            onPress={() => navigation.navigate('SignIn')}>
            Entre
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonSignIn} onPress={handleSignUp}>
        <Text style={styles.textButton}>Registrar-se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
