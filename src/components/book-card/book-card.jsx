import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import './book-card.scss';

export const BookCard = ({ book, onBookClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" className="h-100" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Button onClick={() => onBookClick(book)} >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  onBookClick: PropTypes.func.isRequired,
};
