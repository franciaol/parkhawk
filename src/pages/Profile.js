import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeAgo from "timeago-react";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [rewards, setRewards] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://20.120.28.0:8000/api/users",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setProfile(response.data[1]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    let config2 = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://20.120.28.0:8000/api/rewards",
      headers: {},
    };

    axios
      .request(config2)
      .then((response) => {
        setRewards(response.data);
        setLoading2(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading2(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
          <div class="card p-4" style={{ border: 0 }}>
            <div class="image d-flex flex-column justify-content-center align-items-center">
              <button
                class="btn btn-info"
                style={{
                  width: "130px",
                  height: "130px",
                  padding: 0,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={profile.photo}
                  style={{
                    padding: 0,
                    width: "130px",
                    height: "130px",
                    objectFit: "center",
                  }}
                  alt="avatar"
                />
              </button>
              <h5 class="name mt-3">
                {profile.first_name} {profile.last_name}
              </h5>
              <span class="idd">{profile.email}</span>
              <br />
              <br />
              {loading2 ? (
                ""
              ) : (
                <div
                  style={{
                    padding: "3px",
                    background: "#dcf3f7",
                    borderRadius: "20px",
                  }}
                >
                  <h6 className="my-4 text-center">⭐️⭐️ Earned Rewards</h6>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Reward Type</th>
                        <th scope="col">Point</th>
                        <th scope="col">Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rewards.map((e) => (
                        <tr>
                          <td>{e.type}</td>
                          <td>{e.point}</td>
                          <td>
                            <TimeAgo datetime={e.date} locale="en_US" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div class=" px-2 rounded mt-4 date ">
                {" "}
                <span class="join">Joined April,2023</span>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
