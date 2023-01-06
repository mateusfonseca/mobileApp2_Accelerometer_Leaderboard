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



## Part 4: Copyright Disclaimer

This project may feature content that is copyright protected. Please, keep in mind that this is a student's project and has no commercial purpose whatsoever. Having said that, if you are the owner of any content featured here and would like for it to be removed, please, contact me and I will do so promptly.

Thank you very much,  
Mateus Campos.
