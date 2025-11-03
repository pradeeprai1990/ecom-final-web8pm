import React from 'react'

export default function HomeCollection({ homeCollectionData }) {
  return (
    <section className='py-[50px]'>
      <div className='max-w-[1320px] mx-auto grid grid-cols-3 gap-5'>
        {
          homeCollectionData.map((data, index) => {
            return(
              <HomeCollectionList data={data} key={index} />
            )
          }
          )
        }
      </div>
    </section>
  )
}

function HomeCollectionList({ data }) {
  return (
    <div className='group overflow-hidden relative bg-amber-200 shadow-lg border-1'>
      <img className='group-hover:scale-125 duration-200' src={data.thumbnail} alt="" />
      <div className='absolute left-0 top-0 w-[100%] h-[100%] p-[30px]'>
        <h3 className='text-[20px]'>{data.title}</h3>
        <h2 className='text-3xl font-bold'>Chair Collection</h2>
      </div>
    </div>
  )
}
