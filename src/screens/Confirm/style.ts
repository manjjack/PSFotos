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
        color:'green',
        fontSize: 15,
      },    
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        padding: 8,
        marginBottom: 20,
        color: 'rgba(0, 0, 0, 0.5)',
        top:20
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 200,
        height: 60,
        padding: 10,
        alignItems:'center',
        left:'8%'
      },
      button:{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          width: 100,
          padding: 10,
          height: 50,
          borderRadius: 20,
          textAlign: 'center',
          alignItems: 'center',
          margin: 10
          
      },
      textButton:{
        fontSize: 17,
        textAlign: 'center',
        alignItems: 'center',
        color:'rgba(0, 0, 0, 0.5)'
        
      }

     
});
