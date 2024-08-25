import React from 'react'

const AuthLayout = ({children}: {children : React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center p-2 mt-16 md:mt-40'>{children}</div>
  )
}

export default AuthLayout