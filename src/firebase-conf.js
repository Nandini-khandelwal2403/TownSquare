import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, updateDoc, FieldValue } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uuidv4 } from "@firebase/util";

const firebaseConfig = {
    apiKey: "AIzaSyCoKflnKUeakGzmvVoxA0_ShbOcAaIOroc",
    authDomain: "townsquare-e2578.firebaseapp.com",
    databaseURL: "https://townsquare-e2578-default-rtdb.firebaseio.com",
    projectId: "townsquare-e2578",
    storageBucket: "townsquare-e2578.appspot.com",
    messagingSenderId: "719408904853",
    appId: "1:719408904853:web:9da4b5f7fb3bcf77ee399c",
};
const app = initializeApp(firebaseConfig);

// let formMessage = firebase.database().ref('register');
const storage = getStorage(app);
const storageRef = ref(storage);
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

onAuthStateChanged(auth, async(user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        window.user = user;
        if ((window.location.pathname == '/register' || window.location.pathname == '/login') && await isUserRegistered()) {
            window.location.href = '/home';
            console.log('user is registered');
        } else if (window.location.pathname !== '/register' && !(await isUserRegistered())) {
            window.location.href = '/register';
            console.log('user is not registered');
        }
        user = await getUserData();
        window.userDetails = user;
        setProfile();
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

const db = getFirestore(app);

// send registration data to firestore database

export const send = (name, number, address, genderValue, pincode) => {
    const docRef = doc(db, "users", user.uid);
    setDoc(docRef, {
        name: name,
        number: number,
        address: address,
        gender: genderValue,
        pincode: pincode,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL
    }).then(() => {
        console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// send items details to firestore database

export const sendItems = (name, description, expiry, quantity, image) => {
    const docRef = collection(db, "items");
    addDoc(docRef, {
        name: name,
        description: description,
        expiry: expiry,
        quantity: quantity,
        image: image,
        uid: user.uid,
        email: user.email
    }).then((item) => {
        console.log("Document written with ID: ", item.id); // refer documentation....tab hi roton jaisa soch paaoge
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// get user data from firestore database

export const getUserData = () => {
    return new Promise((resolve, reject) => {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                // console.log("Document data:", doc.data());
                resolve(doc.data());
            } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
                resolve(null);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            reject(error);
        });
    });
}

// upload image to firebase storage

export const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const metadata = {
            contentType: file.type
        };
        const uuid = uuidv4();
        const imageref = ref(storage, 'images/' + uuid);
        const uploadTask = uploadBytesResumable(imageref, file, metadata);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        }, (error) => {
            reject(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve(downloadURL);
            });
        });
    });
}

// check if user is registered or not

export const isUserRegistered = () => {
    return new Promise((resolve, reject) => {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                console.log("Document data:", doc.data());
                resolve(true);
            } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
                resolve(false);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            reject(error);
        });
    });
}

// get all items from firestore database

export const getItems = () => {

    return new Promise((resolve, reject) => {
        const docRef = collection(db, "items");
        getDocs(docRef).then((querySnapshot) => {
            let items = [];
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                items.push(obj);
            });
            resolve(items);
        }).catch((error) => {
            console.log("Error getting documents: ", error);
            reject(error);
        });
    });
}

// add user request to firestore database item document using item id

export const addRequest = async(itemid) => {
    console.log(itemid);
    const docRef = doc(db, "items", itemid);
    console.log(docRef);
    await updateDoc(docRef, {
        request_uid: user.uid,
        request_user_name: userDetails.name,
        request_user_number: userDetails.number,
        request_user_address: userDetails.address
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

// get item for an id

export const getItem = (itemid) => {
    return new Promise((resolve, reject) => {
        const docRef = doc(db, "items", itemid);
        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                console.log("Document data:", doc.data());
                resolve(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                resolve(null);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            reject(error);
        });
    });
}