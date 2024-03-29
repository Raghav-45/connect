import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore"
import { updateProfile } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'
import { FiSearch } from 'react-icons/fi'
import { supabase } from './../lib/supabaseClient'

import { db } from '../utils/init-firebase'

export default function login() {
  const router = useRouter()
  const { currentUser, signInWithGoogle, login, register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const mounted = useRef(false)
  // const location = useLocation()
  const mounted = useMounted()

  function GenerateProfile(q) {
    // function getBgColor() {
    //   const c = ['80C271','5AACCF','b6e3f4','c0aede','d1d4f9']
    //   return c[Math.floor(Math.random()*c.length)]
    // }
    return ('https://api.dicebear.com/5.x/personas/svg?flip=false&skinColor=ecad80&backgroundColor=' + 'b6e3f4' + '&seed=Aneka' + q)
  }

  const RegisterUser = async (username, email, password) => {
    // console.log(MessageInput)

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username
        },
      },
    })

    if (error) {
      // toast({
      //   description: error.message,
      //   status: 'error',
      //   duration: 9000,
      //   isClosable: true,
      // })
      mounted.current && setIsSubmitting(false)
      return
    }

    // TODO: Add Error Handling
    // toast({
    //   title: 'Account created.',
    //   description: "We've created account for you.",
    //   status: 'success',
    //   duration: 3000,
    //   isClosable: true,
    // })
    router.replace('/')

    mounted.current && setIsSubmitting(false)

    // register(email, password)
    //   .then(async res => {
    //     !res.user?.photoURL && updateProfile(res.user, {photoURL: GenerateProfile(res.user.email)})
    //     await setDoc(doc(db, "UserDetailsV1", res.user.uid), {
    //       email: res.user.email,
    //       photoURL: res.user?.photoURL ? res.user.photoURL : GenerateProfile(res.user.email),
    //       username: username,
    //       uid: res.user.uid,
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error.message)
    //   })
    //   .finally(() => {
    //     mounted.current && setIsSubmitting(false)
    //   })
  }

  function handleRedirectToOrBack() {
    router.replace('/')
    // if (router.back()) {
    //   router.replace(router.back())
    // } else {
    //   router.replace('/profile')
    // }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST"
          onSubmit={async e => {
                      e.preventDefault()
                      if (!email || !password) {
                        console.log('Credentials not valid.')
                        return
                      }
                      // your login logic here
                      setIsSubmitting(true)
                      RegisterUser(username, email, password)
                      handleRedirectToOrBack()
                    }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase())}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>

              <button
                onClick={() =>
                  signInWithGoogle()
                    .then(user => {
                      handleRedirectToOrBack()
                      console.log(user)
                    })
                    .catch(e => console.log(e.message))
                }
              >
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
