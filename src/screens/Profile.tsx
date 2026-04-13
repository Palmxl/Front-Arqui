import { View, Text, Image, ScrollView } from "react-native"
import { useUser } from "../context/UserContext"

export default function Profile() {
  const { user } = useUser()

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 20 }}>

      {/* HEADER */}
      <Text style={{
        fontSize: 20,
        fontWeight: "bold",
        color: "#6D28D9",
        marginBottom: 15
      }}>
        QuickTask
      </Text>

      {/* CARD */}
      <View style={{
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 20,
        elevation: 5
      }}>

        {/* USER INFO */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />

          <Text style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 10
          }}>
            {user?.name || "User"}
          </Text>

          <Text style={{ color: "#6B7280" }}>
            {user?.email}
          </Text>

          {/* BADGE */}
          <View style={{
            backgroundColor: "#10B981",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 10,
            marginTop: 8
          }}>
            <Text style={{ color: "#fff", fontSize: 12 }}>
              VERIFIED
            </Text>
          </View>
        </View>

        {/* STATS */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20
        }}>
          <Stat title="Tasks" value="342" />
          <Stat title="Earnings" value="$12.4k" />
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10
        }}>
          <Stat title="Success" value="99%" />
          <Stat title="Spent" value="$2.1k" />
        </View>

      </View>

      {/* TASKS LIST */}
      <Text style={{
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20
      }}>
        My Active Tasks
      </Text>

      <TaskItem title="Install Kitchen" price="$145" />
      <TaskItem title="Grocery Delivery" price="$28" />
      <TaskItem title="IKEA Assembly" price="$85" />

    </ScrollView>
  )
}

const Stat = ({ title, value }: any) => (
  <View style={{
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 15,
    width: "48%"
  }}>
    <Text style={{ color: "#6B7280" }}>{title}</Text>
    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{value}</Text>
  </View>
)

const TaskItem = ({ title, price }: any) => (
  <View style={{
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    elevation: 3
  }}>
    <Text style={{ fontWeight: "bold" }}>{title}</Text>
    <Text style={{ color: "#6D28D9", marginTop: 5 }}>
      {price}
    </Text>
  </View>
)