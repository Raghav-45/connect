import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'
import { FiSearch } from 'react-icons/fi'
import { supabase } from './../lib/supabaseClient'

export default function login() {
  const router = useRouter()
  const { signInWithGoogle, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const mounted = useRef(false)
  // const location = useLocation()
  const mounted = useMounted()

  const handleLogin = async (email, password) => {
    // your login logic here
    setIsSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
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
    //   title: 'Login Success.',
    //   description: "We've just Logged You In.",
    //   status: 'success',
    //   duration: 3000,
    //   isClosable: true,
    // })
    router.replace('/')

    mounted.current && setIsSubmitting(false)
  }

  function handleRedirectToOrBack() {
    router.replace('/')
    // if (router.back()) {
    //   router.replace(router.back())
    // } else {
    //   router.replace('/profile')
    // }
  }

  // return (
  //       <chakra.form
  //         onSubmit={async e => {
  //           e.preventDefault()
  //           if (!email || !password) {
  //             console.log('Credentials not valid.')
  //             return
  //           }
  //           // your login logic here
  //           setIsSubmitting(true)
  //           login(email, password)
  //             .then(res => {
  //               // handleRedirectToOrBack()
  //             })
  //             .catch(error => {
  //               console.log(error.message)
  //               // toast({
  //               //   description: error.message,
  //               //   status: 'error',
  //               //   duration: 9000,
  //               //   isClosable: true,
  //               // })
  //             })
  //             .finally(() => {
  //               // setTimeout(() => {
  //               //   mounted.current && setIsSubmitting(false)
  //               //   console.log(mounted.current)
  //               // }, 1000)
  //               mounted.current && setIsSubmitting(false)
  //             })
  //         }}
  //       >

  //       <input value={email} onChange={e => setEmail(e.target.value)}></input>
  //       <input value={password} onChange={e => setPassword(e.target.value)} required></input>
        
  //         <Stack spacing='6'>
  //           <Button
  //             type='submit'
  //             colorScheme='blue'
  //             size='lg'
  //             fontSize='md'
  //             isLoading={isSubmitting}
  //           >
  //             Sign in
  //           </Button>
  //         </Stack>
  //       <Button
  //         onClick={() =>
  //           signInWithGoogle()
  //             .then(user => {
  //               handleRedirectToOrBack()
  //               console.log(user)
  //             })
  //             .catch(e => console.log(e.message))
  //         }
  //       >
  //         Sign in with Google
  //       </Button>
  // )

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
                      handleLogin(email, password)
                      // login(email, password)
                      //   .then(res => {
                      //     handleRedirectToOrBack()
                      //   })
                      //   .catch(error => {
                      //     console.log(error.message)
                      //     // toast({
                      //     //   description: error.message,
                      //     //   status: 'error',
                      //     //   duration: 9000,
                      //     //   isClosable: true,
                      //     // })
                      //   })
                      //   .finally(() => {
                      //     // setTimeout(() => {
                      //     //   mounted.current && setIsSubmitting(false)
                      //     //   console.log(mounted.current)
                      //     // }, 1000)
                      //     mounted.current && setIsSubmitting(false)
                      //   })
                    }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
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
