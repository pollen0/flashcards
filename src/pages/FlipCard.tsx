import React, { useRef, useEffect } from "react";
import { Text, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, View } from "react-native";
import { Card } from "react-native-paper";

type Props = {
  title: string;
  value: string;
  onChangeTitle?: (text: string) => void;
  onChangeValue?: (text: string) => void;
  editable: boolean;
  flippable?: boolean; // Controls whether the card can flip by itself
  isFlipped?: boolean; // External flip state for controlled flipping
  backTitle?: string;
  backValue?: string;
};

const FlipCard: React.FC<Props> = ({
  title,
  value,
  onChangeTitle,
  onChangeValue,
  editable = false,
  flippable = true,
  isFlipped = false,
  backTitle,
  backValue,
}) => {
  const animate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue = isFlipped ? 180 : 0;
    Animated.timing(animate, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const flipCard = () => {
    if (!flippable) return;

    const toValue = animate._value === 0 ? 180 : 0;

    Animated.timing(animate, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
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
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedFrontStyle]}>
          <Card style={styles.cardInner}>
            <Card.Content style={styles.content}>
              {editable ? (
                <>
                  <TextInput
                    placeholder="Enter title"
                    value={title}
                    onChangeText={onChangeTitle}
                    style={[styles.input, styles.titleInput]}
                  />
                  <TextInput
                    placeholder="Enter value"
                    value={value}
                    onChangeText={onChangeValue}
                    style={styles.input}
                  />
                </>
              ) : (
                <>
                  <Text style={[styles.input, styles.titleInput]}>{title}</Text>
                  <Text style={styles.input}>{value}</Text>
                </>
              )}
            </Card.Content>
          </Card>
        </Animated.View>
        <Animated.View style={[styles.card, styles.back, animatedBackStyle]}>
          <Card style={styles.cardInner}>
            <Card.Content style={styles.content}>
              {editable ? (
                <>
                  <TextInput
                    placeholder="Enter back title"
                    value={backTitle}
                    onChangeText={onChangeTitle}
                    style={[styles.input, styles.titleInput]}
                  />
                  <TextInput
                    placeholder="Enter back value"
                    value={backValue}
                    onChangeText={onChangeValue}
                    style={styles.input}
                  />
                </>
              ) : (
                <>
                  <Text style={[styles.input, styles.titleInput]}>{backTitle}</Text>
                  <Text style={styles.input}>{backValue}</Text>
                </>
              )}
            </Card.Content>
          </Card>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 250,
    marginBottom: 20,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  cardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 16,
  },
  titleInput: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  back: {
    transform: [{ rotateY: '180deg' }],
  },
});

export default FlipCard;
