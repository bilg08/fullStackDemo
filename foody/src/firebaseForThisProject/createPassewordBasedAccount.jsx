import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from './firebase';

export function createUserWithEmail(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
      });;
    
 }