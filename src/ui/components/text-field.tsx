import { TextInput, View, type TextInputProps } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Typography } from './typography';

type TextFieldProps = TextInputProps & {
  label: string;
  suffix?: string;
};

export function TextField({ label, suffix, style, ...props }: TextFieldProps) {
  const { theme } = useUnistyles();

  return (
    <View style={styles.field}>
      <Typography variant="caption" tone="muted">
        {label}
      </Typography>
      <View style={styles.inputRow}>
        <TextInput {...props} placeholderTextColor={theme.colors.textMuted} style={[styles.input, style]} />
        {suffix && <Typography tone="muted">{suffix}</Typography>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  field: {
    gap: theme.spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderCurve: 'continuous',
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontFamily: theme.typography.body.fontFamily,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
}));
