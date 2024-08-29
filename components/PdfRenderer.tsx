import React from 'react'

const PdfRenderer = () => {
  return (
   <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
    {/* custom PDF tools */}
    <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-center'>
      <div className='flex items-center gap-1.5'>
        tool bar
      </div>
    </div>

   </div>
  )
}

export default PdfRenderer