import React from 'react'

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={`border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 w-full ${className}`}
      {...props}
    />
  )
}
