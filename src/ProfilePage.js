import React, { useState, useEffect } from "react";
import "./profilePage.css";
import { Link, useParams } from "react-router-dom";
import Timer from "./Timer";

const ProfilePage = () => {
  const { userName, userId } = useParams();
  const [countries, setCountries] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedTimerDate, setSelectedTimerDate] = useState('');
  const [istimer, setIsTimer] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [setUsers]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [setPosts]);

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, [countries]);

  function toggleDates() {
    setIsTimer(!istimer);
  };


  return (
    <div>
      <header className="header">
        <Link className="btn-back btn" to={"/"}>
          Back
        </Link>
        <div className="country-selector">
          <label htmlFor="selectCountry" className="label">
            Country
          </label>
          <select id="selectCountry" value={selectedTimerDate} onChange={e => setSelectedTimerDate(e.target.value)}> 
            {countries.map((country) => {
              return <option key={country} value={country}>{country}</option>;
            })}
          </select>
          <div>
            <Timer />
          </div>
          <button className="btn-start btn" onClick={toggleDates}>Pause/Start</button>
        </div>
      </header>
      <div className="profile-container">
        <h2 className="title">Profile Page</h2>
        <div className="name-address-container">
          {users.map((user) => {
            if (user.name === userName) {
              return (
                <>
                  <div className="username" >
                    <p>Name</p>
                    <div>
                      <p>{userName}</p> <strong>|</strong>{" "}
                      <p>{user.company.catchPhrase}</p>
                    </div>
                  </div>
                  <div className="email">
                    <p>Address</p>
                    <br />
                    <p>{user.email}</p> <strong>|</strong> <p>{user.phone}</p>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
      <div className="posts-container">
        {posts.map((post) => {
          if (post.userId === Number(userId)) {
            return (
              <div className="post-box" >
                <h4>{post.title}</h4>
                <br />
                <p>{post.body}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
