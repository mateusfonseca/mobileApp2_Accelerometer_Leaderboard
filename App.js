// This file defines the entry-point component of the application.
// It checks whether there is a user session to be restored and creates the screen stack accordingly.

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import auth from "@react-native-firebase/auth";
import UserDetails from "./components/UserDetails";
import { LogBox, StyleSheet } from "react-native";
import DataForm from "./components/DataForm";

const Stack = createNativeStackNavigator(); // creates stack for navigation management
LogBox.ignoreAllLogs(); // log boxes such as warnings and errors don't get displayed on the screen, but still get logged to the console.

// Entry component App
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // set user on sign-in and sign-up (to null on sign-out)
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // set user state on first render
  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, []);

  if (initializing) return null; // wait until it finishes initializing

  // screen stack navigation
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Main" : "Sign In"} // if already logged-in start from Main, else Sign In
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "navy" },
        }}
      >
        {!user ? // if already logged-in render Main, else Sign In
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
              title: `Welcome ${user.email.substring(0, user.email.indexOf("@"))}`, // get user ID from email
              headerBackButtonMenuEnabled: false,
            }}
            initialParams={{ userEmail: user.email }} // send user email to Main
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

// StyleSheet used across the application
export const styles = StyleSheet.create({
  textInput: {
    borderStyle: "solid",
    borderColor: "navy",
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
  },
  emailDomain: {
    borderStyle: "solid",
    borderColor: "navy",
    borderWidth: 1,
    marginVertical: 5,
    textAlignVertical: "center",
    backgroundColor: "navy",
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
});
