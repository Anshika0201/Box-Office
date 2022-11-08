import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { Button } from '@mui/material';
import "./ContentModal.css";
import Carousel from "../Carousel/Carousel";

const style = {
   modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 10,
  width: '70%',
  bgcolor: '#b3bbcb',
  border: '1px solid #282c34',
  boxShadow: 24,
  p: 4,
  // overflow:'scroll',
   
};



export default function ContentModal({children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const api_key = process.env.REACT_APP_API_KEY;
   console.log(process.env);
   console.log("this is api key "+ api_key)

  const fetchData = async () => {
    console.log("Media="+media_type+" Id="+id);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=9ef794e4969833bdb258e2fff1d98e7d&language=en-US`
    );

     setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=9ef794e4969833bdb258e2fff1d98e7d&language=en-US`
    );
    // console.log(data);
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div type='button' className='media' onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={this.props.classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
           <div className='classes.paper'>
           <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
              </div>
           </div>
           </div>
           )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
