import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {IMG_URL} from "../hook/useEnv"
import {Context} from "../context/Context"
import { useNavigate } from 'react-router-dom';




export default function MovieCard({item }) {
  const {likedList,setLikedList} = React.useContext(Context)
  const {savedList,setSavedList} = React.useContext(Context)
  const navigate = useNavigate()
  function handleLikeBtnClick(){
    const likeData = likedList.findIndex(value => value.id == item.id)
    if(likeData == -1){
      setLikedList([...likedList,item])

    }
    else{
      likedList.splice(likeData,1)
      setLikedList([...likedList])
    }
  }
  function handleSavedBtnClick (){
    const saveData = savedList.findIndex(value => value.id == item.id)
    if(saveData == -1){
      setSavedList([...savedList,item])
    }
    else{
      savedList.splice(saveData,1)
      setSavedList([...savedList])
    }

  }
  // function handleClickCard(e){
  //   console.log(e.target.id);
  // }
  return (
    <Card className='rounded-md p-1 cursor-pointer' sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <CardMedia 
                className='!w-[50px] !h-[50px]'
                component="img"
                image={`${IMG_URL}/${item.backdrop_path}`}
                alt={item.title}
                />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<h2 className='line-clamp-1'>{item.title}</h2>}
        subheader={item.release_date}
      />
      <CardMedia
        onClick={() => navigate(`movie/${item.id}`)}
        className='h-[350px]'
        component="img"
        height="194"
        image={`${IMG_URL}/${item.poster_path}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography className='line-clamp-3' variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton id='like' onClick={handleLikeBtnClick} aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
        <IconButton id='save' onClick={handleSavedBtnClick} aria-label="share">
          <TurnedInIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
