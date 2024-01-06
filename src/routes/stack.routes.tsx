import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { AlbumInformation } from '../screens/AlbumInformation';
import { AlbumScreen } from '../screens/AlbumScreen';
import { Auth } from '../screens/Auth';

import PicturesPs from '../screens/PicturesPs';
import { Fotos } from '../screens/Fotos';
import AddParticipant from '../screens/AddParticipant';
import Confirm from '../screens/Confirm';


const { Screen, Navigator } = createNativeStackNavigator();

export function StackRouter() {
  return (
    <Navigator>
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Screen name='Auth' component={Auth} options={{ headerShown: false }}/>
      <Screen
        name="AlbumInformation"
        component={AlbumInformation}
        options={{ headerShown: false }}
      />

      <Screen name="AlbumScreen" component={AlbumScreen} options={{ headerShown: false }} />
      <Screen name="Confirm" component={Confirm} options={{ headerShown: false }} />
      <Screen name="PicturesPs" component={PicturesPs} options={{ headerShown: false }} />
      <Screen name="Fotos" component={Fotos} options={{ headerShown: false }} />
      <Screen name="AddParticipant" component={AddParticipant} options={{ headerShown: false }} />
      

    </Navigator>

  );
}
