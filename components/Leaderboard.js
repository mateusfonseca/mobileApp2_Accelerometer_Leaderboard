// This file defines the Leaderboard component of the application.
// It renders a component that displays a leaderboard containing all the users
// in the database ranked by their movement score. It also calculates the score
// of the currently logged-in user and refreshes the list every minute.

import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { isArray } from "firebase-admin/lib/utils/validator";

// Calculates movement score from collected accelerometer data
function calculateScore(accelerometer_data) {
  // checks if variable is an array of size s such that 1 <= s <= 1000
  if (!isArray(accelerometer_data) || accelerometer_data.length < 1 || accelerometer_data.length > 1000)
    return -1;

  // checks if every element of the array is an object with 3 properties and each property is a number
  // accelerometer_data: [...{x: float, y: float, z: float}]
  accelerometer_data.forEach(el => {
    if (Object.keys(el).length === 3) {
      Object.values(el).forEach(val => {
        if (isNaN(val)) return -1;
      });
    } else {
      return -1;
    }
  });

  // Formula: movement score = Σ(Σ|x| + Σ|y| + Σ|z|)/n
  return (accelerometer_data.reduce((acc, val) =>
      acc + Object.values(val).reduce((acc, val) =>
        acc + Math.abs(val), 0,
      ), 0,
  ) / accelerometer_data.length).toFixed(2);
}

// Component Leaderboard
export default function Leaderboard(props) { // props from Main
  const route = useRoute(); // route prop from Main
  const navigation = useNavigation(); // navigation prop from Main

  const [users, setUsers] = useState([]);
  const [userId] = useState(route.params.userId);
  const [update, setUpdate] = useState(props.value); // updates user details if changed
  const [refresh, setRefresh] = useState(false); // signal for refreshing the board after 1 minute
  const [timer, setTimer] = useState(0); // tracks refresher's timer

  // fetch all users' data from the database
  // watches both refresh, for when the time is up, and
  // update, for when logged-in user's details change
  useEffect(() => {
    const fetchUsers = async () => {
      await firestore().collection("Users").get()
        .then(querySnapshot => {
          let userArr = [];
          querySnapshot.forEach(user => {
            userArr.push({
              id: user.id,
              name: user.data().name,
              score: calculateScore(user.data().accelerometer_data),
            });
          });
          setUsers(userArr);
        });
    };

    fetchUsers().catch(console.error);
  }, [refresh, update]);

  // sends update signal if there has been a change
  if (update !== props.value) setUpdate(props.value);

  // sends refresh signal every minute and updates the timer display every second
  // watches users so that when it changes, the timer is reset
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevState => {
        if (prevState < 59)
          return prevState + 1;
        else {
          setRefresh(!refresh);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [users]);

  // leaderboard
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
          data={users.sort((a, b) => b.score - a.score)} // sorts list by score from highest to lowest
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => navigation.navigate("User Details", { userId: item.id })}>
              <View
                style={[
                  { flexDirection: "row" },
                  index % 2 === 0 ? { backgroundColor: "tomato" } : { backgroundColor: "auto" },
                  item.id === userId ? { backgroundColor: "green" } : null, // greens current user
                ]}>
                <Text style={{ flex: 1, textAlign: "center" }}>{index + 1}</Text>
                <Text style={{ flex: 5, textAlign: "center" }}>{item.name}</Text>
                {item.score < 0 ? (
                  <Text style={{ flex: 1, textAlign: "center" }}>N/A</Text> // if calculateScore returned -1
                ) : (
                  <Text style={{ flex: 1, textAlign: "center" }}>{item.score}</Text>
                )}
              </View>
            </TouchableOpacity>
          }
          estimatedItemSize={200} // helps FlashList manage memory when recycling
        />
      )}
      <View style={{ padding: 20, backgroundColor: "tomato", flexDirection: "row" }}>
        <Text style={{ flex: 1, textAlign: "center" }}>Last refreshed {timer}s ago</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Refreshing in {60 - timer}s</Text>
      </View>
    </View>
  );
}
