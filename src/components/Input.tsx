import { TextInput } from "react-native"

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

export default function Input({ placeholder, value, onChangeText }: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10
      }}
    />
  )
}