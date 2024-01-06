import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import styles from './style'
import { useRoute } from '@react-navigation/native';
import { launchImageLibrary } from "react-native-image-picker";
import {
  fetchurlFatiaAlbum, fetchidFatiaAlbumbyIdProp
} from './api';

import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';

export default function PicturesPs({ navigation }: any) {

  const [url, setUrl] = useState([]);
  const [url2, setUrl2] = useState([]);
  const user = useSelector((state: RootState) => state.user);

  const route = useRoute();
  const { params } = route;
  const { albumName }: any = params;


  useEffect(() => {

    const fetchData = async () => {

      try {
        const urlFatiaAlbumResponse = await fetchurlFatiaAlbum(albumName);
        setUrl(urlFatiaAlbumResponse);
        console.log('url: ', url);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }

    };

    fetchData();
  },);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AlbumScreen')}>
          <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('AddParticipant', { albumName })}>
          <Text style={styles.text}>Add Participante</Text>
        </TouchableOpacity>
      </View>
      { }
      <View>
        <Text style={styles.text1}>{albumName}</Text>
      </View>
      <FlatList
        data={url}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item }} style={styles.itemImage} />
          </View>
        )}
      />
      {/*
      <FlatList
        data={url2}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item }} style={styles.itemImage} />
          </View>
        )}  />*/}


    </View>
  );

}