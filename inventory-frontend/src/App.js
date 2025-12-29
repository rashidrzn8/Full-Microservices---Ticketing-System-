import React, { useState } from "react";
import axios from "axios";

function App() {
  const BASE_URL = "http://localhost:8090"; // API Gateway

  // ---------- Booking ----------
  const [name, setName] = useState("");
  const [booking, setBooking] = useState(null);
  const [bookingError, setBookingError] = useState("");

  // ---------- Venue Inventory ----------
  const [venueId, setVenueId] = useState("");
  const [venueInventory, setVenueInventory] = useState(null);
  const [venueError, setVenueError] = useState("");

  // ---------- Event Inventory ----------
  const [eventId, setEventId] = useState("");
  const [eventInventory, setEventInventory] = useState(null);
  const [eventError, setEventError] = useState("");

  // --------- Booking Handler ---------
  const handleBooking = async () => {
    setBooking(null);
    setBookingError("");
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/booking`, { name });
      setBooking(response.data); // Matches BookingResponse DTO
    } catch (error) {
      if (error.response) {
        setBookingError(error.response.data);
      } else {
        setBookingError(error.message);
      }
    }
  };

  // --------- Venue Inventory Handler ---------
  const fetchVenueInventory = async () => {
    setVenueInventory(null);
    setVenueError("");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/inventory/venue/${venueId}`
      );
      setVenueInventory(response.data); // Matches VenueInventoryResponse DTO
    } catch (error) {
      setVenueError("Failed to fetch venue inventory");
    }
  };

  // --------- Event Inventory Handler ---------
  const fetchEventInventory = async () => {
    setEventInventory(null);
    setEventError("");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/inventory/events/${eventId}`
      );
      setEventInventory(response.data); // Matches EventInventoryResponse DTO
    } catch (error) {
      setEventError("Failed to fetch event inventory");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Booking & Inventory Dashboard</h1>

      {/* -------- Booking -------- */}
      <div
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h2>Book a Slot</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={handleBooking}>Book</button>
        {booking && (
          <div style={{ marginTop: "10px", color: "green" }}>
            <strong>Booking Successful:</strong>
            <p>User ID: {booking.userId}</p>
            <p>Event ID: {booking.eventId}</p>
            <p>Tickets: {booking.ticketCount}</p>
            <p>Total Price: {booking.totalPrice}</p>
          </div>
        )}
        {bookingError && <p style={{ color: "red" }}>{bookingError}</p>}
      </div>

      {/* -------- Venue Inventory -------- */}
      <div
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h2>Check Venue Inventory</h2>
        <input
          type="text"
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
          placeholder="Enter Venue ID"
        />
        <button onClick={fetchVenueInventory}>Fetch Venue Inventory</button>

        {venueInventory && (
          <div style={{ marginTop: "10px", color: "blue" }}>
            <p>Venue ID: {venueInventory.id}</p>
            <p>Name: {venueInventory.venueName}</p>
            <p>Total Capacity: {venueInventory.totalCapacity}</p>
          </div>
        )}
        {venueError && <p style={{ color: "red" }}>{venueError}</p>}
      </div>

      {/* -------- Event Inventory -------- */}
      <div
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h2>Check Event Inventory</h2>
        <input
          type="text"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          placeholder="Enter Event ID"
        />
        <button onClick={fetchEventInventory}>Fetch Event Inventory</button>

        {eventInventory && (
          <div style={{ marginTop: "10px", color: "purple" }}>
            <p>Event ID: {eventInventory.eventId}</p>
            <p>Event Name: {eventInventory.event}</p>
            <p>Capacity: {eventInventory.capacity}</p>
            {eventInventory.venue && (
              <p>
                Venue: {eventInventory.venue.venueName} (Capacity:{" "}
                {eventInventory.venue.totalCapacity})
              </p>
            )}
            <p>Ticket Price: {eventInventory.ticketPrice}</p>
          </div>
        )}
        {eventError && <p style={{ color: "red" }}>{eventError}</p>}
      </div>
    </div>
  );
}

export default App;
