import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCard = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
        <h1 className='font-medium text-xl text-slate-700'>Company Name</h1>
        <p className='text-lg text-slate-600 font-medium'>India</p>
        </div>
        <div>
            <h1 className='font-bold my-2 text-slate-500'>Job Title</h1>
            <p className='text-sm text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi!</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge variant={"secondary"} className={'text-blue-700 font-bold'}>12 Positions</Badge>
            <Badge variant={"secondary"}  className={'text-blue-700 font-bold'}>Part Time</Badge>
            <Badge variant={"secondary"}  className={'text-blue-700 font-bold'}>11Lpa</Badge>

        </div>
    </div>
  )
}

export default LatestJobCard