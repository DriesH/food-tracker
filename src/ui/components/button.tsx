import { Pressable, type PressableProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Typography } from './typography';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  variant?: 'primary' | 'secondary' | 'destructive';
};

export function Button({ title, variant = 'primary', disabled, ...props }: ButtonProps) {
  styles.useVariants({ variant });

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Typography variant="label" style={styles.label}>
        {title}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.full,
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.accent },
        secondary: { backgroundColor: theme.colors.background },
        destructive: { backgroundColor: theme.colors.background },
      },
    },
  },
  label: {
    variants: {
      variant: {
        primary: { color: theme.colors.onAccent },
        secondary: { color: theme.colors.text },
        destructive: { color: theme.colors.danger },
      },
    },
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
}));
