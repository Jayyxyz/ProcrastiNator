import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MotivationalCard = ({ text, icon }) => {
  return (
    <View style={styles.card}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#D3D3D380',
    borderRadius: 8,
    justifyContent: 'center'
  },
  
  text: {
    alignItems: 'flex-start',
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  },
});

export default MotivationalCard;
