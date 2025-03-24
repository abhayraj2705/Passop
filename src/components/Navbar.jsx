import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white   '>

        <div className="mycontainer flex  items-center  justify-between px-4 py-5  h-14">

        <div className="logo font-bold text-2xl">
          <span className='text-green-600'>&lt;</span>
          PassOP
          <span className='text-green-600'>/&gt;</span>
          </div>
        <ul>
            <li className='flex gap-3'>
                <a className='hover:font-bold' href="#">Home</a>
                
               <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul>

        <div>

          <a href="https://github.com/abhayraj2705?tab=repositories">

          <button className='text-white bg-green-500 my-5 px-4 rounded-xl flex gap-4 justify-center items-center text-center ring-white ring-1  '>
          <img className='invert p-2 w-10' src="/icons/github.svg" alt="Gith Hub" />Git Hub
          </button>
          </a>
        </div>

        </div>

      
    </nav>
  )
}

export default Navbar
