import React, { useEffect, useRef, useState } from "react";
import { AppState, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Leaderboard from "./Leaderboard";
import AccountDetails from "./AccountDetails";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { accelerometer, SensorTypes, setUpdateIntervalForType } from "react-native-sensors";
import firestore from "@react-native-firebase/firestore";

export default function Main() {

  // console.log(route.params.user)
  const route = useRoute();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(route.params.userEmail);
  const [password, setPassword] = useState(null);
  const [update, setUpdate] = useState(false);
  const navigation = useNavigation();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(
    () => {
      const subscription = AppState.addEventListener("change", nextAppState => {
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState: " + appStateVisible);
      });
      return () => {
        subscription.remove();
      };
    },
    [],
  );

  useEffect(
    () => {
      if (appStateVisible === "active")
        console.log("I am active");
      else
        console.log("I am background");
    },
    [appStateVisible],
  );

  async function uploadAccData(data) {
    firestore()
      .collection("Users")
      .doc(userId)
      .update({
        accelerometer_data: data,
      })
      .then(() => {
        console.log("User updated!");
      });
  }

  // alpha = t / (t + dT)
  let t = 800;
  let dT = 100;
  let alpha = t / (t + dT);
  let gravity = [0, 0, 0];
  const [accData, setAccData] = useState([]);
  const [counter, setCounter] = useState(0);
  // let accData = [];
  // let counter = 0;
  useEffect(
    () => {
      let accDt = accData;
      let cnt = counter;
      if (appStateVisible === "active") {
        setUpdateIntervalForType(SensorTypes.accelerometer, dT); // defaults to 100ms
        const subscription = accelerometer
          .subscribe(({ x, y, z }) => {
            // console.log("Before: ");
            // console.log({ x, y, z });

            gravity[0] = alpha * gravity[0] + (1 - alpha) * x;
            gravity[1] = alpha * gravity[1] + (1 - alpha) * y;
            gravity[2] = alpha * gravity[2] + (1 - alpha) * z;
            x = (x - gravity[0]).toFixed(2);
            y = (y - gravity[1]).toFixed(2);
            z = (z - gravity[2]).toFixed(2);

            // setAccData(prevState => {
            //   return [...prevState, ...[{ x, y, z }]];
            // });
            // setCounter(prevCounter => prevCounter + 1);

            accDt.push({x, y, z});
            cnt++;
            console.log("Counter: " + cnt);

            if (cnt === 1000) {
              uploadAccData(accDt).catch(error => console.log(error));
              accDt = [];
              cnt = 0;
              setAccData([]);
              setCounter(0);
            }

            // console.log("After: ");
            // console.log({ x, y, z });
          });
        return () => {
          setAccData(accDt);
          setCounter(cnt);
          subscription.unsubscribe();
        };
      }
    },
    [appStateVisible],
  );

  // useEffect(
  //   () => {
  //     if (counter > 999) {
  //       console.log(`Finally! Counter is: ${counter}`);
  //       console.log(accData);
  //       firestore()
  //         .collection("Users")
  //         .doc(userId)
  //         .update({
  //           accelerometer_data: accData,
  //         })
  //         .then(() => {
  //           console.log("User updated!");
  //         });
  //       setCounter(0);
  //       setAccData([]);
  //     } else {
  //       console.log(`Counter is: ${counter}`);
  //       console.log(accData);
  //     }
  //   },
  //   [upload],
  // );

  const userEmail = email;
  console.log("Email here: " + userEmail);
  const userId = userEmail.substring(0, userEmail.indexOf("@"));

  const Tab = createMaterialTopTabNavigator();

  return (
    // <PagerView style={styles.pagerView} initialPage={route.params.page}>
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Leaderboard"
        tabBarPosition="bottom"
        screenOptions={{
          tabBarStyle: { backgroundColor: "tomato" },
        }}
      >
        <Tab.Screen
          name="Leaderboard"
          children={() => <Leaderboard value={update} />}
          initialParams={{ userId }}
          options={() => ({
            tabBarLabel: "Leaderboard",
            tabBarIcon: ({ focused, color }) => {
              color = focused ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.5)";
              return <MaterialCommunityIcons
                name="format-list-numbered"
                size={26}
                color={color}
              />;
            },
          })}
        />
        <Tab.Screen
          name="Account Details"
          children={() => <AccountDetails value={update} onChangeValue={(newValue) => setUpdate(newValue)} />}
          initialParams={{ userEmail, userId }}
          options={() => ({
            tabBarLabel: "Account Details",
            tabBarIcon: ({ focused, color }) => {
              color = focused ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.5)";
              return <MaterialCommunityIcons
                name="account-details"
                size={26}
                color={color}
              />;
            },
          })}
        />
        {/*<Tab.Screen name={"Account Details"} component={} />*/}
      </Tab.Navigator>
      {/*<View key="1">*/}
      {/*  <Leaderboard />*/}
      {/*  /!*<Text>Leaderboard</Text>*!/*/}
      {/*</View>*/}
      {/*<View key="2">*/}
      {/*  <AccountDetails userData={{ email: userEmail, id: userId }} />*/}
      {/*  /!*<Text>AccountDetails</Text>*!/*/}
      {/*</View>*/}
    </View>

    // </PagerView>
  );

  // return (
  //   <View>
  //     <Text>Welcome {user.email}</Text>
  //     <Button title={"Account Details"} onPress={() => navigation.navigate("Account Details", { userEmail })}
  //     />
  //     <Leaderboard />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
