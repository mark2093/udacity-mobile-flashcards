import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { white, darkGray, gray } from '../utils/colors';

export default function CustomTouch({
  children,
  onPress,
  btnStyle = {},
  txtStyle = {},
  disabled = false
}) {
  const disabledButton = disabled ? styles.btnDisabled : {};
  const disabledButtonText = disabled ? styles.btnTextDisabled : {};
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={[styles.btn, btnStyle, disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.btnText,
            txtStyle,
            disabledButtonText
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 4,
    borderColor: '#999'
  },
  btnDisabled: {
    backgroundColor: gray,
    borderColor: darkGray,
    borderRadius: 15,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: white
  },
  btnTextDisabled: {
    color: darkGray
  }
});
