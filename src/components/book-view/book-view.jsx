import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export const BookView = ({ books }) => {
  const { bookId } = useParams();
  const book = books.find((b) => b.id === bookId);
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
        <Link to={`/`}>
          <Button>Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
