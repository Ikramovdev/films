import React, { useEffect, useState } from 'react'
import {useAxios} from "../hook/useAxios"
import { API_KEY, IMG_URL } from '../hook/useEnv'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import YouTube from 'react-youtube'
const SingleMovie = () => {
  const {id} = useParams()
  const [movieInfo,setMovieInfo] = useState({})
  const [changeImg,setChangeImg] = useState(false)
  const [actors,setActors] = useState([])
  const [videos,setVideos] = useState([])
  useEffect(()=>{
    useAxios().get(`${id}?api_key=${API_KEY}`).then(res =>{
      setMovieInfo(res.data)
    })
  },[])
  useEffect(()=>{
    useAxios().get(`${id}/credits?api_key=${API_KEY}`).then(res =>{
      setActors(res.data.cast)
    })
  },[actors])
  useEffect(()=>{
    useAxios().get(`${id}/videos?api_key=${API_KEY}`).then(res =>{
      setVideos(res.data.results.splice(0,5))
    })
  },[ ])
  return (
    <div className='flex items-center justify-between p-10'>
        <div className='w-[20%] h-[85vh] p-5 border-[2px] border-white rounded-md overflow-y-auto space-y-5'>
          {actors?.map(item => (
            <div key={item.id}>
              <img className='h-[400px] mx-auto rounded-md' src={`${IMG_URL}/${item.profile_path}`} alt="actors-img" />
              <div className='text-center text-[20px] text-white font-bold bg-gray-400 py-[5px] rounded-bl-md rounded-br-md'>
                <p>{item.character}</p>
                <h2>{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className='w-[53%] h-[85vh] p-5 border-[2px] border-white rounded-md overflow-y-auto space-y-5'>
          <h2 className='text-[30px] text-white text-center'>{movieInfo?.title}</h2>
          <div onMouseEnter={() => setChangeImg(true)} onMouseLeave={() => setChangeImg(false)} className='rounded-md h-[650px] relative cursor-pointer'>
            <img className={`w-full h-full object-cover rounded-md absolute duration-300 ${changeImg ? "left-[-120%]":"left-0"}`} src={`${IMG_URL}/${movieInfo.poster_path}`} alt="MovieImg"/>
            <img className={`w-full h-full object-cover rounded-md absolute duration-300 ${changeImg ? "right-0":"right-[-120%]"}`} src={`${IMG_URL}/${movieInfo.backdrop_path}`} alt="MovieImg"/>
          </div>
          <p className='text-[20px] text-white'>{movieInfo.overview}</p>
          <p className='text-[20px] text-white'>Budget: {movieInfo.budget}$</p>
          <div className='flex items-center justify-between'>
            {movieInfo?.genres?.map(item => <Button size='large' key={item.id} variant='contained'>{item.name}</Button>)}
          </div>
        </div>
        <div className='w-[25%] h-[85vh] p-5 border-[2px] border-white rounded-md overflow-y-auto space-y-5'>
            {videos?.map(item => (<YouTube className='w-full' videoId={item.id} key={item.id}/>))}
        </div>
    </div>
  )
}

export default SingleMovie