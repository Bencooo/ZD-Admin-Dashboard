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

export const getNewUsersByDate = async (date: string): Promise<number> => {
  try {
    const response = await fetch(`http://localhost:4000/users/new-users-count?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tokenID')}`,
      },
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status} - ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    const data = await response.json();
    console.log("userCount:", data.userCount);
    return data.userCount;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error fetching user count:', err);
      throw err;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

