import React from 'react'

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded-md font-semibold transition-colors duration-200'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
