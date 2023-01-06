# React Native App: Accelerometer Leaderboard

**Dorset College Dublin**  
**BSc in Science in Computing & Multimedia**  
**Mobile Applications 2 - BSC30922**  
**Year 3, Semester 1**  
**Project**

**Lecturer name:** Saravanabalagi Ramachandran  
**Lecturer email:** saravanabalagi.ramachandran@dorset.ie

**Student Name:** Mateus Fonseca Campos  
**Student Number:** 24088  
**Student Email:** 24088@student.dorset-college.ie

**Submission date:** 08 January 2023

This repository contains an "Accelerometer Leaderboard" React Native app developed for my Project at Dorset College BSc in Computing, Year 3, Semester 1.

## Part 1: Requirements Checklist

- [x] **1. Authenticate using Firebase1, upload data to Firestore**
  - [x] 1.1. Sign up using <span>StudentID@student.dorset-college.ie</span> (as email) and a password
  - [x] 1.2. After sign up, collect and update details such as name, course, year in Firestore > StudentID, allow editing these details later
  - [x] 1.3. Collect and store locally 1000 accelerometer data points
  - [x] 1.4. Once 1000 data points are collected, upload to Firestore under: Users > StudentID > accelerometer_data
  - [x] 1.5. Repeat 3 and 4 as long as the app is open and is in the foreground (Don't record when minimised)
- [x] **2. Display Leaderboard**
  - [x] 2.1. Retrieve accelerometer_data of all users and calculate movement score2 for each user
  - [x] 2.2. If accelerometer_data is unavailable or not in correct format or has more than 1000 data points, show score "N/A".
  - [x] 2.3. Show recycler view to display leaderboard with columns rank, name and score (use score for ranking)
  - [x] 2.4. Refresh every minute, show information: last refreshed (in time ago format3), and refreshing in x seconds
  - [x] 2.5. Show details of user when clicked in full screen, allow going back to leaderboard

## Part 2: Report



## Part 3: References

Conceptually, every line of code in this project was written based on official documentation:

- **[React Native](https://reactnative.dev/docs/getting-started)**
- **[React Native Firebase](https://rnfirebase.io/)**
- **[React](https://reactjs.org/docs/getting-started.html)**
- **[React Docs BETA](https://beta.reactjs.org/)**
- **[React Navigation](https://reactnavigation.org/docs/getting-started/)**
- **[MDN Web](https://developer.mozilla.org/)**
- **[RxJS](https://rxjs-dev.firebaseapp.com/)**
- **[Firebase](https://firebase.google.com/docs)**
- **[Android](https://developer.android.com/docs)**
- **[FlashList](https://shopify.github.io/flash-list/docs/)**

The following NPM packages were installed:

- **[@react-native-firebase](https://www.npmjs.com/package/react-native-firebase)**
- **[@react-navigation/native](https://www.npmjs.com/package/@react-navigation/native)**
- **[@shopify/flash-list](https://www.npmjs.com/package/@shopify/flash-list)**
- **[firebase-admin](https://www.npmjs.com/package/firebase-admin)**
- **[react-native-paper](https://www.npmjs.com/package/react-native-paper)**
- **[react-native-screens](https://www.npmjs.com/package/react-native-screens)**
- **[react-native-sensors](https://www.npmjs.com/package/react-native-sensors)**
- **[react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons)**
- **[rxjs](https://www.npmjs.com/package/rxjs)**


Clarifying code snippets from **[W3Schools](https://www.w3schools.com/)**.

Visits to our most beloved **[StackOverflow](https://stackoverflow.com/)** certainly happened, for insight and understanding.

All user pictures from **[This Person Does Not Exist](https://thispersondoesnotexist.com/)**.

## Part 4: Copyright Disclaimer

This project may feature content that is copyright protected. Please, keep in mind that this is a student's project and has no commercial purpose whatsoever. Having said that, if you are the owner of any content featured here and would like for it to be removed, please, contact me and I will do so promptly.

Thank you very much,  
Mateus Campos.
