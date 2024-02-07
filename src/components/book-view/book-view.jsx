import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Button, Row } from 'react-bootstrap';

export const BookView = ({ user, books, addFavorite, removeFavorite }) => {
  const { bookId } = useParams();
  const book = books.find((b) => b.id === bookId);

  const handleAddFavorite = () => {
    if (user && book) {
      addFavorite(user._id, book.id);
    }
  };

  const handleRemoveFavorite = () => {
    if (user && book) {
      removeFavorite(user._id, book.id);
    }
  };

  return (
    <Card className="h-100" key={book.id}>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Text className="title">{book.title}</Card.Text>
        <Card.Text>Author: {book.author}</Card.Text>
        <Card.Text>Genre: {book.genre}</Card.Text>
        <Card.Text>
          Series: {book.seriesName}, Book {book.seriesNumber}
        </Card.Text>
        <Card.Text>Description: {book.description}</Card.Text>
        <Card.Text>
          Favorite:{' '}
          <Button variant="link" onClick={handleAddFavorite}>
            Add
          </Button>
          <Button variant="link" onClick={handleRemoveFavorite}>
            Remove
          </Button>
        </Card.Text>
        <Row>
          <Link to={`/`}>
            <Button>Home</Button>
          </Link>
        </Row>
      </Card.Body>
    </Card>
  );
};
