import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {NowPlaying,Popular,TopRated, Upcoming,SingleMovie} from "../pages"
import {PATH} from '../hook/usePath'

const CustomRoutes = () => {
  return (
    <Routes>
        <Route path={PATH.home} element={<NowPlaying/>}/>
        <Route path={PATH.popular} element={<Popular/>}/>
        <Route path={PATH.topRated} element={<TopRated/>}/>
        <Route path={PATH.upcoming} element={<Upcoming/>}/>
        <Route path={PATH.singleMovie} element={<SingleMovie/>}/>
    </Routes>
  )
}

export default CustomRoutes