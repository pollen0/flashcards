// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import FlipCard from './FlipCard';

// const FolderContents = () => {
//   const route = useRoute();
//   const { folder } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{folder.name}</Text>
//       <FlatList
//         data={folder.flashcards}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.cardWrapper}>
//             <FlipCard
//               title={item.frontTitle}
//               value={item.frontValue}
//               backTitle={item.backTitle}
//               backValue={item.backValue}
//               editable={false}
//               flippable={true}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   cardWrapper: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
// });

// export default FolderContents;
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import FlipCard from './FlipCard';
import { Picker } from '@react-native-picker/picker';

const FolderContents = () => {
  const route = useRoute();
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  shuffleButton: {
    marginBottom: 20,
  },
  cardWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default FolderContents;
