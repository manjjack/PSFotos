import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onOk: (value: string) => void; // Adicionado um callback para lidar com o valor do TextInput
  title: string;
  placeh: string;
}

export function ModalA({ isVisible, onClose, onOk, title, placeh }: ModalProps) {

  const [inputValue, setInputValue] = useState('');

  const handleOkPress = () => {
    onOk(inputValue); // Chama o callback passando o valor do TextInput
    onClose(); // Fecha o modal
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}> {title} </Text>
          <TextInput
            style={styles.input}
            placeholder={placeh}
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleOkPress}>
              <Text style={styles.textButton}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
