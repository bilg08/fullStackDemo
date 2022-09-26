import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

export function SignInWithFirebase(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.uid, "amjilttai nevterlee");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}