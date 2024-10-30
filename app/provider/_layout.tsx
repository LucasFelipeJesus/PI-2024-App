// profiles
// -- _layout.tsx
// -- (tabs)
// ---- _layout.tsx
// ---- index.tsx
// ---- configuration.tsx

import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}