// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// // The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


exports.helloWorld1 = functions.https.onRequest(async (req, res) => {
  res.status(200).send("Value workshop now !!!!");
});

exports.helloWorld2 = functions.https.onRequest(async (req, res) => {
  res.status(200).send("Value workshop now !!!!");
});
