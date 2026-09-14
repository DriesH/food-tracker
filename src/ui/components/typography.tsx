import { Text, type TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type TypographyProps = TextProps & {
  variant?: 'title' | 'heading' | 'subheading' | 'body' | 'label' | 'caption' | 'number';
  tone?: 'primary' | 'muted' | 'accent' | 'danger';
};

export function Typography({ variant = 'body', tone = 'primary', style, ...props }: TypographyProps) {
  styles.useVariants({ variant, tone });

  return <Text {...props} style={[styles.text, style]} />;
}

const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      variant: {
        title: theme.typography.title,
        heading: theme.typography.heading,
        subheading: theme.typography.subheading,
        body: theme.typography.body,
        label: theme.typography.label,
        caption: theme.typography.caption,
        number: theme.typography.number,
      },
      tone: {
        primary: { color: theme.colors.text },
        muted: { color: theme.colors.textMuted },
        accent: { color: theme.colors.accent },
        danger: { color: theme.colors.danger },
      },
    },
  },
}));
