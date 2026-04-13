import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native"
import { api } from "../api/client"
import { useUser } from "../context/UserContext"

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { setUser } = useUser()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Completa los campos")
      return
    }

    try {
      setLoading(true)

      const res = await api.get("/users")

      // 🔥 buscar usuario por email
      const foundUser = res.data.find(
        (u: any) => u.email === email
      )

      if (!foundUser) {
        Alert.alert("Error", "Usuario no encontrado")
        return
      }

      // 🔥 guardar usuario real
      setUser(foundUser)

      navigation.navigate("Main")

    } catch (error) {
      console.log(error)
      Alert.alert("Error", "No conecta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F3F4F6"
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 25,
          borderRadius: 25,
          elevation: 6
        }}
      >
        {/* TITLE */}
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            textAlign: "center",
            color: "#6D28D9"
          }}
        >
          QuickTask
        </Text>

        {/* EMAIL */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "#F3F4F6",
            padding: 12,
            borderRadius: 12,
            marginTop: 15
          }}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: "#F3F4F6",
            padding: 12,
            borderRadius: 12,
            marginTop: 10
          }}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#6D28D9",
            padding: 15,
            borderRadius: 30,
            marginTop: 20
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        {/* REGISTER LINK */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#6D28D9",
              fontWeight: "bold"
            }}
          >
            Create account
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}