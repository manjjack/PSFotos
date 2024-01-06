import React, { useState, useEffect } from 'react';
import { SafeAreaView, PermissionsAndroid, Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import styles from './styles';
import { Menu } from '../../components/MenuAlbum';
import { BtnAdd } from '../../components/BtnAdd';
import { launchImageLibrary, launchCamera, MediaType, CameraOptions } from 'react-native-image-picker';
import { fetchParticipant, createFatiaAlbum, fetchAuthorId } from './api';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { CreateFatiaAlbumDto } from './CreateFatiaAlbumDto';
import { Alert } from 'react-native';

export function Fotos({ navigation }: any) {

  const [result, setResult] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [cameraPhoto, setCameraPhoto] = useState<string | undefined>(undefined);
  const [galleryPhoto, setGalleryPhoto] = useState<string | undefined>(undefined);


  const options: CameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo' as MediaType,
  };
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log('Com distpach', user.idUser);
  }, []);

  const fetchData = async () => {
    const idUser = user.idUser; // ID de usuário
    const albumName = inputValue; // Nome do álbum

    try {
      const response = await fetchParticipant(idUser, albumName);
      setResult(response);
      console.log('Parti:', result)
      console.log('Parti:', result)
    } catch (error) {
      console.error('Erro na requisição:');
      setResult(null);
    }
  };

  const getAuthorId = async () => {
    const albumName = inputValue;

    try {
      const response = await fetchAuthorId(albumName);
      setAuthorId(response);
      console.log('authorid: ', authorId);
    } catch (error) {
      console.error('Erro na requisição:', error);

    }
  }

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera(options);
        if (result.assets && result.assets.length > 0 && !result.didCancel) {
          setCameraPhoto(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error('Erro ao abrir a câmera:', error);
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        setGalleryPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao abrir a galeria:', error);
    }
  };

  useEffect(() => {
    if (galleryPhoto) {
      console.log('Image URI:', galleryPhoto);
    }
  }, [galleryPhoto]);

  useEffect(() => {
    if (user.idUser == authorId) {
      setResult(null);
    }
  }, []);

  const FatiaAlbum: CreateFatiaAlbumDto = {
    urlCatalogo: galleryPhoto,
    idParticipant: Number(result),
    idProprietario: Number(authorId),
  };
  const handleCreateFatia = async () => {
    const url = String(galleryPhoto);
    const idPart = Number(result);
    const idProp = Number(authorId);

    try {
      const data = await createFatiaAlbum(FatiaAlbum);
      console.log('Fatia Album created:', data);
      Alert.alert('Fatia Album created');

    } catch (error) {
      console.error('Erro ao criar fatia de álbum:', error);
    }
  };

  useEffect(() => {
    console.log('idP:', result);
    console.log('authorid:', authorId)
    return () => { };
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MagnifyingGlass />
        <Text style={styles.text} onPress={() => navigation.navigate('Fotos')}>
          Fotos
        </Text>
        <Text style={styles.textFotos} onPress={() => navigation.navigate('AlbumScreen')}>
          Álbuns
        </Text>
      </View>

      <View style={{ height: '74%' }}>
        <Button onPress={openCamera} title="Abrir Câmera" color="blue" />
        {cameraPhoto && <Image source={{ uri: cameraPhoto }} style={{ width: 200, height: 200, alignItems: 'center', display: 'flex' }} />}
        <Text></Text>
        <Button onPress={openGallery} title="Abrir Galeria" color="blue" />
        {galleryPhoto && (
          <>
            <Image
              source={{ uri: galleryPhoto }}
              style={{ width: 200, height: 200, alignItems: 'center', display: 'flex' }}
            />

            <TextInput
              placeholder="Album"
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              style={{ borderWidth: 1, padding: 8, marginVertical: 10, color: 'black' }}

            />
            <TouchableOpacity
              onPress={() => {
                console.log('Botão pressionado!');
                getAuthorId();
                fetchData();
              }}
              style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Verificar Album</Text>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity onPress={handleCreateFatia}>
              <Text style={{ color: 'white', textAlign: 'center', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Guardar Foto</Text>
            </TouchableOpacity>
          </>

        )}
      </View>

      <View>
        <TouchableOpacity>
          <BtnAdd />

        </TouchableOpacity>
      </View>

      <View style={styles.menuPosition}>
        <Menu style={{ height: '78%', margin: 580 }} />
      </View>
    </SafeAreaView>
  );
}

