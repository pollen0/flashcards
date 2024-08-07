import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import FlipCard from './FlipCard';

type Flashcard = {
  id: string;
  frontTitle: string;
  frontValue: string;
  backTitle: string;
  backValue: string;
};

type Folder = {
  id: string;
  name: string;
  flashcards: Flashcard[];
};

type FolderContentsRouteProp = RouteProp<{ params: { folder: Folder } }, 'params'>;

const FolderContents: React.FC = () => {
  const route = useRoute<FolderContentsRouteProp>();
  const { folder } = route.params;
  const navigation = useNavigation();

  const handleShuffle = () => {
    navigation.navigate('ShuffleFlashcards', { flashcards: folder.flashcards });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{folder.name}</Text>
      <Button mode="contained" onPress={handleShuffle} style={styles.shuffleButton}>
        Shuffle
      </Button>
      <FlatList
        data={folder.flashcards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <FlipCard
              title={item.frontTitle}
              value={item.frontValue}
              backTitle={item.backTitle}
              backValue={item.backValue}
              editable={false}
              flippable={true}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  shuffleButton: {
    marginBottom: 20,
    backgroundColor: '#007BFF',
  },
  cardWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default FolderContents;
