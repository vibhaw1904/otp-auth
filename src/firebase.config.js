import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


const config={
    apiKey: "AIzaSyBj74NuL5sicRXgZORupadKV3tkRMP4QS4",
    authDomain: "otp-auth-33c85.firebaseapp.com",
    projectId: "otp-auth-33c85",
    storageBucket: "otp-auth-33c85.appspot.com",
    messagingSenderId: "710937823912",
    appId: "1:710937823912:web:116bfb7fbe8b88f604d09d",
    measurementId: "G-XLB60BLC5Y"
}
const app = initializeApp(config);
export const auth=getAuth(app)
