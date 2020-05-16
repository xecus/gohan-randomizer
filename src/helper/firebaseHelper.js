import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDI3ertHE7m5J3Ph38TaVumFYUPI0ZXgZI",
    authDomain: "gohan-randomizer.firebaseapp.com",
    databaseURL: "https://gohan-randomizer.firebaseio.com",
    projectId: "gohan-randomizer",
    storageBucket: "gohan-randomizer.appspot.com",
    messagingSenderId: "276701277015",
    appId: "1:276701277015:web:719a1536b852c530d26c12"
}

const getCurrentToken = async () => {
  return firebase.auth().currentUser.getIdToken(false)
}

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('email')
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  firebase.auth().signInWithRedirect(provider)
  // firebase.auth().signInWithPopup(provider)
}

const signOut = () => {
  return firebase.auth().signOut()
}

const getDbRef = (path) => {
  return firebase.database().ref(path)
}

const firebaseApp = firebase.initializeApp(config)

export default {
  firebaseApp,
  getCurrentToken,
  signIn,
  signOut,
  getDbRef
}
