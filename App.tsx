import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { ChatBubble } from "./components/ChatBubble";

export default function App() {
  return (
    <View style={styles.container}>
      <ChatBubble user="Person 1" tailDirection="left">Hello World</ChatBubble>
      <ChatBubble user="Person 2" tailDirection="right">Yes</ChatBubble>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
