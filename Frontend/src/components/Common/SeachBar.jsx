import React, { useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2';

const SeachBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Searched Term: ", searchTerm);
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='flex items-center gap-2 border px-3 py-1 rounded'>
            <HiMagnifyingGlass className='h-6 w-6 text-gray-700'/>
            <input
                type='text'
                placeholder='Search product'
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                className='bg-gray-100 px-4 py-2 focus:outline-none w-full placeholder:text-gray-700'
            />
        </form>
    </div>
  )
}

export default SeachBar