import { Card, Button } from 'react-bootstrap';
import './book-view.scss';

export const BookView = ({ book, onBackClick }) => {
  return (
    <Card className="h-100" key={book.id}>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Text className="title">{book.title}</Card.Text>
        <Card.Text>Author: {book.author}</Card.Text>
        <Card.Text>Genre: {book.genre}</Card.Text>
        <Card.Text>
          Series: {book.seriesName}: Book {book.seriesNumber}
        </Card.Text>
        <Card.Text>Description: {book.description}</Card.Text>
      </Card.Body>
      <Button onClick={onBackClick}>Back</Button>
    </Card>
  );
};
