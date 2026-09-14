import { ScrollView, type ScrollViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function Screen(props: ScrollViewProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      {...props}
      style={styles.container}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
}));
