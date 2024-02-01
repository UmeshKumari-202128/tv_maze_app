// ShowSummary.js
// ShowSummary.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./showSummary.css";

function removeTags(htmlString, tagsToRemove) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  tagsToRemove.forEach((tagName) => {
    const elements = doc.getElementsByTagName(tagName);
    for (let i = elements.length - 1; i >= 0; i--) {
      const textNode = document.createTextNode(elements[i].textContent);
      elements[i].parentNode.replaceChild(textNode, elements[i]);
    }
  });

  return doc.body.textContent;
}

const ShowSummary = () => {
  const { showId } = useParams();
  const [summary, setSummary] = useState("");
  const [showName, setShowName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    movieName: "",
    personName: "",
    numTickets: "",
    email: "",
  });

  useEffect(() => {
    const fetchShowSummary = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();

        const cleanedSummary = removeTags(data.summary, ["p", "b"]);
        setSummary(cleanedSummary);
        setShowName(data.name);
        
      } catch (error) {
        console.error("Error fetching show summary", error);
      }
    };

    const storedData = JSON.parse(localStorage.getItem("bookingData"));
    console.log("Stored Data:", storedData);

    fetchShowSummary();
  }, [showId]);

  const handleBookTicket = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Store form data in local storage
    localStorage.setItem("bookingData", JSON.stringify(formData));

    setFormData({
        movieName: '',
        personName: '',
        numTickets: '',
        email: '',
      });

    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center" style={{ margin: "35px", marginTop: "90px" }}>
        {showName}
      </h1>

      <p>{summary}</p>

      

      <div className="d-flex flex-column flex-sm-row justify-content-between">
  <button onClick={handleBookTicket} className="btn btn-primary mt-3">
    Book a Movie Ticket
  </button>

  <Link to="/" className="btn btn-secondary mt-3">
    Back to ShowList
  </Link>
</div>


      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h3 className="text-center" style={{ margin: "15px", marginTop: "10px" }}>Book Ticket</h3>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="movieName">Movie Name</label>
                <input
                  type="text"
                  id="movieName"
                  value={showName}
                  onChange={handleFormChange}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="personName">Person Name</label>
                <input
                  type="text"
                  id="personName"
                  value={formData.personName}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numTickets">Number of Tickets</label>
                <input
                  type="number"
                  id="numTickets"
                  value={formData.numTickets}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-secondary d-grid gap-2 col-6 mb-3 mt-3 mx-auto">Submit</button>

             
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSummary;
