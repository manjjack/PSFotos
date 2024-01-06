import {StyleSheet} from 'react-native';

export default StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        },
      text:{
        color:'blue',
        fontSize: 15,
      },
      text1:{
        color:'blue',
        fontSize: 20,
        fontFamily: 'Calibre',
        textAlign: 'center',
      },
      itemContainer: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
      },
      itemImage: {
        width: '100%',
        height: 150, // Ajuste a altura conforme necessário
        resizeMode: 'cover',
      },

     
});
