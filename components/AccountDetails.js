import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator, Button, Image, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

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

export default function AccountDetails(props) {
  const emailDomain = "@student.dorset-college.ie";

  const route = useRoute();
  console.log("AccountDetails route: " + props.value);
  const [userEmail, setUserEmail] = useState(route.params.userEmail);
  const [userId, setUserId] = useState(route.params.userId);
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [update, setUpdate] = useState(props.value);

  // console.log("Here!!!" + userEmail)
  // console.log("Here!!!" + userId)
  if (user) console.log("ACC1: " + user.name);
  if (change) console.log("ACC2: " + change.name);
  if (user) console.log("ACC3: " + props.value);
  if (change) console.log("ACC4: " + update);

  // const userId = user.email.substring(0, user.email.indexOf("@"));

  useEffect(() => {
    const fetchUserDoc = async () => {
      await firestore().collection("Users").doc(userId).get()
        .then(documentSnapshot => {
          console.log("User exists: ", documentSnapshot.exists);

          if (documentSnapshot.exists) {
            console.log("User data: ", documentSnapshot.data());
            setUser(documentSnapshot.data());
            setChange(documentSnapshot.data());
            // setUpdate(!update);
          }
        });
    };

    fetchUserDoc().catch(console.error);
  }, [update]);

  if (updateMode) {
    return (
      <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
        {!user ? <ActivityIndicator style={{ flex: 1 }} size={"large"} /> : (
          <View>
            <TextInput style={{ padding: 1, textAlign: "center" }}
                       placeholder={user.name}
                       onChangeText={val => setChange({ ...change, name: val })}
            />
            <TextInput style={{ padding: 1, textAlign: "center" }}
                       placeholder={user.course}
                       onChangeText={val => setChange({ ...change, course: val })}
            />
            <TextInput style={{ padding: 1, paddingBottom: 19, textAlign: "center" }}
                       placeholder={user.year.toString()}
                       onChangeText={val => setChange({ ...change, year: Number(val) })}
            />
            <Button
              title={"Save Changes"}
              onPress={() => {
                props.onChangeValue(!update);
                setUpdate(!update);
                updateDetails(change, userId);
                setUpdateMode(false);
              }}
            />
            <Text />
            <Button title={"Cancel"} onPress={() =>
              setUpdateMode(false)
            }
            />
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
        {!user ? <ActivityIndicator style={{ flex: 1 }} size={"large"} /> : (
          <View>
            <Image source={{ uri: "https://thispersondoesnotexist.com/image" }}
                   style={{ width: 200, height: 200, borderRadius: 200 / 2, marginBottom: 10, alignSelf: "center" }} />
            <Text style={{ paddingBottom: 5, textAlign: "center" }}>{user.name}</Text>
            <Text style={{ paddingBottom: 5, textAlign: "center" }}>ID {userId}</Text>
            <Text style={{ paddingBottom: 5, textAlign: "center" }}>{userId + emailDomain}</Text>
            <Text style={{ paddingBottom: 5, textAlign: "center" }}>{user.course}</Text>
            <Text style={{ paddingBottom: 20, textAlign: "center" }}>Year {user.year}</Text>
            <Button
              title={"Update Details"}
              onPress={() => {
                setUpdateMode(true);
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
