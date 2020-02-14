import React, { useState, useEffect}  from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'reactstrap';

import PostCard from './PostCard';

const Profile = () => {
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const { id } = useParams();

  const fetchPosts = () => {
    return axios.get(`https://post-it-lc.herokuapp.com/api/user/${id}/posts`);
  };

  const fetchUser = () => {
    return axios.get(`https://post-it-lc.herokuapp.com/api/user/${id}`);
  };

  const fetchData = () => {
    setIsFetching(true);

    axios.all([fetchPosts(), fetchUser()])
      .then(axios.spread((fetchedPosts, fetchedUser) => {
        setUser(fetchedUser.data);

        const mappedPosts = fetchedPosts.data.map(post => {
          return { ...post, author: fetchedUser.data.name }
        });

        setPosts(mappedPosts);

        setIsFetching(false);
      }))
      .catch(err => {
        console.log(err);
        setIsFetching(false);
      })
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="posts">
      {isFetching && (
        <div className="dots">
          <Spinner type="grow" color="secondary" />
          <Spinner type="grow" color="secondary" />
          <Spinner type="grow" color="secondary" />
        </div>
      )}
      {!isFetching && posts && (
        <>
          <h2>{user.name}</h2>
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </>
      )}
    </section>
  );
};

export default Profile;