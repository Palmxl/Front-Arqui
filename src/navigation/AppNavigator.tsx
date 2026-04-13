import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../screens/Home"
import Login from "../screens/Login"
import Tasks from "../screens/Tasks"
import Chat from "../screens/Chat"
import CreateTask from "../screens/CreateTask"
import BottomTabs from "./BottomTabs"
import { UserProvider } from "../context/UserContext"
import Register from "../screens/Register"

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}