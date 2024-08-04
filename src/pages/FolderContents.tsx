import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FlipCard from './FlipCard';

const FolderContents = () => {
  const route = useRoute();
  const { folder } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{folder.name}</Text>
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
});

export default FolderContents;
