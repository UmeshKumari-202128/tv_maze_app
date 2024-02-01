// ShowListItem.js
import React from 'react';

const ShowListItem = ({ name, averageRuntime, rating, language, imageUrl, onClick }) => {
  return (

      
    <div className="my-3">
      <div className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img
            src={
              !imageUrl
                ? "https://static.tvmaze.com/uploads/images/medium_portrait/67/168214.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
        
        <div className="card-body">
          <h5 className="card-title">Movie : {name}</h5>
          <p className="card-text">Rating : {rating}</p>
          <p className="card-text">Language : {language}</p>
          <p className="card-text">Runtime : {averageRuntime}</p>
         
        </div>
      </div>
    </div>
  );
};

export default ShowListItem;
