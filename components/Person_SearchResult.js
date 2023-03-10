import React, { useState, useEffect } from 'react'
import { doc, getDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/init-firebase'
import { Person } from './Person'

export const Person_SearchResult = ((props) => {
  const SearchQuery = props.SearchQuery
  const [SearchResults, setSearchResults] = useState({ExactMatch: [], SimilarMatch: [],})

  const SearchContent = async (q) => {
    const Result = {ExactMatch: [], SimilarMatch: [],}
    
    try {
      const q1 = query(collection(db, "UserDetails"), where("Username", "==", q))
      const unsubscribe_exact = onSnapshot(q1, (querySnapshot) => {
        const exact = [];
        querySnapshot.forEach((doc) => {
          exact.push(doc.data());
        })
        Result.ExactMatch = exact
        // console.log(exact)
      })
    } catch (error) {
      console.log(error)
    }

    // try {
    //   const q2 = query(collection(db, "UserDetails"), where("Username", "array-contains", q))
    //   const unsubscribe_similar = onSnapshot(q2, (querySnapshot) => {
    //     const similar = [];
    //     querySnapshot.forEach((doc) => {
    //       similar.push(doc.data());
    //     })
    //     Result.SimilarMatch = similar
    //     // console.log(similar)
    //   })
    // } catch (error) {
    //   console.log(error)
    // }

    setSearchResults(Result)
    console.log('Search Result: ', SearchResults)
  }

  useEffect(() => {
    let timerOut = setTimeout(() => {SearchContent(SearchQuery)}, 500)
    return () => clearTimeout(timerOut)
  }, [SearchQuery])

  if (SearchResults.ExactMatch.length ) {return (
    <Person Name={'Raghav'} Profile={SearchResults.ExactMatch[0].PhotoURL} />
  )}
})