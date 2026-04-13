import { useState, useCallback } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { api } from "../api/client"
import { useUser } from "../context/UserContext"

export default function Tasks({ navigation }: any) {
  const [tasks, setTasks] = useState<any[]>([])
  const { user } = useUser()

  const getTasks = async () => {
    const res = await api.get("/tasks")
    setTasks(res.data)
  }

  useFocusEffect(
    useCallback(() => {
      getTasks()
    }, [])
  )

  const handleAccept = async (taskId: number) => {
    const res = await api.post("/matches", {
      user_id: user.id,
      task_id: taskId
    })

    navigation.navigate("Chat", { matchId: res.data.id })
  }

  const renderItem = ({ item }: any) => (
    <View style={{
      backgroundColor:"#fff",
      borderRadius:20,
      marginBottom:20,
      overflow:"hidden"
    }}>
      <Image
        source={{ uri: "https://picsum.photos/400/200" }}
        style={{ width:"100%", height:180 }}
      />

      <View style={{ padding:15 }}>
        <Text style={{ fontWeight:"bold" }}>{item.title}</Text>
        <Text style={{ color:"#6B7280" }}>{item.description}</Text>

        <TouchableOpacity
          onPress={()=>handleAccept(item.id)}
          style={{
            backgroundColor:"#6D28D9",
            padding:12,
            borderRadius:25,
            marginTop:10
          }}
        >
          <Text style={{ color:"#fff", textAlign:"center" }}>
            Accept Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 20 }}>

      {/* HEADER */}
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        Find your next{" "}
        <Text style={{ color: "#6D28D9" }}>opportunity</Text>
      </Text>

      <Text style={{ color: "#6B7280", marginBottom: 15 }}>
        Browse tasks happening now
      </Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Search..."
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          marginBottom: 20
        }}
      />

      {/* LIST */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}