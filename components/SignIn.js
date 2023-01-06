import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, TextInput, AppState, Dimensions, ToastAndroid } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { accelerometer, SensorTypes, setUpdateIntervalForType } from "react-native-sensors";
import firestore from "@react-native-firebase/firestore";
import { FlashList } from "@shopify/flash-list";
import Leaderboard from "./Leaderboard";

export function onSignIn(email, password) {
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

export default function SignIn() {
  const emailDomain = "@student.dorset-college.ie";
  const navigation = useNavigation()

  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);

  console.log(navigation.getState().routeNames)

  return (
    <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
      <View style={{ flexDirection: "row"}}>
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