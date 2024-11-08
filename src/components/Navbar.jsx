import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Autocomplete, Badge, TextField } from '@mui/material';
import { PATH } from '../hook/usePath';
import { Context } from '../context/Context';
import SearchIcon from '@mui/icons-material/Search';

const navItems = [
    {
        id: 1,
        title: "Now Playing",
        to: PATH.home
    },
    {
        id: 2,
        title: "Popular",
        to: PATH.popular
    },
    {
        id: 3,
        title: "Top Rated",
        to: PATH.topRated
    },
    {
        id: 4,
        title: "Upcoming",
        to: PATH.upcoming
    },
];
 

function Navbar() {
    const [showInput,setShowInput] = React.useState(false)
    const { likedList, setLikedList } = React.useContext(Context)
    const { savedList, setSavedList } = React.useContext(Context)
    const [searchResult, setSearchResult] = React.useState([
        {
            label: "Film",
            year: "2022"
        }
    ])
    return (
        <Box sx={{ display: 'flex',position:"relative" }}>
            <AppBar className='!bg-[#000000eb]'>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Movies
                    </Typography>
                    <SearchIcon onClick={() => setShowInput(!showInput)} className={`scale-[1.5] mr-5 cursor-pointer`}/>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.id} sx={{ color: '#fff' }}>
                                <NavLink to={item.to}>{item.title}</NavLink>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", gap: "20px", marginLeft: "30px" }}>
                        <Button variant='outlined' sx={{ borderRadius: "50%", borderColor: "white" }}>
                            <Badge showZero badgeContent={likedList.length} color="error">
                                <ThumbUpIcon sx={{ color: "white" }} />
                            </Badge>
                        </Button>
                        <Button variant='outlined' sx={{ borderRadius: "50%", borderColor: "white" }}>
                            <Badge showZero badgeContent={savedList.length} color="primary">
                                <BookmarkIcon sx={{ color: "white" }} />
                            </Badge>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Autocomplete
                className={`${showInput? "top-[73px] right-[350px]":"top-[-100px] right-[350px]"} absolute  duration-300 z-50`}
                size='small'
                disablePortal
                options={searchResult}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField size='small' sx={{ backgroundColor: "white", borderRadius: "5px" }} variant='filled' {...params} label="Search Movie" />}
            />
        </Box>
    );
}



export default Navbar;