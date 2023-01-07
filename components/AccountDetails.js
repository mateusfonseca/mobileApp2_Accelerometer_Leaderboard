// This file defines the AccountDetails component of the application.
// It renders a screen that displays the currently logged-in user's details
// and lets the user change them, and allows signing-out.

import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator, Button, Image, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { styles } from "../App";

// Updates user details to the database.
// It is exported so that it can be called in the DataForm component too.
export function updateDetails(user, userId) {
  firestore()
    .collection("Users")
    .doc(userId)
    .update({
      name: user.name,
      course: user.course,
      year: user.year,
    })
    .then(() => {
      console.log("User updated!");
    });
}

// Component AccountDetails
export default function AccountDetails(props) { // props from Main
  const emailDomain = "@student.dorset-college.ie";
  const route = useRoute(); // route prop from Main

  const [userId] = useState(route.params.userId);
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(null); // tracks changes to user details as they happen
  const [updateMode, setUpdateMode] = useState(false); // tracks display type mode
  const [update, setUpdate] = useState(props.value); // tracks whether content has changed and needs be updated

  // fetches users details from the database and watches for local changes
  // which, once submitted, can be re-fetched to update the display
  useEffect(() => {
    const fetchUserDoc = async () => {
      await firestore().collection("Users").doc(userId).get()
        .then(documentSnapshot => {
          console.log("User exists: ", documentSnapshot.exists);

          if (documentSnapshot.exists) {
            console.log("User data: ", documentSnapshot.data());
            setUser(documentSnapshot.data());
            setChange(documentSnapshot.data());
          }
        });
    };

    fetchUserDoc().catch(console.error);
  }, [update]);

  if (updateMode) { // if in update mode, allow text input
    return (
      <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
        {!user ? <ActivityIndicator style={{ flex: 1 }} size={"large"} /> : (
          <View>
            <TextInput style={styles.textInput}
                       cursorColor={"navy"}
                       placeholder={"Name: " + user.name}
                       onChangeText={val => setChange({ ...change, name: val })}
            />
            <TextInput style={styles.textInput}
                       cursorColor={"navy"}
                       placeholder={"Course: " + user.course}
                       onChangeText={val => setChange({ ...change, course: val })}
            />
            <TextInput style={styles.textInput}
                       cursorColor={"navy"}
                       keyboardType={"numeric"}
                       placeholder={"Year: " + user.year.toString()}
                       onChangeText={val => setChange({ ...change, year: Number(val) })}
            />
            <Text />
            <Button
              color={"navy"}
              title={"Save Changes"}
              onPress={() => {
                props.onChangeValue(!update); // send update signal back to Main
                setUpdate(!update); // turns on update signal
                updateDetails(change, userId); // updates to database
                setUpdateMode(false); // leaves update mode
              }}
            />
            <Text />
            <Button title={"Cancel"} onPress={() =>
              setUpdateMode(false) // leaves update mode
            }
            />
          </View>
        )}
      </View>
    );
  } else { // if not in update mode, only display
    return (
      <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
        {!user ? <ActivityIndicator style={{ flex: 1 }} size={"large"} /> : (
          <View>
            <Image source={{ uri: "https://thispersondoesnotexist.com/image" }}
                   style={{ width: 200, height: 200, borderRadius: 200 / 2, marginBottom: 10, alignSelf: "center" }} />
            <Text style={{ paddingBottom: 5, textAlign: "center", fontWeight: "bold", fontSize: 18 }}>{user.name}</Text>
            <Text style={{ paddingBottom: 5, textAlign: "center", fontWeight: "bold", fontSize: 16 }}>ID {userId}</Text>
            <Text style={{ paddingBottom: 5, textAlign: "center" }}>{userId + emailDomain}</Text>
            <Text style={{ paddingBottom: 5, textAlign: "center" }}>{user.course}</Text>
            <Text style={{ paddingBottom: 20, textAlign: "center" }}>Year {user.year}</Text>
            <Button
              color={"navy"}
              title={"Update Details"}
              onPress={() => {
                setUpdateMode(true); // enters update mode
              }}
            />
            <Text />
            <Button title={"Sign Out"} onPress={() =>
              auth()
                .signOut()
                .then(() => console.log("User signed out!"))}
            />
          </View>
        )}
      </View>
    );
  }
}
