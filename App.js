// import 'react-native-gesture-handler';
// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Word from './src/pages/Word';
// import FlashcardsList from './src/pages/FlashcardsList';
// import CreateFlashcard from './src/pages/CreateFlashcard';

// const Stack = createStackNavigator();

// export default function App() {
//   const [flashcards, setFlashcards] = useState([]);

//   const addFlashcard = (frontTitle, frontValue, backTitle, backValue) => {
//     setFlashcards([...flashcards, { id: String(flashcards.length + 1), frontTitle, frontValue, backTitle, backValue }]);
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="FlashcardsList">
//         <Stack.Screen name="FlashcardsList">
//           {(props) => <FlashcardsList {...props} flashcards={flashcards} />}
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

const Stack = createStackNavigator();

const preBuiltFlashcards = [
  { id: '1', frontTitle: '你好', frontValue: 'Nǐ hǎo', backTitle: 'Hello', backValue: 'Hello, my name is Paul' },
  { id: '2', frontTitle: '再见', frontValue: 'Zàijiàn', backTitle: 'Bye', backValue: 'Bye!' },
];

export default function App() {
  const [flashcards, setFlashcards] = useState(preBuiltFlashcards);

  const addFlashcard = (frontTitle, frontValue, backTitle, backValue) => {
    setFlashcards([...flashcards, { id: String(flashcards.length + 1), frontTitle, frontValue, backTitle, backValue }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FlashcardsList">
        <Stack.Screen name="FlashcardsList">
          {(props) => <FlashcardsList {...props} flashcards={flashcards} />}
        </Stack.Screen>
        <Stack.Screen name="CreateFlashcard">
          {(props) => <CreateFlashcard {...props} addFlashcard={addFlashcard} />}
        </Stack.Screen>
        <Stack.Screen name="Word" component={Word} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
