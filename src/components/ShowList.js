import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ShowListItem from './ShowListItem';
import { Link } from 'react-router-dom';

const ShowList = ({ history }) => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchShows = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=all&page=${page}`);
      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error('Invalid data format. Expected an array.');
        setHasMore(false);
        return;
      }

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setShows(prevShows => {
        const newShows = data.filter(newShow => !prevShows.some(existingShow => existingShow.show.id === newShow.show.id));
        return [...prevShows, ...newShows];
      });
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching shows', error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [page]); // Fetch shows when the page changes

  const handleShowClick = (showId) => {
    history.push(`/show/${showId}`);
  };

  return (
    <div className="container ml-4 mr-4"> 
    <InfiniteScroll
      dataLength={shows.length}
      next={fetchShows}
      hasMore={hasMore}
    //   loader={<h4>Loading...</h4>}
    >
     
      <h1 className="text-center" style={{margin:"35px",marginTop:"90px"}}>TV Shows</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {shows.map(show => (
          <div key={show.show.id} className="col">
            <ShowListItem
              name={show.show.name ? show.show.name : "NA"}
              rating={show.show.rating.average ? show.show.rating.average : "NA"}
              language={show.show.language ? show.show.language : "NA"}
              averageRuntime={show.show.runtime ? show.show.runtime : "NA"}
              imageUrl={show.show.image ? show.show.image.medium : null}
              onClick={() => handleShowClick(show.show.id)}
            />
              <Link to={`/show/${show.show.id}/summary`}>
                <button className="btn btn-primary mt-2">Show Summary</button>
              </Link>
          </div>
        ))}
      </div>
    </InfiniteScroll>
    </div>
  );
};

export default ShowList;
