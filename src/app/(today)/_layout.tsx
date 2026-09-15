import { Stack } from 'expo-router';

import { useStackScreenOptions } from '@/ui/navigation/use-stack-screen-options';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TodayLayout() {
  const screenOptions = useStackScreenOptions();

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: 'Today' }} />
      <Stack.Screen
        name="quick-entry"
        options={{
          presentation: 'formSheet',
          headerShown: false,
          sheetAllowedDetents: [0.75, 1],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
