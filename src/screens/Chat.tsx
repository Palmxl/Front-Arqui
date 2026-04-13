import { useEffect, useRef, useState } from "react"
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native"
import { api } from "../api/client"
import { useUser } from "../context/UserContext"

export default function Chat({ route }: any) {
  const matchId = route.params.matchId
  const { user } = useUser()

  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState("")

  const flatListRef = useRef<any>(null)

  useEffect(() => {
    if (matchId) getMessages()
  }, [matchId])

  const getMessages = async () => {
    try {
      const res = await api.get(`/messages?match_id=${matchId}`)
      setMessages(res.data)

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    } catch (err) {
      console.log(err)
    }
  }

  const sendMessage = async () => {
    if (!text.trim()) return

    await api.post("/messages", {
      match_id: matchId,
      content: text,
      user_id: user?.id
    })

    setText("")
    getMessages()
  }

  const renderItem = ({ item }: any) => {
    const isMine = item.user_id === user?.id

    return (
      <View
        style={{
          alignSelf: isMine ? "flex-end" : "flex-start",
          backgroundColor: isMine ? "#6D28D9" : "#FFFFFF",
          padding: 14,
          borderRadius: 18,
          marginBottom: 10,
          maxWidth: "75%",
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 5,
          elevation: 2
        }}
      >
        <Text
          style={{
            color: isMine ? "#fff" : "#111",
            fontSize: 14
          }}
        >
          {item.content}
        </Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F3F4F6" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

      {/* HEADER */}
      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderColor: "#E5E7EB"
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Chat
        </Text>
      </View>

      {/* CHAT BODY */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) =>
          item.id?.toString() || Math.random().toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1,
          justifyContent:
            messages.length === 0 ? "center" : "flex-start"
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              color: "#9CA3AF",
              fontSize: 14
            }}
          >
            No messages yet 👀
          </Text>
        }
      />

      {/* INPUT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#E5E7EB"
        }}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write a message..."
          style={{
            flex: 1,
            backgroundColor: "#F3F4F6",
            borderRadius: 25,
            paddingHorizontal: 15,
            height: 45,
            fontSize: 14
          }}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: "#6D28D9",
            paddingHorizontal: 18,
            height: 45,
            justifyContent: "center",
            borderRadius: 25,
            marginLeft: 8
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}