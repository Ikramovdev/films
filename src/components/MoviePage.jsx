import React, { useEffect, useState } from 'react'
import { useAxios } from "../hook/useAxios"
import MovieCard from '../components/MovieCard'
import { Pagination } from '@mui/material'


const MoviePage = ({URL}) => {
  const [data, setData] = useState([])
  const [totalPage,setTotalPage] = useState(10)
  const [page,setPage] = useState(1)

  useEffect(() => {
    if (URL) {
      useAxios().get(`${URL}?language=en-US&page=${page}`).then(res => {
          setData(res.data.results.map(item => {
            item.isLiked = false
            item.isSaved = false
            return item
          }));
          setTotalPage(res.data.total_pages);
        })
        .catch(err => console.error("API Error:", err)); // Errorni aniqlash uchun console.log qo'shildi
    } else {
      console.error("URL bo'sh yoki undefined");
    }
  }, [page]);
  

  function handlePaginationChange(e,count){
    setTimeout(() => {
      window.scrollTo(0,0);
    }, 300);
    setPage(count);
  }

  return (
    <>
      <div className='p-5 flex justify-between flex-wrap gap-[30px]'>
        {data.map(item => <MovieCard key={item.id} item={item}/>)}
      </div>
      <div className='flex py-2 bg-[#000000eb] justify-center'>
        <Pagination onChange={handlePaginationChange} count={totalPage}/>
      </div>
    </>
  )
}

export default MoviePage