import React from 'react'
import Categorylist from './_componant/categorylist'

function Layout({children, params}) {
  return (
    
    <div className='grid grid-cols-4 h-screen md:h-[473px] sm:h-[473px] lg:h-[475px]'>

      <div className='hidden md:block'>
         <Categorylist category={params.cname}/>
      </div>

      <div className="col-span-4 md:col-span-3 mt-5 h-full w-full overflow-y-scroll">
       {children}
      </div>

    </div>
  )
}

export default Layout
