import React from 'react'

const AuthLayout = ({children}: {children : React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center mt-32'>{children}</div>
  )
}

export default AuthLayout