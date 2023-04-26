import { StyleSheet, Text, View } from "react-native";

export function ChatBubble({text}: {text: string}) {
  return (
    <View style={styles.bubble}>
      <Text>Chat Bubble {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 10
  },
});
