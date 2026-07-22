import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";
import { auth } from "./config";

export interface FirebaseAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export function convertFirebaseUser(user: User): FirebaseAuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

export async function firebaseSignIn(email: string, password: string) {
  if (!auth) throw new Error("Firebase is not configured");
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return convertFirebaseUser(credential.user);
}

export async function firebaseSignUp(email: string, password: string, name: string) {
  if (!auth) throw new Error("Firebase is not configured");
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  return convertFirebaseUser(credential.user);
}

export async function firebaseSignOut() {
  if (!auth) return;
  await signOut(auth);
}

export async function firebaseResetPassword(email: string) {
  if (!auth) throw new Error("Firebase is not configured");
  await sendPasswordResetEmail(auth, email);
}

export function onFirebaseAuthChange(callback: (user: FirebaseAuthUser | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => {
    callback(user ? convertFirebaseUser(user) : null);
  });
}

export { auth };
