// This file defines the SignIn component of the application.
// It renders a component that displays a simple sign-in form which
// the user can use to log-into the application with an email address
// and a password.

import React, { useState } from "react";
import { Button, Text, TextInput, ToastAndroid, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

// Authenticates user against data stored in the database.
function onSignIn(email, password) {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User account created & signed in!");
    })
    .catch(error => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
    });
}

// Component SignIn
export default function SignIn() {
  const emailDomain = "@student.dorset-college.ie";
  const navigation = useNavigation(); // navigation prop from App

  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);

  // sign-in form
  return (
    <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder={"Student ID"}
          onChangeText={setId}
        />
        <Text style={{ textAlignVertical: "center" }}>
          {emailDomain}
        </Text>
      </View>
      <TextInput
        placeholder={"Password"}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button
        title={"Sign In"}
        onPress={() => {
          if (!id || !password || isNaN(id))
            ToastAndroid.show("Invalid email and/or password! Please, try again.", ToastAndroid.LONG);
          else
            onSignIn(id + emailDomain, password);
        }}
      />
      <Text />
      <Button
        title={"Sign Up"}
        onPress={() => navigation.navigate("Sign Up")} />
    </View>
  );
}
