
import React, { useRef, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Animated, TextInput } from "react-native";
import { Button } from "react-native-paper";
import FlipCard from "./FlipCard";

const Word: React.FC = () => {
  const animate = useRef(new Animated.Value(0)).current;
  const [frontTitle, setFrontTitle] = useState('');
  const [front, setFront] = useState('');
  const [backTitle, setBackTitle] = useState('');
  const [back, setBack] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const frontRef = useRef<TextInput>(null);
  const backRef = useRef<TextInput>(null);

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 180;

    Animated.timing(animate, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
      if (!isFlipped && backRef.current) {
        backRef.current.focus();
      } else if (isFlipped && frontRef.current) {
        frontRef.current.focus();
      }
    });
  };

  const frontInterpolate = animate.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animate.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const animatedFrontStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const animatedBackStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.centered}>
        <Animated.View style={[styles.hidden, animatedFrontStyle]}>
          <FlipCard 
            title={frontTitle} 
            value={front} 
            onChangeTitle={setFrontTitle} 
            onChangeValue={setFront} 
            inputRef={frontRef} 
          />
        </Animated.View>
        <Animated.View style={[styles.hidden, styles.back, animatedBackStyle]}>
          <FlipCard 
            title={backTitle} 
            value={back} 
            onChangeTitle={setBackTitle} 
            onChangeValue={setBack} 
            inputRef={backRef} 
          />
        </Animated.View>
      </View>
      <Button onPress={handleFlip}>Flip</Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hidden: {
    backfaceVisibility: "hidden",
  },
  centered: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    top: 0,
  },
});

export default Word;