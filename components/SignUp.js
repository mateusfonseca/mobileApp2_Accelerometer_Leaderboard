import auth from "@react-native-firebase/auth";
import { ActivityIndicator, Button, Text, TextInput, ToastAndroid, View } from "react-native";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { onSignIn } from "./SignIn";

export default function SignUp(props) {
  const emailDomain = "@student.dorset-college.ie";
  const navigation = useNavigation();

  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const root = navigation.getState().routeNames[0];

  // console.log(navigation.getState().routeNames)

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
            navigation.navigate("Data Form", { id: id });
          })
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
        title={"Sign Up"}
        onPress={() => {
          if (!id || !password || isNaN(id))
            ToastAndroid.show("Invalid email and/or password! Please, try again.", ToastAndroid.LONG);
          else {
            onSignUp(id + emailDomain, password);







              // .then(() => props.onSignUp(true))
              // .then(() => console.log(navigation.getState().routeNames))
              // .then(() => navigation.navigate(navigation.getState().routeNames[0]));
              // .then(() => {
              //   try {
              //     console.log("Using Main")
              //     navigation.navigate("Main");
              //   } catch {
              //     console.log("Using Sign In")
              //     navigation.navigate("Sign In");
              //   }
              // });
          }
        }}
      />
    </View>
  );
}
