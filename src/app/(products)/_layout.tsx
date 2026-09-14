import { Stack } from 'expo-router';

import { useStackScreenOptions } from '@/ui/navigation/use-stack-screen-options';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function ProductsLayout() {
  const screenOptions = useStackScreenOptions();

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: 'Products' }} />
    </Stack>
  );
}
