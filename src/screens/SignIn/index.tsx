import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessTokenPS, setIdUser, setUsername } from '../../redux/slice';

export function SignIn({ navigation }: any) {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  let id = 0;
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
    if (username) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://192.168.1.13:3000/user/id/${username}`);
          const userId = response.data;
          id = userId;
          console.log(`ID USER: ${userId}`);
          dispatch(setIdUser(id));
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      };

      fetchData();
    }
  }, [username]);

  useEffect(() => {
    console.log('ID user:', id);
  }, [id]);

  useEffect(() => {
    console.log('Nome do Usuário:', user.username);
  }, [user.username]);

  useEffect(() => {
    console.log('Access Token PS:', user.accessTokenPS);
  }, [user.accessTokenPS]);

  const handleSignIn = async () => {
    if (!isConnected) {
      Alert.alert(
        'Sem conexão com a Internet',
        'Por favor, verifique sua conexão com a Internet.',
      );
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.13:3000/auth/signin', {
        username: username,
        password: password,
      });

      console.log('Resposta da API:', response.data);
      //dispatch(setIdUser(id));
      dispatch(setUsername(response.data.username));
      dispatch(setAccessTokenPS(response.data.access_token));

      navigation.navigate('AlbumScreen', id);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert(
        'Erro ao fazer login',
        'Por favor, verifique suas credenciais e tente novamente.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.containerSignIn}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/signInLogo.png')}
          style={styles.imagem}
        />
      </View>
      <Text style={styles.title}>Bem-vindo ao PSFotos</Text>
      <Text style={styles.description}>
        Faça login na sua conta e não perca mais tempo
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
          Não tem uma conta?{' '}
          <Text
            style={styles.textColor}
            onPress={() => navigation.navigate('SignUp')}>
            Cadastre-se
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonSignIn} onPress={handleSignIn}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );


}
