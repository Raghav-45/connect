import React, { useState, useEffect } from 'react'
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, getDocs } from 'firebase/firestore'
import { db } from '../utils/init-firebase'
import { Person } from './Person'

export const Person_SearchResult = ((props) => {
  const SearchQuery = props.SearchQuery
  const [SearchResults, setSearchResults] = useState({ExactMatch: [], SimilarMatch: [],})

  const [SearchResults_tst, setSearchResults_tst] = useState()

  const SearchContent = async (q) => {
    const Result = {ExactMatch: [], SimilarMatch: [],}

    const q1 = query(collection(db, "UserDetails"), where("Username", "==", q))
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
      // // doc.data() is never undefined for query doc snapshots
      Result.ExactMatch = doc.data()
      setSearchResults_tst(doc.data())
      console.log(SearchResults_tst)
      // console.log(doc.id, " => ", doc.data());
    });

    // const q2 = query(collection(db, "UserDetails"), where("Username", "array-contains", q))
    // const querySnapshot2 = await getDocs(q2);
    // querySnapshot2.forEach((doc) => {
    //   // // doc.data() is never undefined for query doc snapshots
    //   Result.SimilarMatch = doc.data()
    //   // console.log(doc.id, " => ", doc.data());
    // });

    // // setSearchResults(Result)
    // console.log('Search Result: ', {ExactMatch: SearchResults_ExactMatch, SimilarMatch: SearchResults_SimilarMatch,})
  }

  useEffect(() => {
    let timerOut = setTimeout(() => {SearchContent(SearchQuery)}, 500)
    return () => clearTimeout(timerOut)
  }, [SearchQuery])

  // useEffect(() => {
  //   const Result = {ExactMatch: [], SimilarMatch: [],}

  //   const q1 = query(collection(db, "UserDetails"), where("Username", "==", SearchQuery))
  //   const querySnapshot = await getDocs(q1);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });

  //   setSearchResults(Result)
  //   console.log(SearchResults)

  // }, [SearchQuery])
  

  if (SearchResults_tst.length ) {return (
    <Person Name={'Raghav'} Profile={SearchResults_tst.PhotoURL} />
    // <div>g</div>
  )}
})