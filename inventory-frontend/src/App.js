import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [venueId, setVenueId] = useState("");
  const [venueInfo, setVenueInfo] = useState(null);
  const [error, setError] = useState("");

  const backendUrl = "http://localhost:8080/api/v1";

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${backendUrl}/inventory/events`);
      console.log("Events response:", response.data); // check structure
      setEvents(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching events");
    }
  };

  // Fetch venue info by ID
  const fetchVenue = async () => {
    if (!venueId) return;
    try {
      const response = await axios.get(
        `${backendUrl}/inventory/venue/${venueId}`
      );
      console.log("Venue response:", response.data); // check structure
      setVenueInfo(response.data || null);
      setError("");
    } catch (err) {
      console.error(err);
      setVenueInfo(null);
      setError("Error fetching venue info");
    }
  };

  // Fetch events on page load
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Inventory Service</h1>

      {/* Events List */}
      <section>
        <h2>All Events</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                {event.eventName} - {event.eventDate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events available.</p>
        )}
      </section>

      <hr />

      {/* Venue Info */}
      <section>
        <h2>Check Venue</h2>
        <input
          type="number"
          placeholder="Enter Venue ID"
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
        />
        <button onClick={fetchVenue} style={{ marginLeft: "10px" }}>
          Fetch Venue
        </button>

        {venueInfo && (
          <div style={{ marginTop: "10px" }}>
            <h3>{venueInfo.venueName}</h3>
            <p>Total Capacity: {venueInfo.totalCapacity}</p>
          </div>
        )}
      </section>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
