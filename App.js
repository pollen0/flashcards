// import 'react-native-gesture-handler';
// import { Picker } from '@react-native-picker/picker';
// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Word from './src/pages/Word';
// import FlashcardsList from './src/pages/FlashcardsList';
// import CreateFlashcard from './src/pages/CreateFlashcard';
// import FolderContents from './src/pages/FolderContents';
// import ShuffleFlashcards from './src/pages/ShuffleFlashcards';

// const Stack = createStackNavigator();

// const preBuiltFlashcards = [
//   { id: '1', frontTitle: '你好', frontValue: 'Nǐ hǎo', backTitle: 'Hello', backValue: 'Hello, my name is Paul' },
//   { id: '2', frontTitle: '再见', frontValue: 'Zàijiàn', backTitle: 'Bye', backValue: 'Bye!' },
//   { id: '3', frontTitle: '谢谢', frontValue: 'Xièxiè', backTitle: 'Thank you', backValue: 'Thank you!' },
//   { id: '4', frontTitle: '请', frontValue: 'Qǐng', backTitle: 'Please', backValue: 'Please!' },
//   { id: '5', frontTitle: '对不起', frontValue: 'Duìbuqǐ', backTitle: 'Sorry', backValue: 'Sorry!' },
//   { id: '6', frontTitle: '早上好', frontValue: 'Zǎoshang hǎo', backTitle: 'Good morning', backValue: 'Good morning!' },
//   { id: '7', frontTitle: '晚上好', frontValue: 'Wǎnshang hǎo', backTitle: 'Good evening', backValue: 'Good evening!' },
//   { id: '8', frontTitle: '我爱你', frontValue: 'Wǒ ài nǐ', backTitle: 'I love you', backValue: 'I love you!' }
// ];

// const preBuiltFolder = {
//   id: '1',
//   name: 'Basic Chinese Words',
//   flashcards: preBuiltFlashcards,
// };

// export default function App() {
//   const [flashcards, setFlashcards] = useState(preBuiltFlashcards);
//   const [folders, setFolders] = useState([preBuiltFolder]);

//   const addFlashcard = (frontTitle, frontValue, backTitle, backValue) => {
//     const newFlashcard = { id: String(flashcards.length + 1), frontTitle, frontValue, backTitle, backValue };
//     setFlashcards([...flashcards, newFlashcard]);
//   };

//   const addFolder = (folderName) => {
//     setFolders([...folders, { id: String(folders.length + 1), name: folderName, flashcards: [] }]);
//   };

//   const moveFlashcardToFolder = (flashcardId, folderId) => {
//     const flashcard = flashcards.find(fc => fc.id === flashcardId);
//     if (!flashcard) return; // If the flashcard is not found, do nothing

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
//         <Stack.Screen name="FolderContents" component={FolderContents} />
//         <Stack.Screen name="ShuffleFlashcards" component={ShuffleFlashcards} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };




import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Word from './src/pages/Word';
import FlashcardsList from './src/pages/FlashcardsList';
import CreateFlashcard from './src/pages/CreateFlashcard';
import FolderContents from './src/pages/FolderContents';
import ShuffleFlashcards from './src/pages/ShuffleFlashcards';
import { realm, Flashcard, Folder } from './realmConfig';

const Stack = createStackNavigator();

// Main App component
const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard>([]);
  const [folders, setFolders] = useState<Folder>([]);

  useEffect(() => {
    const loadData = () => {
      const allFlashcards = realm.objects<Flashcard>("Flashcard");
      const allFolders = realm.objects<Folder>("Folder");
      setFlashcards(allFlashcards);
      setFolders(allFolders);
    };

    loadData();

    // Listen for changes in the database
    const flashcardsListener = realm.objects("Flashcard").addListener((collection, changes) => {
      setFlashcards([...collection]);
    });

    const foldersListener = realm.objects("Folder").addListener((collection, changes) => {
      setFolders([...collection]);
    });

    return () => {
      // Clean up listeners on unmount
      flashcardsListener.removeAllListeners();
      foldersListener.removeAllListeners();
    };
  }, []);

  const addFlashcard = (frontTitle: string, frontValue: string, backTitle: string, backValue: string) => {
    const newFlashcard = {
      id: String(Date.now()),
      frontTitle,
      frontValue,
      backTitle,
      backValue,
      reviewDate: new Date(),
    };
    realm.write(() => {
      realm.create("Flashcard", newFlashcard);
    });
  };

  const addFolder = (folderName: string) => {
    const newFolder = {
      id: String(Date.now()),
      name: folderName,
      flashcards: [],
    };
    realm.write(() => {
      realm.create("Folder", newFolder);
    });
  };

  const moveFlashcardToFolder = (flashcardId: string, folderId: string) => {
    const flashcard = realm.objectForPrimaryKey<Flashcard>("Flashcard", flashcardId);
    const folder = realm.objectForPrimaryKey<Folder>("Folder", folderId);
    if (flashcard && folder) {
      realm.write(() => {
        folder.flashcards.push(flashcard);
      });
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FlashcardsList">
        <Stack.Screen name="FlashcardsList">
          {(props) => (
            <FlashcardsList
              {...props}
              flashcards={flashcards}
              folders={folders}
              addFolder={addFolder}
              moveFlashcardToFolder={moveFlashcardToFolder}
            />
          )}
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

export default App;
