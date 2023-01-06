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

- [x] **1. Authenticate using Firebase, upload data to Firestore**
  - [x] 1.1. Sign up using StudentID@student.<span>dorset-college</span>.ie (as email) and a password
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

For this assessment, I was tasked with developing a mobile app that collects movement data through the device’s accelerometer. The data should, then, me uploaded to a cloud database. The app should also display a leaderboard that ranks all users in the database by movement score, from highest to lowest.

Once again, I chose to work with **React Native**, but differently from the [previous assignment](https://github.com/mateusfonseca/mobileApp2_Ireland_Literature_Map) in this module, this time I decided to go with function components instead of class components. React function components rely heavily on *Hooks*, which themselves are special functions that "[allow you to reuse stateful logic without changing your component hierarchy](https://reactjs.org/docs/hooks-intro.html#its-hard-to-reuse-stateful-logic-between-components)", "[let you split one component into smaller functions based on what pieces are related](https://reactjs.org/docs/hooks-intro.html#complex-components-become-hard-to-understand)" and "[let you use more of React’s features without classes](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines)". Hooks were introduced with React 16.8, in 2019, and offer a new way of using different features from components. There is a number of built-in Hooks designed to handle the most common needs of any React-based application, but they can also be combined and used to create custom Hooks to answer more specific needs and avoid boilerplate.

Admittedly, the use of Hooks and this more functional approach to developing mobile apps made things considerably more challenging to me than I had anticipated. Sharing data between components felt less straightforward without classes and, often, I felt like I was using Hooks unnecessarily. In fact, the documentation states: “[Don’t use Effects to orchestrate the data flow of your application. If you’re not interacting with an external system, you might not need an Effect.](https://beta.reactjs.org/reference/react#effect-hooks)”, when explaining the role of the *useEffect* Hook, which is something that I certainly did in this project. Unfortunately, I did not have enough time to go through the theoretical basis of Hooks (*and the React framework as a whole, if I’m being honest*) before jumping into action and starting to code. *Too bad!*

Besides the natural challenges of trying a new approach for the first time, there was at least one other issue that I faced while working on this project that I ended up using somewhat of a workaround to solve. For [requirement 1.2](#part-1-requirements-checklist), I could not have the flow of the program navigate to the screen for editing user details right after signing-up. I believe this was due to how I structured the navigation stack, where some screens are rendered conditionally and, after the user signs-up and gets automatically logged-in, disappear from the stack upon re-render, making it impossible to navigate back. Ideally, I would have refactored my code and changed the screen stack structure so that this problem would no longer happen, however, the lack of time made me resort to an easier, albeit much less elegant, solution: I created another component that basically holds the same form for updating user details and displayed on a brand-new screen. *Not exactly DRY-compliant, mind you, but it gets the job done.*

#### ________________

React/RN is among the most popular JavaScript frameworks in the market today and absolutely worth learning, be it for mobile or web development. Working on this assignment, and the [previous one](https://github.com/mateusfonseca/mobileApp2_Ireland_Literature_Map), gave me the “excuse” I needed to get started with it.

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
