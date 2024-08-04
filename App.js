// import 'react-native-gesture-handler';
// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Word from './src/pages/Word';
// import FlashcardsList from './src/pages/FlashcardsList';
// import CreateFlashcard from './src/pages/CreateFlashcard';

// const Stack = createStackNavigator();

// const preBuiltFlashcards = [
//   { id: '1', frontTitle: '你好', frontValue: 'Nǐ hǎo', backTitle: 'Hello', backValue: 'Hello, my name is Paul' },
//   { id: '2', frontTitle: '再见', frontValue: 'Zàijiàn', backTitle: 'Bye', backValue: 'Bye!' },
//   // add more flashcards here as needed
// ];

// export default function App() {
//   const [flashcards, setFlashcards] = useState(preBuiltFlashcards);
//   const [folders, setFolders] = useState([]);

//   const addFlashcard = (frontTitle, frontValue, backTitle, backValue) => {
//     setFlashcards([...flashcards, { id: String(flashcards.length + 1), frontTitle, frontValue, backTitle, backValue }]);
//   };

//   const addFolder = (folderName) => {
//     setFolders([...folders, { id: String(folders.length + 1), name: folderName, flashcards: [] }]);
//   };

//   const moveFlashcardToFolder = (flashcardId, folderId) => {
//     const flashcard = flashcards.find(fc => fc.id === flashcardId);
//     setFolders(folders.map(folder => {
//       if (folder.id === folderId) {
//         return {
//           ...folder,
//           flashcards: [...folder.flashcards, flashcard],
//         };
//       }
//       return folder;
//     }));
//     setFlashcards(flashcards.filter(fc => fc.id !== flashcardId));
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="FlashcardsList">
//         <Stack.Screen name="FlashcardsList">
//           {(props) => <FlashcardsList {...props} flashcards={flashcards} folders={folders} addFolder={addFolder} moveFlashcardToFolder={moveFlashcardToFolder} />}
//         </Stack.Screen>
//         <Stack.Screen name="CreateFlashcard">
//           {(props) => <CreateFlashcard {...props} addFlashcard={addFlashcard} />}
//         </Stack.Screen>
//         <Stack.Screen name="Word" component={Word} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Word from './src/pages/Word';
import FlashcardsList from './src/pages/FlashcardsList';
import CreateFlashcard from './src/pages/CreateFlashcard';
import FolderContents from './src/pages/FolderContents';

const Stack = createStackNavigator();

const preBuiltFlashcards = [
  { id: '1', frontTitle: '你好', frontValue: 'Nǐ hǎo', backTitle: 'Hello', backValue: 'Hello, my name is Paul' },
  { id: '2', frontTitle: '再见', frontValue: 'Zàijiàn', backTitle: 'Bye', backValue: 'Bye!' },
  // add more flashcards here as needed
];

export default function App() {
  const [flashcards, setFlashcards] = useState(preBuiltFlashcards);
  const [folders, setFolders] = useState([]);

  const addFlashcard = (frontTitle, frontValue, backTitle, backValue) => {
    setFlashcards([...flashcards, { id: String(flashcards.length + 1), frontTitle, frontValue, backTitle, backValue }]);
  };

  const addFolder = (folderName) => {
    setFolders([...folders, { id: String(folders.length + 1), name: folderName, flashcards: [] }]);
  };

  const moveFlashcardToFolder = (flashcardId, folderId) => {
    const flashcard = flashcards.find(fc => fc.id === flashcardId);
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

