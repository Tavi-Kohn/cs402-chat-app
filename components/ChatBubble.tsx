import { StyleSheet, Text, View } from "react-native";
import { PropsWithChildren } from "react";

export function ChatBubble(props: PropsWithChildren<Props>) {
  return (
    <View
      style={[
        styles.bubble,
        props.tailDirection === "left" ? styles.tailLeft : styles.tailRight,
      ]}
    >
      <Text>User '{props.user}' said: "{props.children}"</Text>
    </View>
  );
}

type Props = {
  tailDirection: "left" | "right";
  user: string,
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 10,
    margin: 5
  },
  tailLeft: {
    borderBottomLeftRadius: 0,
  },
  tailRight: {
    borderBottomRightRadius: 0,
  },
});
