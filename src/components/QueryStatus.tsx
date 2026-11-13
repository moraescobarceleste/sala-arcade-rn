import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado';
}

interface LoadingViewProps {
  label?: string;
}

export function LoadingView({ label = 'Cargando...' }: LoadingViewProps) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={COLORS.token} />
      <Text style={styles.hint}>{label}</Text>
    </View>
  );
}

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>No pudimos cargar los datos</Text>
      <Text style={styles.hint}>{message}</Text>
      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonLabel}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.ink,
  },
  title: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '700',
    color: COLORS.bone,
    textAlign: 'center',
  },
  hint: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.token,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  buttonPressed: {
    opacity: 0.6,
    backgroundColor: COLORS.tokenDark,
  },
  buttonLabel: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.bone,
  },
});
