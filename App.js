import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import auth, { firebase } from "@react-native-firebase/auth";
import UserDetails from "./components/UserDetails";
import { LogBox } from "react-native";
import DataForm from "./components/DataForm";

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  // const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [justSignedUp, setJustSignedUp] = useState(false);

  function onAuthStateChanged(user) {
    setUser(user);
    // if (userChanged) setUserEmail(userChanged.email);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Main" : "Sign In"}
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "tomato" },
        }}
      >
        {!user ?
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            options={{
              title: "Sign In",
              headerBackButtonMenuEnabled: false,
            }}
          /> :
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: `Welcome ${user.email.substring(0, user.email.indexOf("@"))}`,
              headerBackButtonMenuEnabled: false,
            }}
            initialParams={{ userEmail: user.email, justSignedUp: justSignedUp }}
          />
        }
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{
            title: "Sign Up",
          }}
        />
        <Stack.Screen
          name="Data Form"
          component={DataForm}
          options={{
            title: "Data Form",
            headerBackButtonMenuEnabled: false,
          }}
        />
        <Stack.Screen
          name="User Details"
          component={UserDetails}
          options={{
            title: "User Details",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
