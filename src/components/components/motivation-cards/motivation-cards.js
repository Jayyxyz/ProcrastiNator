import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const MotivationalCard = ({ text, icon, url }) => {
  const handleLearnMore = () => {
    if (url) {
      Linking.openURL(url);
    }
  };
  
  return (
    <View style={[styles.card, url && styles.cardWithButton]}>
      <Text style={styles.text}>{text}</Text>
      {url && (
          <TouchableOpacity style={styles.button} onPress={handleLearnMore}>
            <Text style={styles.buttonText}>Learn More</Text>
          </TouchableOpacity>
        )}

      {icon && <Image source={icon} style={styles.icon} />}
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 20,
    margin: 5,
    backgroundColor: '#D3D3D380',
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  cardWithButton: {
    flexDirection: 'column', // Change to column layout when button is present
    alignItems: 'center',
     
  },
  
  text: {
    alignItems: 'flex-start',
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  },
  icon: {
    width: 40, // Adjust size to your preference
    height: 40,
    borderRadius: 20, // Optional: make the image circular
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'cyan',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MotivationalCard;
