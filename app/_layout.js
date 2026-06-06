import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { COLORS, FONT } from '../constant/theme';
import { MonitoringProvider } from '../context/MonitoringContext';

import {
  LeagueSpartan_400Regular,
  LeagueSpartan_600SemiBold,
  LeagueSpartan_700Bold,
} from '@expo-google-fonts/league-spartan';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LeagueSpartan_400Regular,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,

    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <MonitoringProvider>
      <Stack
        initialRouteName="tabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="tabs" />
        <Stack.Screen name="monitoring" />
      </Stack>
    </MonitoringProvider>
  );
}