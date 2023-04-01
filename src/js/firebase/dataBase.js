import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';

const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());

const filmWatchedArr = [
  {
    username: 'Admin',
    email: 'email',
    profile_picture: 'imageUrl',
  },
  {
    username: 'Ada',
    email: 'email',
    profile_picture: 'imageUrl',
  },
];

onAuthStateChanged(auth, user => {
  if (user) {
    set(ref(db, 'users/' + 'ovrGn2FJIdTUQrajvyrFQ3Gb5bs1/'), filmWatchedArr);
  }
});

onAuthStateChanged(auth, user => {
  if (user) {
    get(child(dbRef, `users/ovrGn2FJIdTUQrajvyrFQ3Gb5bs1`))
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});
