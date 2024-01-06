import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import styles from './styles';
import { Menu } from '../../components/MenuAlbum';
import { fetchAlbums, fetchAlbumIdsByUser, fetchAlbumNameById } from './api';
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';


export function AlbumScreen({ navigation }: any) {
  const [albumData, setAlbumData] = useState([]);
  const [albumIds, setAlbumIds] = useState<number[]>([]);
  const [albumNames, setAlbumNames] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.user);

  const handleImagePress = (albumName: string) => {
    console.log(albumName);
    navigation.navigate('PicturesPs', { albumName });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAlbums(user.idUser);
        setAlbumData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const ids = await fetchAlbumIdsByUser(user.idUser);
        setAlbumIds(ids);

        const names = await Promise.all(ids.map((id: any) => fetchAlbumNameById(id)));
        setAlbumNames(names);
      } catch (error) {
        console.error('Erro ao obter dados dos álbuns:', error);
      }
    };

    fetchAlbumData();
  }, [user.idUser]);


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MagnifyingGlass />
        <Text style={styles.textFotos} onPress={() => navigation.navigate('Fotos')}>Fotos</Text>
        <Text style={styles.text} onPress={() => navigation.navigate('AlbumScreen')}>Álbuns </Text>
      </View>

      <FlatList
        data={albumData}
        numColumns={2}
        style={{ height: '39%' }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleImagePress(item)}
          >
            <View style={styles.albunsCap}>
              <Text style={styles.albumText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.part}>Albuns em que participa</Text>
      <FlatList
        data={albumNames}
        numColumns={2}
        style={{ height: '38%' }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleImagePress(item)}
          >
            <View style={styles.albunsCap}>
              <Text style={styles.albumText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.menuPosition}>
        <Menu style={{ height: '74%', margin: 550 }} />
      </View>
    </SafeAreaView>
  );
}
