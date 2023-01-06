import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator, Button, TextInput, View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

export default function UserDetails() {
  const emailDomain = "@student.dorset-college.ie";

  const route = useRoute();
  const [userId, setUserId] = useState(route.params.userId);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDoc = async () => {
      await firestore().collection("Users").doc(userId).get()
        .then(documentSnapshot => {
          console.log("User exists: ", documentSnapshot.exists);

          if (documentSnapshot.exists) {
            console.log("User data: ", documentSnapshot.data());
            setUser(documentSnapshot.data());
          }
        });
    };

    fetchUserDoc().catch(console.error);
  }, []);

  return (
    <View style={{ padding: 20, alignSelf: "center", minWidth: 300 }}>
      {!user ? <ActivityIndicator style={{ flex: 1 }} size={"large"} /> : (
        <View>
          <Image source={{ uri: 'https://thispersondoesnotexist.com/image?' + new Date() }} style={{width: 200, height: 200, borderRadius: 200/ 2, marginBottom: 10, alignSelf: "center"}} />
          <Text style={{ paddingBottom: 5, textAlign: "center" }}>{user.name}</Text>
          <Text style={{ paddingBottom: 5, textAlign: "center" }}>ID {userId}</Text>
          <Text style={{ paddingBottom: 5, textAlign: "center" }}>{userId+emailDomain}</Text>
          <Text style={{ paddingBottom: 5, textAlign: "center" }}>{user.course}</Text>
          <Text style={{ paddingBottom: 20, textAlign: "center" }}>Year {user.year}</Text>
        </View>
      )}
    </View>
  );
}
