import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import UpdateForm from './UpdateForm';

const PostCard = ({ post }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postText, setPostText] = useState(post.text);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Card>
      <CardHeader tag="h2">
        <Link to={`/user/${post.user_id}`}>{post.author}</Link>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="right">
          <DropdownToggle><i className="material-icons">more_vert</i></DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => setIsEditing(true)}>Edit</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody>
        {!isEditing ? <CardText>{postText}</CardText> : (
          <UpdateForm post={post} setIsEditing={setIsEditing} setPostText={setPostText} />
        )}
      </CardBody>
    </Card>
  );
}

export default PostCard;