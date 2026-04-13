import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native"
import { api } from "../api/client"

export default function Register({ navigation }: any) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Completa todos los campos")
      return
    }

    try {
      await api.post("/users", {
        name,
        email,
        password
      })

      Alert.alert("OK", "Usuario creado")

      navigation.navigate("Login")

    } catch (error) {
      console.log(error)
      Alert.alert("Error", "No se pudo crear")
    }
  }

  return (
    <View style={{ flex:1, padding:20, backgroundColor:"#F3F4F6" }}>

      <Text style={{ fontSize:24, fontWeight:"bold" }}>
        Create Account
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ backgroundColor:"#fff", padding:12, borderRadius:12, marginTop:15 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor:"#fff", padding:12, borderRadius:12, marginTop:10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ backgroundColor:"#fff", padding:12, borderRadius:12, marginTop:10 }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor:"#6D28D9",
          padding:15,
          borderRadius:30,
          marginTop:20
        }}
      >
        <Text style={{ color:"#fff", textAlign:"center" }}>
          Register
        </Text>
      </TouchableOpacity>

    </View>
  )
}