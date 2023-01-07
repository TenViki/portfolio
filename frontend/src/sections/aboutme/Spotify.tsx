import React from "react";
import { useWebData } from "../../utils/useWebData";
import "./Spotify.scss";
import { ScrollAnimation } from "../../components/ScrollAnimation/ScrollAnimation";

const Spotify = () => {
  const { data, refreshData } = useWebData();

  React.useEffect(() => {
    if (!data || !data.spotify) return;

    setTimeout(() => {
      refreshData();
    }, data.spotify.duration - data.spotify.progress + 1000);
  }, [data]);

  if (!data || !data.spotify) return null;

  console.log(data);

  return (
    <div className="spotify-widget">
      <ScrollAnimation delay={150} animation="fade-in">
        <div className="spotify-widget-image">
          <img src={data.spotify.cover} alt="" />
        </div>
      </ScrollAnimation>

      <ScrollAnimation delay={250} animation="fade-in">
        <div className="spotify-widget-text">
          <div className="spotify-widget-title">Currently listening to:</div>

          <div className="spotify-widget-song">
            <div className="spotify-widget-song-name">{data.spotify.name}</div>
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation delay={350} animation="fade-in">
        <div className="spotify-widget-animation">
          <div className="spotify-bar spotify-bar-1"></div>
          <div className="spotify-bar spotify-bar-2"></div>
          <div className="spotify-bar spotify-bar-3"></div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default Spotify;
