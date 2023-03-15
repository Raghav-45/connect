const GetUserDetailsbyUsername = async (usern) => {
  const q = query(collection(db, "UserDetailsV1"), where("username", "==", usern));

  const querySnapshot = await getDocs(q).then(e => e.forEach((doc) => {setChattingWith(doc.data())}));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  // console.log(querySnapshot.forEach((doc) => {setChattingWith(doc.data())}))
}