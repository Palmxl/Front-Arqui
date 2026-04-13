import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Tasks from "../screens/Tasks"
import CreateTask from "../screens/CreateTask"
import Chat from "../screens/Chat"
import { Text } from "react-native"
import Profile from "../screens/Profile"

const Tab = createBottomTabNavigator()

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70
        }
      }}
    >
      <Tab.Screen name="Explore" component={Tasks} />
      <Tab.Screen name="Create" component={CreateTask} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}