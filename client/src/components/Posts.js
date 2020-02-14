import React, { useState, useEffect}  from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';

import PostCard from './PostCard';

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPosts = () => {
    return axios.get('https://post-it-lc.herokuapp.com/api/post');
  };

  const fetchUsers = () => {
    return axios.get('https://post-it-lc.herokuapp.com/api/user');
  };

  const fetchData = () => {
    setIsFetching(true);

    axios.all([fetchPosts(), fetchUsers()])
      .then(axios.spread((fetchedPosts, fetchedUsers) => {
        let map = new Map();
          
        fetchedUsers.data.forEach(user => {
          map.set(user.id, user.name);
        });

        console.log(map);

        const mappedPosts = fetchedPosts.data.map(post => {
          return { ...post, author: map.get(post.user_id) }
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
        posts.map(post => <PostCard key={post.id} post={post} />)
      )}
    </section>
  );
};

export default Posts;