// This file defines the Main component of the application.
// It renders the main screen with its two tabs, tracks app visibility
// (whether it's in foreground or background), collects the accelerometer
// data and uploads them to the database.

import React, { useEffect, useRef, useState } from "react";
import { AppState, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Leaderboard from "./Leaderboard";
import AccountDetails from "./AccountDetails";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { accelerometer, SensorTypes, setUpdateIntervalForType } from "react-native-sensors";
import firestore from "@react-native-firebase/firestore";

// Component Main
export default function Main() {
  const route = useRoute(); // route prop from App
  const appState = useRef(AppState.currentState); // get reference to app's current state

  const [email] = useState(route.params.userEmail);
  const [update, setUpdate] = useState(false); // updates Leaderboard content when user details change
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [accData, setAccData] = useState([]); // tracks accelerometer data collection
  const [counter, setCounter] = useState(0); // tracks accelerometer sample quantity

  // updates app state when switched back-and-forth between FG and BG
  useEffect(
    () => {
      const subscription = AppState.addEventListener("change", nextAppState => {
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        // console.log("AppState: " + appStateVisible);
      });
      return () => {
        subscription.remove();
      };
    },
    [],
  );

  // uploads collected accelerometer data to the database
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

  // Formula: α = t / (t + dT)
  let t = 800; // low-pass filter's time-constant in ms
  let dT = 100; // event delivery rate in ms
  let alpha = t / (t + dT); // alpha factor
  let gravity = [0, 0, 0];

  // collects accelerometer data, watches app visibility so that it
  // stops reading when in BG and resumes and in FG
  useEffect(
    () => {
      let accDt = accData;
      let cnt = counter;
      if (appStateVisible === "active") {
        // sets time interval for data reading
        setUpdateIntervalForType(SensorTypes.accelerometer, dT); // defaults to 100ms
        const subscription = accelerometer
          .subscribe(({ x, y, z }) => {

            // low-pass filter isolates the force of gravity on each axis
            gravity[0] = alpha * gravity[0] + (1 - alpha) * x;
            gravity[1] = alpha * gravity[1] + (1 - alpha) * y;
            gravity[2] = alpha * gravity[2] + (1 - alpha) * z;

            // high-pass filter removes gravity contribution
            x = (x - gravity[0]);
            y = (y - gravity[1]);
            z = (z - gravity[2]);

            accDt.push({ x, y, z }); // updates data array with newly collected reading
            cnt++; // increments counter

            // when 1000 data samples have been collected, upload to the database and start over
            if (cnt === 1000) {
              uploadAccData(accDt).catch(error => console.log(error));
              accDt = [];
              cnt = 0;
              setAccData([]);
              setCounter(0);
            }
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

  const Tab = createMaterialTopTabNavigator(); // tabs navbar
  const userId = email.substring(0, email.indexOf("@")); // get user ID from email

  // tabs navbar stack
  return (
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
          children={() => <Leaderboard value={update} />} // updates display if user details change
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
          children={() => <AccountDetails value={update} onChangeValue={(newValue) => setUpdate(newValue)} />} // requests update display if user details change
          initialParams={{ email, userId }}
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
      </Tab.Navigator>
    </View>
  );
}
