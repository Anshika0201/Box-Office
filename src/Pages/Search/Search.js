import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [searchAPICalled, setSearchAPICalled] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

   const api_key = process.env.REACT_APP_API_KEY;
   console.log(process.env);
   console.log("this is api key "+ api_key)
   console.log("Search API "+ searchAPICalled);

  const fetchSearch = async () => {
    setSearchAPICalled(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=9ef794e4969833bdb258e2fff1d98e7d&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

     //  console.log("this is data")
     // console.log(data.results);
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    if(searchText!==""){
    fetchSearch();
    }
    // eslint-disable-next-line
  }, [type, page]);

  // const noContent = ()=>{
  //     // console.log("this is conotent");
  //     console.log(content)

  //      if(content.length===0)
  //       return <h2>No data available</h2>
  // }
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <div style={{display: "flex",margin:"15px 0"}
      }> 
      <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
          </div> 
          {searchAPICalled && content && content.length>0 ?
          <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
         <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" /> 
        </Tabs>:""}
          </ThemeProvider>
          <div className="trending">
            
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchAPICalled &&
          (!content || content.length===0) ?
           <h2>No Data Found</h2>:"" }
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search
