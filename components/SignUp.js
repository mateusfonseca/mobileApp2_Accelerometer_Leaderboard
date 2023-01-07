// This file defines the SignUp component of the application.
// It renders a component that displays a simple sign-up form which
// the user can use to create an account with an email address
// and a password.

import auth from "@react-native-firebase/auth";
import { Button, Text, TextInput, ToastAndroid, View } from "react-native";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../App";

// Component SignUp
export default function SignUp() {
  const emailDomain = "@student.dorset-college.ie";
  const navigation = useNavigation(); // navigation prop from SignIn

  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);

  // Registers user to the database
  function onSignUp(email, password) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");

        firestore()
          .collection("Users")
          .doc(email.substring(0, email.indexOf("@")))
          .set({
            name: "",
            course: "",
            year: 0,
            accelerometer_data: [],
          })
          .then(() => {
            console.log("User added!");
            navigation.navigate("Data Form", { id: id }); // goes to DataForm to finish registration
          });
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
        ToastAndroid.show("This email is already in use! Please, try another.", ToastAndroid.LONG);
      });
  }

  // sign-up form
  return (
    <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          cursorColor={"navy"}
          style={styles.textInput}
          keyboardType={"numeric"}
          placeholder={"Student ID"}
          onChangeText={setId}
        />
        <Text style={styles.emailDomain}>
          {emailDomain}
        </Text>
      </View>
      <TextInput
        cursorColor={"navy"}
        style={styles.textInput}
        placeholder={"Password"}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Text />
      <Button
        color={"navy"}
        title={"Sign Up"}
        onPress={() => {
          if (!id || !password || isNaN(id))
            ToastAndroid.show("Invalid email and/or password! Please, try again.", ToastAndroid.LONG);
          else {
            onSignUp(id + emailDomain, password);
          }
        }}
      />
    </View>
  );
}
