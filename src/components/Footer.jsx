import React from 'react'

const Footer = () => {
  return (
    <div className='w-full text-center font-bold bg-slate-800 flex justify-center items-center gap-4 text-white  '>
         <h1 className='text-2xl font-bold text-center text-white  '>
                    <span className='text-green-600'>&lt;</span>
                    PassOP
                    <span className='text-green-600'>/&gt;</span>

                </h1>
     Created With <img src="/icons/heart.png" width={39} alt="" /> By Abhayraj B
    </div>
  )
}

export default Footer
