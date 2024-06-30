import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { Image, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    marginBottom: -3,
    // paddingBottom: 5,
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="landing"
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#b0b0b0',
        tabBarStyle: {
          backgroundColor: '#2e2e2e',
          borderTopColor: '#3e3e3e',
          borderTopWidth: 5,
        },
        headerStyle: {
          backgroundColor: '#3f3d3d',
        },
        headerTitleStyle: {
          color: '#4CAF50',
          fontFamily: 'InterMedium',
          letterSpacing: -0.8,
        },
        headerTintColor: '#4CAF50',
        tabBarLabelStyle: {
          fontFamily: 'InterMedium',
        },
      }}
    >
      <Tabs.Screen
        name="landing"
        options={{
          title: 'AlgorithmPro',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="question"
        options={{
          title: 'Question',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/algoHelper.png')}
              style={[styles.image, { tintColor: color }]}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'AI Helper',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/algoHelper.png')}
              style={[styles.image, { tintColor: color }]}
            />
          ),
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/history.png')}
              style={[styles.image, { tintColor: color }]}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}