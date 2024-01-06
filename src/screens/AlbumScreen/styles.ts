import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    marginLeft: 47,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 25,
    color: 'blue',
  },

  textFotos: {
    marginHorizontal: 13,
    color: 'black',
    fontSize: 25,
  },
  scrollView: {
    flexDirection: 'row',
    
  },
  item: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    alignItems:'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },

  albumText: {
    flexDirection: 'row',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    alignItems:'center',
    top:'50%'
  },
  menuPosition:{
    marginTop: '44%'
  },
  albunsCap:{
    width: 100,
    height:110,
    padding: 10,
    backgroundColor: 'gray'
  },
  part:{
    color: 'gray',
    fontSize: 12,
    textAlign:'center'
  }
 

 
});
