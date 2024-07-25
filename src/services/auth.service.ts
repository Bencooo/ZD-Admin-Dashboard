import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

export const login = async (email: string, password: string): Promise<string> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userDoc = await getDoc(doc(db, 'users', user.uid));

  if (userDoc.exists() && userDoc.data().role === 'admin') {
    const token = await user.getIdToken();
    localStorage.setItem('tokenID', token);
    return token;
  } else {
    throw new Error('Access denied: You must be an admin to log in.');
  }
};
