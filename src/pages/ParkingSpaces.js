import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeAgo from "timeago-react";
import { getDistance } from "geolib";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function ParkingSpaces() {
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://20.120.28.0:8000/api/parkingSpaces",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setParkings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3 className="p-2 m-3">Available Parking Spots</h3>

      <div className="row p-0 m-0">
        {parkings.map((e) => (
          <Link
            to={`/parkingSpaces/${e.id}`}
            className="col-md-6 mb-3"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                display: "flex",
                padding: "10px",
                margin: "0px 10px",
                background: "white",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                borderRadius: "5px",
              }}
            >
              <div>
                <h5>{e.street_name}</h5>
                <small style={{ fontSize: "12px", color: "#444444" }}>
                  {(
                    getDistance(
                      { latitude: 43.0382961, longitude: -76.133473 },
                      { latitude: e.longitude, longitude: e.latitude }
                    ) * 0.000621371
                  ).toFixed(2)}{" "}
                  miles away
                </small>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <small style={{ fontSize: "12px", color: "#444444" }}>
                  Posted <TimeAgo datetime={e.date} locale="en_US" />
                </small>
                <div style={{ fontSize: "12px", color: "#444444" }}>
                  🟢 Available
                </div>
                <div></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
