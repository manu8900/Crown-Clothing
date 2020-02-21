import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBlUPwO1YCT7fDmkndBU_wNE-fOHtUTzFg",
    authDomain: "crown-db-3839a.firebaseapp.com",
    databaseURL: "https://crown-db-3839a.firebaseio.com",
    projectId: "crown-db-3839a",
    storageBucket: "crown-db-3839a.appspot.com",
    messagingSenderId: "106337322740",
    appId: "1:106337322740:web:7dc617d0e7181c137780a1",
    measurementId: "G-57QMGHDGR5"
};

firebase.initializeApp(config);
export const createUserProfileDocument = async(userAuth,additionalData)=>{
if(!userAuth)return;
const userRef = firestore.doc(`users/${userAuth.uid}`);
const snapshot = await userRef.get();
if(!snapshot.exist){
    const {displayName,email}=userAuth;
    const createdAt= new Date();
    try{
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        })
    }catch(error){
        console.log('error creating user',error.message);
        
    }
}
return userRef;


}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;