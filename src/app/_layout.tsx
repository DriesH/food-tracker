import { QueryClientProvider } from '@tanstack/react-query';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { db } from '@/db/client';
import migrations from '@/db/migrations/migrations';
import { queryClient } from '@/services/query-client';
import { Screen } from '@/ui/components/screen';
import { Typography } from '@/ui/components/typography';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success || error) {
      SplashScreen.hideAsync();
    }
  }, [success, error]);

  if (error) {
    return (
      <Screen>
        <Typography variant="heading">Database migration failed</Typography>
        <Typography tone="muted">{error.message}</Typography>
      </Screen>
    );
  }

  if (!success) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NativeTabs minimizeBehavior="onScrollDown">
        <NativeTabs.Trigger name="(today)">
          <NativeTabs.Trigger.Label>Today</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="sun.max" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="(products)">
          <NativeTabs.Trigger.Label>Products</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="cart" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="(settings)">
          <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="gearshape" />
        </NativeTabs.Trigger>
      </NativeTabs>
    </QueryClientProvider>
  );
}
