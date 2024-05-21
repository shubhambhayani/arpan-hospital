import React from 'react'
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center'>
    <ReactLoading type="spin" color="0C1F28" height={30} width={30} />
    </div>
  )
}
