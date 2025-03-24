import React from 'react'

export default function ServiceCard(props) {
  return (
    <div className='flex flex-col justify-start mt-10 items-center'>
        <img className='rounded-full h-1/2 border-2 border-green-900 shadow-lg hover:scale-105 transition-transform duration-300' src={props.img} alt="snacks" />
        <p className='mt-5 text-center w-50 text-2xl font-bold text-white'>{props.description}</p>
    </div>
  )
}
