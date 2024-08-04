// import React, { useCallback, useState } from 'react';
// import { View, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, Text, TouchableOpacity, Picker } from 'react-native';
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
//   const [selectedFolder, setSelectedFolder] = useState(folders.length > 0 ? folders[0].id : '');

//   const navigateToCreateFlashcard = useCallback(() => {
//     navigation.navigate('CreateFlashcard');
//   }, [navigation]);

//   const handleAddFolder = () => {
//     if (newFolderName.trim()) {
//       addFolder(newFolderName);
//       setNewFolderName('');
//     }
//   };

//   const openFolder = (folder) => {
//     navigation.navigate('FolderContents', { folder });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={true}>
//           <View style={styles.folderContainer}>
//             {folders.map(folder => (
//               <TouchableOpacity key={folder.id} style={styles.folder} onPress={() => openFolder(folder)}>
//                 <Text style={styles.folderTitle}>{folder.name}</Text>
//               </TouchableOpacity>
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
//                   <View style={styles.moveContainer}>
//                     <Picker
//                       selectedValue={selectedFolder}
//                       style={styles.picker}
//                       onValueChange={(itemValue) => setSelectedFolder(itemValue)}
//                     >
//                       {folders.map(folder => (
//                         <Picker.Item key={folder.id} label={folder.name} value={folder.id} />
//                       ))}
//                     </Picker>
//                     <TouchableOpacity onPress={() => moveFlashcardToFolder(flashcard.id, selectedFolder)} style={styles.moveButton}>
//                       <Text>Move to {folders.find(folder => folder.id === selectedFolder)?.name}</Text>
//                     </TouchableOpacity>
//                   </View>
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
//   moveContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   picker: {
//     height: 50,
//     flex: 1,
//   },
//   moveButton: {
//     padding: 5,
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//     marginLeft: 10,
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
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  folderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
