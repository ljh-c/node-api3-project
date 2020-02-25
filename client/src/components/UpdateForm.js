import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'reactstrap';

const UpdateForm = ({ post, setIsEditing, setPostText }) => {
  const [textToEdit, setTextToEdit] = useState({
    text: post.text
  });

  const handleChange = evt => {
    evt.persist();
    setTextToEdit({
      text: evt.target.value
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    
    axios.put(`https://post-it-lc.herokuapp.com/api/post/${post.id}`, textToEdit).then(res => {
      setPostText(res.data.text);
    }).catch(err => {
      console.log(err.message);
    }).then(() => setIsEditing(false));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <textarea 
        className="form-control" 
        aria-label="With textarea" 
        placeholder="Text required"
        name="text"
        value={textToEdit.text}
        onChange={handleChange}
      />
      <br />
      <Button color="info" type="submit">
        Edit
      </Button>
    </Form>
  );
};

export default UpdateForm;