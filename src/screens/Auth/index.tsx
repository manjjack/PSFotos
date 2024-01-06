import React, {useState} from 'react';
import {SafeAreaView, Text, View, Alert, Button} from 'react-native';
import {WebView} from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';

export function Auth({navigation}: any) {
  const customUserAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';
  const handleMessage = (event: any) => {
    const dataFromWebView = event.nativeEvent.data;

    const accessToken = dataFromWebView.accessToken;
    console.log(accessToken)

    if (accessToken !== null || undefined) {
      navigation.navigate('AlbumScreen');
    } else {
      navigation.navigate('SignIn');
    }
  };

  return (
    <WebView
      source={{uri: 'http://192.168.1.134:3000/'}}
      style={{flex: 1}}
      onMessage={handleMessage}
      userAgent={customUserAgent}
    />
  );
}
