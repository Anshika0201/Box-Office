import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();



const Carousel = ({ id, media_type }) => {
    const [credits, setCredits] = useState([]);

    const items = credits?.map((c) => (
        <div className="carouselItem">
          <img
            
            src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
            alt={c?.name}
            onDragStart={handleDragStart}
            className="carouselItem__img"
          />
          <b className="carouselItem__txt">{c?.name}</b>
        </div>
      ));
    
      const responsive = {
         0: {
           items: 3,
         },
        512: {
          items: 4,
        },
         1024: {
           items: 6,
         },
      };

    const api_key = process.env.REACT_APP_API_KEY;
    console.log(process.env);
    console.log("this is api key "+ api_key)

    const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=9ef794e4969833bdb258e2fff1d98e7d&language=en-US`
        );
        setCredits(data.cast);
      };
    
      useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
      }, []);
    

  return (
    <AliceCarousel  mouseTracking infinite disableDotsControls 
     responsive={responsive}
     autoplay items={items} />
  );
}

export default Carousel;