import ThemedText from '@/components/common/themed-text';
import ThemedView from '@/components/common/themed-view';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! This screen doesn\'t exist.' }} />
      <ThemedView style={styles.container}>
        <ThemedText type='title'>This screen doesn't exist.</ThemedText>
        <Link href='/' style={styles.link}>
          <ThemedText type='link'>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default NotFoundScreen;
