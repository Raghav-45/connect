import { useState } from 'react'
import { db } from '../../../utils/init-firebase'
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, getDocs, addDoc } from 'firebase/firestore'

export default async (req, res) => {
  // const { id } = req.query;

  // const [ChatsByMe, setChatsByMe] = useState()
  // const [ChatsByThem, setChatsByThem] = useState()
  // const [IsChatByMeLoading, setIsChatByMeLoading] = useState(true)
  // const [IsChatByThemLoading, setIsChatByThemLoading] = useState(true)

  const ChatsByMe = []
  const ChatsByThem = []
  const IsChatByMeLoading = true
  const IsChatByThemLoading = true

  const u = 'haKYa3fukWgS0atcs7O21nF1xq72'
  const r = '4ZguUarpn7gep9Ul0Dj223Pciuf2'

  const id = '0WxoutFpKBLxoqFskxp7';
  console.log(req.method)

  if (req.method == 'GET') {
    const q1 = query(collection(db, "Concept"), where("To", "==", u), where("From", "==", r));
    const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {data.push(doc.data())})
      ChatsByMe.push(data)
      // setChatsByMe(data)
      // setIsChatByMeLoading(false)
    });

    const q2 = query(collection(db, "Concept"), where("From", "==", u), where("To", "==", r));
    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {data.push(doc.data())})
      ChatsByThem.push(data)
      // setChatsByThem(data)
      // setIsChatByThemLoading(false)
    });

    res.status(200).json(ChatsByMe.concat(ChatsByThem))
  }
}