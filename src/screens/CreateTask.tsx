import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native"
import { api } from "../api/client"
import { useUser } from "../context/UserContext"

export default function CreateTask({ navigation }: any) {

  // 🔥 TODOS LOS HOOKS ARRIBA
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const handleCreate = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Completa todos los campos")
      return
    }

    try {
      setLoading(true)

      await api.post("/tasks", {
        title,
        description,
        user_id: user?.id
      })

      Alert.alert("OK", "Task creada")
      navigation.goBack()

    } catch (error) {
      console.log(error)
      Alert.alert("Error", "No se pudo crear")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F3F4F6" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Post a Task
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          marginTop: 15
        }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          marginTop: 10,
          height: 100
        }}
      />

      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: "#6D28D9",
          padding: 15,
          borderRadius: 30,
          marginTop: 20
        }}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={{ color: "#fff", textAlign: "center" }}>
              Create Task
            </Text>
        }
      </TouchableOpacity>
    </ScrollView>
  )
}