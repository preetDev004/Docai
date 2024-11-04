import React from 'react'

const AuthLayout = ({children}: {children : React.ReactNode}) => {
  return (
    <div className='min-h-screen max-h-screen flex items-center justify-center p-2 -mt-16'>{children}</div>
  )
}

export default AuthLayout