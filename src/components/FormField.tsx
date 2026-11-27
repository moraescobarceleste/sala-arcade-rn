import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

type Props<T extends FieldValues> = TextInputProps & {
  control: Control<T, any, any>;
  name: Path<T>;
  label: string;
};

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={value == null ? '' : String(value)}
            onChangeText={onChange}
            onBlur={onBlur}
            {...inputProps}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontWeight: '600', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  inputError: { borderColor: '#d32f2f' },
  error: { color: '#d32f2f', marginTop: 4 },
});
