import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FlipCard from './FlipCard';

const CreateFlashcard: React.FC<{ addFlashcard: (frontTitle: string, frontValue: string, backTitle: string, backValue: string) => void }> = ({ addFlashcard }) => {
  const navigation = useNavigation();
  const [frontTitle, setFrontTitle] = useState('');
  const [frontValue, setFrontValue] = useState('');
  const [backTitle, setBackTitle] = useState('');
  const [backValue, setBackValue] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSave = () => {
    addFlashcard(frontTitle, frontValue, backTitle, backValue);
    navigation.goBack(); // Navigate back to the list screen
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Toggle flip state
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <FlipCard
          title={isFlipped ? backTitle : frontTitle}
          value={isFlipped ? backValue : frontValue}
          onChangeTitle={isFlipped ? setBackTitle : setFrontTitle}
          onChangeValue={isFlipped ? setBackValue : setFrontValue}
          editable={true}
          flippable={false} // Flip controlled externally
          isFlipped={isFlipped}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save Flashcard
        </Button>
        <Button mode="contained" onPress={handleFlip} style={[styles.button, styles.flipButton]}>
          {isFlipped ? "Edit Front" : "Edit Back"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: 300,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: '#007BFF',
  },
  flipButton: {
    backgroundColor: '#28a745',
  },
});

export default CreateFlashcard;
