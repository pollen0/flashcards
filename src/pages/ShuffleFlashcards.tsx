import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FlipCard from './FlipCard';
import { Picker } from '@react-native-picker/picker';

const ShuffleFlashcards = () => {
  const route = useRoute();
  const { flashcards } = route.params;
  const [shuffledFlashcards, setShuffledFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Shuffle flashcards
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledFlashcards(shuffled);
  }, [flashcards]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % shuffledFlashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + shuffledFlashcards.length) % shuffledFlashcards.length);
  };

  if (!shuffledFlashcards.length) {
    return null;
  }

  const currentFlashcard = shuffledFlashcards[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shuffled Flashcards</Text>
      <View style={styles.cardWrapper}>
        <FlipCard
          title={currentFlashcard.frontTitle}
          value={currentFlashcard.frontValue}
          backTitle={currentFlashcard.backTitle}
          backValue={currentFlashcard.backValue}
          editable={false}
          flippable={true}
        />
      </View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ShuffleFlashcards;
