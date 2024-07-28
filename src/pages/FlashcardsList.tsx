// import React from 'react';
// import { View, FlatList, StyleSheet } from 'react-native';
// import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import FlipCard from './FlipCard';

// const FlashcardsList: React.FC<{ flashcards: { id: string; frontTitle: string; frontValue: string; backTitle: string; backValue: string; }[] }> = ({ flashcards }) => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={flashcards}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.cardWrapper}>
//             <FlipCard 
//               title={item.frontTitle} 
//               value={item.frontValue} 
//               backTitle={item.backTitle} 
//               backValue={item.backValue} 
//               editable={false}
//               flippable={true} // Allow flipping
//             />
//           </View>
//         )}
//         contentContainerStyle={styles.listContent} // Optional: Adds padding to bottom of list
//       />
//       <Button 
//         mode="contained" 
//         onPress={() => navigation.navigate('CreateFlashcard')}
//         style={styles.button}
//       >
//         Create Flashcard
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start', // Align items at the top
//     alignItems: 'center',
//     paddingBottom: 20, // Ensure space for the button
//   },
//   cardWrapper: {
//     marginVertical: 10,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: '#007BFF',
//     width: '80%',
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 10, // Position the button at the bottom of the screen
//   },
//   listContent: {
//     paddingBottom: 80, // Space to avoid hiding last card under the button
//   },
// });

// export default FlashcardsList;



import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FlipCard from './FlipCard';

const FlashcardsList: React.FC<{ flashcards: { id: string; frontTitle: string; frontValue: string; backTitle: string; backValue: string; }[] }> = ({ flashcards }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={flashcards}
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
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('CreateFlashcard')}
          style={styles.button}
        >
          Create Flashcard
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Ensure it's visible
  },
  button: {
    backgroundColor: '#007BFF',
    width: '80%',
  },
  listContent: {
    paddingBottom: 20, // Ensure space between the last card and the button
  },
});

export default FlashcardsList;
