import React from "react";
import { StyleSheet, View, Text } from "react-native";
export default function Account() {
  return (
    <View style={styles.main}>
      <Text>This is Account</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
