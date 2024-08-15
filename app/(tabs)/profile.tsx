import ThemedText from "@/components/common/themed-text"
import ThemedView from "@/components/common/themed-view"
import { StyleSheet } from "react-native"

const ProfileScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Welcome to the profile page</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ProfileScreen;