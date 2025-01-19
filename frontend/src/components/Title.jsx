import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex items-center space-x-4 mb-6 group'>
      <div className='text-lg transform transition-all duration-300 hover:scale-105'>
        <span className='text-primary/70 font-medium'>{text1}</span>
        {text2 && (
          <span className='text-primary font-bold ml-2 relative'>
            {text2}
            <div className='absolute bottom-0 left-0 w-full h-[2px] bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
          </span>
        )}
      </div>
      <div className='flex-grow'>
        <div className='h-[3px] bg-gradient-to-r from-primary via-primary/50 to-transparent transform transition-all duration-300 group-hover:from-primary/90'></div>
      </div>
    </div>
  )
}

export default Title
