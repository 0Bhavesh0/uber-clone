import React from 'react'
import {Link} from 'react-router-dom'
import CaptainLogin from './CaptainLogin'

 
function Home() {
  return (
    <div>

      <div className='h-screen pt-5  full bg-red-400 flex justify-between flex-col'>

        <img src="/assets/Uber_logo_2018.svg.png" alt="" className='w-16 ml-7 '/>

        <div className='bg-white py-5 px-5 '>
          <h2 className='text-2xl font-bold font-quicksand mb-3'>Get Started</h2>
          <Link to='/login' className=' inline-block w-full justify-center items-center bg-black text-white p-2 rounded-md font-quicksand'>Continue</Link>
          
        </div>

      </div>

    </div>

  )
}

export default Home