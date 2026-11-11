import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import type { Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { DetailScreen } from '@/screens/DetailScreen';
import { FavoritesScreen } from '@/screens/FavoritesScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { COLORS } from '@/theme';

import type { HomeStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const ACTIVE_COLOR = '#61DAFB';

const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: ACTIVE_COLOR,
    background: COLORS.ink,
    card: COLORS.surface,
    text: COLORS.bone,
    border: COLORS.surfaceRaised,
  },
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeList" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: COLORS.muted,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={route.name === 'Home' ? 'game-controller' : 'heart'}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{ headerShown: false, title: 'Máquinas' }}
        />
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritas' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
