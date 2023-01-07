// This file defines the DataForm component of the application.
// It renders a form that collects extra details from the newly created user
// immediately after registration. It may be skipped as details can be updated later.

import { Button, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { updateDetails } from "./AccountDetails";
import { styles } from "../App";

// Component DataForm
export default function DataForm({ route }) { // route prop from SignUp
  const navigation = useNavigation(); // navigation prop from SignUp

  const [user, setUser] = useState({ name: "", course: "", year: 0 });

  // data form
  return (
    <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
      <TextInput style={styles.textInput}
                 cursorColor={"navy"}
                 placeholder={"Name"}
                 onChangeText={val => setUser({ ...user, name: val })}
      />
      <TextInput style={styles.textInput}
                 cursorColor={"navy"}
                 placeholder={"Course"}
                 onChangeText={val => setUser({ ...user, course: val })}
      />
      <TextInput style={styles.textInput}
                 cursorColor={"navy"}
                 keyboardType={"numeric"}
                 placeholder={"Year"}
                 onChangeText={val => setUser({ ...user, year: Number(val) })}
      />
      <Text />
      <Button
        color={"navy"}
        title={"Submit"}
        onPress={() => {
          updateDetails(user, route.params.id); // update details to the database
          navigation.navigate("Main"); // goes to Main page after registration
        }}
      />
      <Text />
      <Button
        title={"Not now"}
        onPress={() => navigation.navigate("Main")} // goes to Main page after registration
      />
    </View>
  );
}
