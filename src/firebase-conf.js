import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCoKflnKUeakGzmvVoxA0_ShbOcAaIOroc",
    authDomain: "townsquare-e2578.firebaseapp.com",
    projectId: "townsquare-e2578",
    storageBucket: "townsquare-e2578.appspot.com",
    messagingSenderId: "719408904853",
    appId: "1:719408904853:web:9da4b5f7fb3bcf77ee399c"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const googleSignIn = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            window.user = user;
            window.location.href = '/home';
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        window.user = user;
        if (window.location.pathname !== '/home') {
            window.location.href = '/home';
        }

        // ...
    } else {
        // User is signed out
        window.user = null;
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }
});

export const googleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location = '/login';
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}