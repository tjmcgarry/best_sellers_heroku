import { useState } from "react";
import { Button } from "@material-ui/core";

function LikeCard({ book, onDeleteLike, setLikes }) {
  const [formData, setFormData] = useState({
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    e.preventDefault();
    fetch(`/user_books/${book.id}`, config)
      .then((r) => r.json())
      .then((data) => console.log(data));
    fetch("/user_books")
      .then((r) => r.json())
      .then(setLikes);
  };
  return (
    <div>
      <img src={book.book.img_url} alt="book"></img>
      <h3>{book.book.author}</h3>
      <h3>{book.book.title}</h3>
      <h3>Rating: {book.rating}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating</label>
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit Rating</button>
      </form>
      <Button onClick={() => onDeleteLike(book.id)}>Delete</Button>
    </div>
  );
}

export default LikeCard;
