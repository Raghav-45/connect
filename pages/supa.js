import React, { useState, useEffect } from 'react'
import { supabase } from './../lib/supabaseClient'

export default function supa() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  useEffect(() => {
    // const fetchData = async () => {
    //   const { data } = await supabase.from('profiles').select()
    //   console.log(data)
    //   data && setData(data)
    // }
    // fetchData()
    // setLoading(false)

    const registerSupabase = async () => {
      const { data, error } = await supabase.auth.signUp(
        {
          email: 'raghavbhai4545@gmail.com',
          password: 'Password@1234#',
          options: {
            data: {
              username: 'raghvabhia1'
            },
          },
        },
      )
    }
    registerSupabase()
  }, [])
  
  if (loading) {
    return (<div>Loading...</div>)
  }
  return (
    <div>
      {/* {data.map((elem) => <p>{elem.id}</p>)} */}
    </div>
  )
}