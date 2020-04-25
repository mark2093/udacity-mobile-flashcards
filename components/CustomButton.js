import React from 'react';

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { textGray, white, darkGray, black } from '../utils/colors';

export default function CustomButton({ children, onPress, txtStyle = {} }) {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.btnText, txtStyle]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    
    alignItems: 'center',
     marginBottom: 20
  },
  
  btnText: {
    fontSize: 20
  }
});

