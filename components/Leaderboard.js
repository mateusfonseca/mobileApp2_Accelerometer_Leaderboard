import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { isArray } from "firebase-admin/lib/utils/validator";

function calculateScore(accelerometer_data) {
  if (!isArray(accelerometer_data))
    return -1;

  if (accelerometer_data.length < 1)
    return -1;

  if (accelerometer_data.length > 1000)
    return -1;

  // movement score = Σ(Σ|x| + Σ|y| + Σ|z|)/n
  return (accelerometer_data.reduce((acc, val) =>
      acc + Object.values(val).reduce((acc, val) =>
        acc + Math.abs(val), 0,
      ), 0,
  ) / accelerometer_data.length).toFixed(2);
}

export default function Leaderboard(props) {
  const route = useRoute();
  console.log("Leaderboard route: " + props.value);

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(route.params.userId);
  const [usersLength, setUsersLength] = useState(null);
  const [update, setUpdate] = useState(props.value);
  const [refresh, setRefresh] = useState(0);
  const [timer, setTimer] = useState(0);

  console.log("in leaderboard 1: " + props.value);
  console.log("in leaderboard 2: " + update);

  useEffect(() => {
    console.log("New query!!!");
    const fetchUsers = async () => {
      console.log("LB: Querying!!!");
      await firestore().collection("Users").get()
        .then(querySnapshot => {
          // console.log("Users exists: ", querySnapshot.exists);
          // setUsersLength(querySnapshot.size)
          // if (querySnapshot.exists) {
          //   console.log("Users data: ", querySnapshot.data());
          // setUsers([]);
          let userArr = [];
          querySnapshot.forEach(user => {
            // console.log(user.data())
            console.log("Inside here!!!");
            // setAccData(prevState => { return [...prevState, ...[{x, y, z}]] });
            // setUsers(prevState => { return [...prevState, ...[{id: user.id, name: user.data().name, score: calculateScore(user.data().accelerometer_data)}]] })
            userArr.push({
              id: user.id,
              name: user.data().name,
              score: calculateScore(user.data().accelerometer_data),
            });
          });
          setUsers(userArr);
          // setUpdate(!update);
          // }
        });
    };

    fetchUsers().catch(console.error);
  }, [refresh, update]);

  // useEffect(() => {
  //   console.log("LB: Updating...")
  //   const fetchUserDoc = async () => {
  //     await firestore().collection("Users").doc(userId).get()
  //       .then(documentSnapshot => {
  //         // console.log("User exists: ", documentSnapshot.exists);
  //
  //         if (documentSnapshot.exists) {
  //           let userArr = users;
  //           userArr.forEach((user, index) => { if (user.id === userId) userArr[index] = documentSnapshot.data() })
  //           setUsers(userArr);
  //         }
  //       });
  //   };
  //
  //   fetchUserDoc().catch(console.error);
  // }, [update]);

  console.log("Comp: " + (update !== props.value).toString());
  if (update !== props.value) setUpdate(props.value);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevState => {
        if (prevState < 59)
          return prevState + 1;
        else {
          setRefresh(refresh+1);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [users]);

  const navigation = useNavigation();

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ padding: 20, backgroundColor: "tomato", flexDirection: "row" }}>
        <Text style={{ flex: 1, textAlign: "center" }}>Rank</Text>
        <Text style={{ flex: 5, textAlign: "center" }}>Name</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Score</Text>
      </View>
      {users.length === 0 ? <ActivityIndicator style={{ flex: 1 }} size={"large"} /> : (
        <FlashList
          contentContainerStyle={{ padding: 20 }}
          // ListHeaderComponent={Header}
          data={users.sort((a, b) => b.score - a.score)}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => navigation.navigate("User Details", { userId: item.id })}>
              <View
                style={[
                  { flexDirection: "row" },
                  index % 2 === 0 ? { backgroundColor: "tomato" } : { backgroundColor: "auto" },
                  item.id === userId ? { backgroundColor: "green" } : null,
                ]}>
                <Text style={{ flex: 1, textAlign: "center" }}>{index + 1}</Text>
                <Text style={{ flex: 5, textAlign: "center" }}>{item.name}</Text>
                {item.score < 0 ? (
                  <Text style={{ flex: 1, textAlign: "center" }}>N/A</Text>
                ) : (
                  <Text style={{ flex: 1, textAlign: "center" }}>{item.score}</Text>
                )}
                {/*<Text>{item.year}</Text>*/}
              </View>
            </TouchableOpacity>
          }
          estimatedItemSize={200}
        />
      )}
      <View style={{ padding: 20, backgroundColor: "tomato", flexDirection: "row" }}>
        <Text style={{ flex: 1, textAlign: "center" }}>Last refreshed {timer}s ago</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Refreshing in {60 - timer}s</Text>
      </View>
    </View>
  );

}
