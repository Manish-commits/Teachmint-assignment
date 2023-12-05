import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './app.css';

const App = () => {

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
 
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => setUsers(data));
    }, [setUsers]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => setPosts(data));
    }, [setPosts])


    return (
        <div className='app-container'>
            <h3 className='directory-title'>Directory</h3>
            <div className="directory-list">
            {users.map(user => {
                let countPosts = 0;
                for(let i =0; i< posts.length; i++){
                    if(user.id === posts[i].userId){
                        countPosts++;
                    }
                }
                return(
                <div className="list-items" key={user.name}>
                    <Link to={`/${user.name}/${user.id}`} style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
                    <p className="name">Name: {user.name}</p>
                    <p className='post'>Posts: {countPosts}</p>
                    </Link>
                </div> 
                )
            })}
            </div>
        </div>
    );
};

export default App;