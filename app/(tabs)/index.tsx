import ThemedText from "@/components/common/themed-text"
import ThemedView from "@/components/common/themed-view"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const OpportunitiesScreen = () => {
    return (
        <ThemedView style={styles.container}>
          <ThemedText>Welcome to the opportunities page</ThemedText>
        </ThemedView>
    )
}

export default OpportunitiesScreen;