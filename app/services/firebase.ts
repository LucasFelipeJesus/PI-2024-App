import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const apiKEY = process.env.EXPO_PUBLIC_API_KEY
const authDomain = process.env.EXPO_PUBLIC_AUTH_DOMAIN
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID
const storageBucket = process.env.EXPO_PUBLIC_STORAGE_BUCKET
const messagingSenderId = process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID
const appId = process.env.EXPO_PUBLIC_APP_ID
const measurementId = process.env.EXPO_PUBLIC_MEASUREMENT_ID

const firebaseConfig = {
    apiKey: apiKEY,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

const firebaseApp = initializeApp(firebaseConfig)
//const analytics = getAnalytics(firebaseApp)

export default firebaseApp