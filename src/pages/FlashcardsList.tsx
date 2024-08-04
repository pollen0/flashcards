// import React, { useCallback, useState } from 'react';
// import { View, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, Text, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import FlipCard from './FlipCard';

// const FlashcardsList: React.FC<{
//   flashcards: { id: string; frontTitle: string; frontValue: string; backTitle: string; backValue: string; }[],
//   folders: { id: string; name: string; flashcards: { id: string; frontTitle: string; frontValue: string; backTitle: string; backValue: string; }[] }[],
//   addFolder: (folderName: string) => void,
//   moveFlashcardToFolder: (flashcardId: string, folderId: string) => void,
// }> = ({ flashcards, folders, addFolder, moveFlashcardToFolder }) => {
//   const navigation = useNavigation();
//   const [newFolderName, setNewFolderName] = useState('');

//   const navigateToCreateFlashcard = useCallback(() => {
//     navigation.navigate('CreateFlashcard');
//   }, [navigation]);

//   const handleAddFolder = () => {
//     if (newFolderName.trim()) {
//       addFolder(newFolderName);
//       setNewFolderName('');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={true}>
//           <View style={styles.folderContainer}>
//             {folders.map(folder => (
//               <View key={folder.id} style={styles.folder}>
//                 <Text style={styles.folderTitle}>{folder.name}</Text>
//                 {folder.flashcards.map(flashcard => (
//                   <View key={flashcard.id} style={styles.cardWrapper}>
//                     <FlipCard
//                       title={flashcard.frontTitle}
//                       value={flashcard.frontValue}
//                       backTitle={flashcard.backTitle}
//                       backValue={flashcard.backValue}
//                       editable={false}
//                       flippable={true}
//                     />
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>

//           <View>
//             {flashcards.map(flashcard => (
//               <View key={flashcard.id} style={styles.cardWrapper}>
//                 <FlipCard
//                   title={flashcard.frontTitle}
//                   value={flashcard.frontValue}
//                   backTitle={flashcard.backTitle}
//                   backValue={flashcard.backValue}
//                   editable={false}
//                   flippable={true}
//                 />
//                 {folders.length > 0 && (
//                   <TouchableOpacity onPress={() => moveFlashcardToFolder(flashcard.id, folders[0].id)} style={styles.moveButton}>
//                     <Text>Move to {folders[0].name}</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             ))}
//           </View>
//           <View style={styles.bottomSpacer}></View>
//         </ScrollView>
//         <View style={styles.buttonContainer}>
//           <TextInput
//             placeholder="Enter folder name"
//             value={newFolderName}
//             onChangeText={setNewFolderName}
//             style={styles.input}
//           />
//           <Button mode="contained" onPress={handleAddFolder} style={styles.addButton}>
//             Add Folder
//           </Button>
//           <Button mode="contained" onPress={navigateToCreateFlashcard} style={styles.button}>
//             Create Flashcard
//           </Button>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   container: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     paddingBottom: 20, // Ensure enough space for the button
//   },
//   cardWrapper: {
//     marginVertical: 10,
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     padding: 10,
//   },
//   folderContainer: {
//     marginVertical: 10,
//   },
//   folder: {
//     padding: 10,
//     marginVertical: 10,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 5,
//   },
//   folderTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   addFolderContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   input: {
//     flex: 1,
//     marginRight: 10,
//     padding: 10,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   addButton: {
//     marginRight: 10,
//   },
//   moveButton: {
//     padding: 5,
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//   },
//   bottomSpacer: {
//     height: 60, // Spacer to ensure the last card is fully visible
//   },
// });

// export default FlashcardsList;


import React, { useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, Text, TouchableOpacity, Picker } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlipCard from './FlipCard';

const FlashcardsList: React.FC<{
  flashcards: { id: string; frontTitle: string; frontValue: string; backTitle: string; backValue: string; }[],
  folders: { id: string; name: string; flashcards: { id: string; frontTitle: string; frontValue: string; backTitle: string; backValue: string; }[] }[],
  addFolder: (folderName: string) => void,
  moveFlashcardToFolder: (flashcardId: string, folderId: string) => void,
}> = ({ flashcards, folders, addFolder, moveFlashcardToFolder }) => {
  const navigation = useNavigation();
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(folders.length > 0 ? folders[0].id : '');

  const navigateToCreateFlashcard = useCallback(() => {
    navigation.navigate('CreateFlashcard');
  }, [navigation]);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName);
      setNewFolderName('');
    }
  };

  const openFolder = (folder) => {
    navigation.navigate('FolderContents', { folder });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={true}>
          <View style={styles.folderContainer}>
            {folders.map(folder => (
              <TouchableOpacity key={folder.id} style={styles.folder} onPress={() => openFolder(folder)}>
                <Icon name="folder" size={50} color="#FFD700" />
                <Text style={styles.folderTitle}>{folder.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            {flashcards.map(flashcard => (
              <View key={flashcard.id} style={styles.cardWrapper}>
                <FlipCard
                  title={flashcard.frontTitle}
                  value={flashcard.frontValue}
                  backTitle={flashcard.backTitle}
                  backValue={flashcard.backValue}
                  editable={false}
                  flippable={true}
                />
                {folders.length > 0 && (
                  <View style={styles.moveContainer}>
                    <Picker
                      selectedValue={selectedFolder}
                      style={styles.picker}
                      onValueChange={(itemValue) => setSelectedFolder(itemValue)}
                    >
                      {folders.map(folder => (
                        <Picker.Item key={folder.id} label={folder.name} value={folder.id} />
                      ))}
                    </Picker>
                    <TouchableOpacity onPress={() => moveFlashcardToFolder(flashcard.id, selectedFolder)} style={styles.moveButton}>
                      <Text>Move to {folders.find(folder => folder.id === selectedFolder)?.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
          <View style={styles.bottomSpacer}></View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TextInput
            placeholder="Enter folder name"
            value={newFolderName}
            onChangeText={setNewFolderName}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleAddFolder} style={styles.addButton}>
            Add Folder
          </Button>
          <Button mode="contained" onPress={navigateToCreateFlashcard} style={styles.button}>
            Create Flashcard
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Ensure enough space for the button
  },
  cardWrapper: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  folderContainer: {
    marginVertical: 10,
  },
  folder: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    width: 300,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  folderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addFolderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  addButton: {
    marginRight: 10,
  },
  moveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  picker: {
    height: 50,
    flex: 1,
  },
  moveButton: {
    padding: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
  },
  bottomSpacer: {
    height: 60, // Spacer to ensure the last card is fully visible
  },
});

export default FlashcardsList;


