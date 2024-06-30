import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)/landing',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    NotoSansBlack: require('../assets/fonts/NotoSansJP-Black.ttf'),
    NotoSansBold: require('../assets/fonts/NotoSansJP-Bold.ttf'),
    NotoSansRegular: require('../assets/fonts/NotoSansJP-Regular.ttf'),
    NotoSansLight: require('../assets/fonts/NotoSansJP-Light.ttf'),
    NotoSansThin: require('../assets/fonts/NotoSansJP-Thin.ttf'),
    NotoSansSemiBold: require('../assets/fonts/NotoSansJP-SemiBold.ttf'),
    NotoSansMedium: require('../assets/fonts/NotoSansJP-Medium.ttf'),
    NotoSansExtraLight: require('../assets/fonts/NotoSansJP-ExtraLight.ttf'),
    NotoSansExtraBold: require('../assets/fonts/NotoSansJP-ExtraBold.ttf'),
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterBlack: require('../assets/fonts/Inter-Black.ttf'),
    InterExtraBold: require('../assets/fonts/Inter-ExtraBold.ttf'),
    InterExtraLight: require('../assets/fonts/Inter-ExtraLight.ttf'),
    InterLight: require('../assets/fonts/Inter-Light.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterThin: require('../assets/fonts/Inter-Thin.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(tabs)/landing">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}