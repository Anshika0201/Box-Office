import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';



export default function SimpleBottomNavigation() {
     const [value, setValue] = React.useState(0);
     const navigate = useNavigate();
 React.useEffect(()=>{
  if(value===0) navigate("/",{ replace: true });
  else if(value===1) navigate("/movies",{ replace: true });
  else if(value===2) navigate("/series",{ replace: true });
  else if(value===3) navigate("/search",{ replace: true });
 },[value,navigate]);

 
  return (
    
    <Box sx={ {width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 100,
    
  }}

  >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx = {{    backgroundColor: '#2d313a',}}
      > 
        <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
    </Box>
  );
}
