import { db } from '../../../utils/init-firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'

export default async (req, res) => {
  if (req.method == 'GET') {
    const q = query(collection(db, "UserDetailsV1"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {users.push(doc.data())})
      res.status(200).json(users)
    });
  }
}