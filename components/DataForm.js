import auth from "@react-native-firebase/auth";
import { ActivityIndicator, Button, Text, TextInput, ToastAndroid, View } from "react-native";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { onSignIn } from "./SignIn";
import { updateDetails } from "./AccountDetails";

export default function DataForm({route}) {
  const emailDomain = "@student.dorset-college.ie";
  const navigation = useNavigation();

  const [user, setUser] = useState({name: "", course: "", year: 0});

  console.log(navigation.getState().routes)

  return (
    <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
      <TextInput style={{ padding: 1, textAlign: "center" }}
                 placeholder={"Name"}
                 onChangeText={val => setUser({ ...user, name: val })}
      />
      <TextInput style={{ padding: 1, textAlign: "center" }}
                 placeholder={"Course"}
                 onChangeText={val => setUser({ ...user, course: val })}
      />
      <TextInput style={{ padding: 1, paddingBottom: 19, textAlign: "center" }}
                 placeholder={"Year"}
                 onChangeText={val => setUser({ ...user, year: Number(val) })}
      />
      <Button
        title={"Submit"}
        onPress={() => {
          // console.log(user.name)
          // console.log(user.course)
          // console.log(user.year)
          // console.log(route.params.id)
          updateDetails(user, route.params.id);
          navigation.navigate("Main");
        }}
      />
      <Text />
      <Button
        title={"Not now"}
        onPress={() => navigation.navigate("Main") }
      />
    </View>
  );
}
