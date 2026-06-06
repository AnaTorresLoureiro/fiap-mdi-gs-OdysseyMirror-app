import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT } from '../../constant/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,

        tabBarActiveTintColor: COLORS.auroraGreen,
        tabBarInactiveTintColor: COLORS.moon,

        tabBarLabelStyle: {
          fontFamily: FONT.bodyBold,
          fontSize: 9,
          marginTop: -2,
        },

        tabBarStyle: {
          position: 'absolute',
          left: '50%',
          bottom: 50,

          width: 300,
          height: 58,
          transform: [{ translateX: 85 / 2 }],

          borderRadius: 38,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0)',

          backgroundColor: 'rgba(5, 8, 22, 0.62)',
        },

        tabBarItemStyle: {
          height: 58,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 6,
          paddingBottom: 6,
        },

        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'EXPLORAR',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'earth' : 'earth-outline'} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'MONITORAR',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'compass' : 'compass-outline'} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'EVOLUÇÃO',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'telescope' : 'telescope-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}