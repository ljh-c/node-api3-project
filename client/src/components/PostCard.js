import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';

const PostCard = ({ post }) => {
  return (
    <Card>
      <CardHeader tag="h2"><Link to={`/user/${post.user_id}`}>{post.author}</Link></CardHeader>
      <CardBody>
        <CardText>{post.text}</CardText>
      </CardBody>
    </Card>
  );
}

export default PostCard;