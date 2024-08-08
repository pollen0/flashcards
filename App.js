import 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Word from './src/pages/Word';
import FlashcardsList from './src/pages/FlashcardsList';
import CreateFlashcard from './src/pages/CreateFlashcard';
import FolderContents from './src/pages/FolderContents';
import ShuffleFlashcards from './src/pages/ShuffleFlashcards';

const Stack = createStackNavigator();

const preBuiltFlashcards = [
  { id: '1', frontTitle: '你好', frontValue: 'Nǐ hǎo', backTitle: 'Hello', backValue: 'Hello, my name is Paul' },
  { id: '2', frontTitle: '再见', frontValue: 'Zàijiàn', backTitle: 'Bye', backValue: 'Bye!' },
  { id: '3', frontTitle: '谢谢', frontValue: 'Xièxiè', backTitle: 'Thank you', backValue: 'Thank you!' },
  { id: '4', frontTitle: '请', frontValue: 'Qǐng', backTitle: 'Please', backValue: 'Please!' },
  { id: '5', frontTitle: '对不起', frontValue: 'Duìbuqǐ', backTitle: 'Sorry', backValue: 'Sorry!' },
  { id: '6', frontTitle: '早上好', frontValue: 'Zǎoshang hǎo', backTitle: 'Good morning', backValue: 'Good morning!' },
  { id: '7', frontTitle: '晚上好', frontValue: 'Wǎnshang hǎo', backTitle: 'Good evening', backValue: 'Good evening!' },
  { id: '8', frontTitle: '我爱你', frontValue: 'Wǒ ài nǐ', backTitle: 'I love you', backValue: 'I love you!' }
];

const preBuiltFolder = {
  id: '1',
  name: 'Basic Chinese Words',
  flashcards: preBuiltFlashcards,
};

export default function App() {
  const [flashcards, setFlashcards] = useState(preBuiltFlashcards);
  const [folders, setFolders] = useState([preBuiltFolder]);

  const addFlashcard = (frontTitle, frontValue, backTitle, backValue) => {
    const newFlashcard = { id: String(flashcards.length + 1), frontTitle, frontValue, backTitle, backValue };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const addFolder = (folderName) => {
    setFolders([...folders, { id: String(folders.length + 1), name: folderName, flashcards: [] }]);
  };

  const moveFlashcardToFolder = (flashcardId, folderId) => {
    const flashcard = flashcards.find(fc => fc.id === flashcardId);
    if (!flashcard) return; // If the flashcard is not found, do nothing

    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          flashcards: [...folder.flashcards, flashcard],
        };
      }
      return folder;
    }));

    setFlashcards(flashcards.filter(fc => fc.id !== flashcardId));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FlashcardsList">
        <Stack.Screen name="FlashcardsList">
          {(props) => <FlashcardsList {...props} flashcards={flashcards} folders={folders} addFolder={addFolder} moveFlashcardToFolder={moveFlashcardToFolder} />}
        </Stack.Screen>
        <Stack.Screen name="CreateFlashcard">
          {(props) => <CreateFlashcard {...props} addFlashcard={addFlashcard} />}
        </Stack.Screen>
        <Stack.Screen name="Word" component={Word} />
        <Stack.Screen name="FolderContents" component={FolderContents} />
        <Stack.Screen name="ShuffleFlashcards" component={ShuffleFlashcards} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};





// import 'react-native-gesture-handler';
// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { openDatabase, addFolder, addFlashcard, getFolders, getFlashcards, logDatabaseContents } from './database';
// import Word from './src/pages/Word';
// import FlashcardsList from './src/pages/FlashcardsList';
// import CreateFlashcard from './src/pages/CreateFlashcard';
// import FolderContents from './src/pages/FolderContents';
// import ShuffleFlashcards from './src/pages/ShuffleFlashcards';

// const Stack = createStackNavigator();

// const App = () => {
//   const [flashcards, setFlashcards] = useState([]);
//   const [folders, setFolders] = useState([]);

//   useEffect(() => {
//     openDatabase();
//     fetchFolders();
//     logDatabaseContents(); // Log the database contents
//   }, []);

//   const fetchFolders = () => {
//     getFolders((folders) => {
//       console.log('Fetched folders:', folders);
//       setFolders(folders);
//     });
//   };

//   const fetchFlashcards = (folderId) => {
//     getFlashcards(folderId, (flashcards) => {
//       console.log('Fetched flashcards:', flashcards);
//       setFlashcards(flashcards);
//     });
//   };

//   const handleAddFolder = (folderName) => {
//     addFolder(folderName, (folderId) => {
//       console.log('Added folder with ID:', folderId);
//       fetchFolders();
//     });
//   };

//   const handleAddFlashcard = (frontTitle, frontValue, backTitle, backValue, folderId) => {
//     addFlashcard(frontTitle, frontValue, backTitle, backValue, folderId, (flashcardId) => {
//       console.log('Added flashcard with ID:', flashcardId);
//       fetchFlashcards(folderId);
//     });
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="FlashcardsList">
//         <Stack.Screen name="FlashcardsList">
//           {(props) => (
//             <FlashcardsList
//               {...props}
//               flashcards={flashcards}
//               folders={folders}
//               addFolder={handleAddFolder}
//               fetchFlashcards={fetchFlashcards}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="CreateFlashcard">
//           {(props) => (
//             <CreateFlashcard
//               {...props}
//               addFlashcard={(frontTitle, frontValue, backTitle, backValue) => handleAddFlashcard(frontTitle, frontValue, backTitle, backValue, props.route.params.folderId)}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="Word" component={Word} />
//         <Stack.Screen name="FolderContents">
//           {(props) => (
//             <FolderContents
//               {...props}
//               fetchFlashcards={fetchFlashcards}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="ShuffleFlashcards" component={ShuffleFlashcards} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

