import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Figure,
} from 'react-bootstrap';

export const ProfileView = ({
  user,
  token,
  books,
  setUser,
  removeFavorite,
}) => {
  const cardBody = {
    backgroundColor: '#f5fab2',
  };
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  // Filter Favorite Books
  const favBooks = books.filter((book) =>
    user.favorites.includes(book.id)
  );

  // Display Correct Birthday
  const displayBirthday = user.birthday.slice(0, 10);
  // const originalDate = new Date(originalDateString);
  // const day = (originalDate.getDate() + 1).toString().padStart(2, '0');
  // const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  // const year = originalDate.getFullYear();
  // const displayBirthday = `${month}-${day}-${year}`;

  // Deregister User
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://backendbooks-9697c5937ad6.herokuapp.com/users/${username}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUser(null);
        localStorage.clear();
        alert('your account has been deleted');
        window.location.replace('/login');
      } else {
        alert('Could not delete account');
      }
    } catch (error) {
      console.error(
        'Error occurred while trying to delete profile:',
        error
      );
    }
  };

  // Update User
  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      birthday: birthday,
    };

    try {
      const response = await fetch(
        `https://backendbooks-9697c5937ad6.herokuapp.com/users/${user.username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Update response: ', data);

        if (data) {

          localStorage.setItem('user', JSON.stringify(data.updatedUser));
          setUser(data.updatedUser);
        } else {
          throw new Error('Update failed');
        }
      }
    } catch (error) {
      console.error(
        'Error occurred while trying to update profile:',
        error
      );
    }
  };

  return (
    <Container>
      <Row className="mb-5">
        <Card>
          <Card.Header>
            <strong>My Info</strong>
          </Card.Header>
          <Card.Body style={cardBody}>
            <Card.Text>
              <strong>Username:</strong> {username}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {email}
            </Card.Text>
            <Card.Text>
              <strong>Birthday:</strong> {displayBirthday}
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mb-5">
        <Card>
          <Card.Header>
            <strong>Update Me</strong>
          </Card.Header>
          <Card.Body style={cardBody}>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUpdateUsername">
                <Form.Label>
                  <strong>Username:</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="3"
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formUpdateEmail">
                <Form.Label>
                  <strong>Email:</strong>
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength="3"
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formUpdateBirthday">
                <Form.Label>
                  <strong>Birthday:</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mb-5">
        <Card>
          <Card.Header>
            <Row>
              <Col xs={12}>
                <strong>Favorite Books</strong>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body style={cardBody}>
            <Row>
              {favBooks.map((book) => {
                return (
                  <Col xs={12} md={6} lg={3} key={book.id}>
                    <Figure>
                      <Link to={`/books/${book.id}`}>
                        <Figure.Image src={book.image} alt={book.title} />
                        <Figure.Caption>{book.title}</Figure.Caption>
                      </Link>
                    </Figure>
                    <Button onClick={() => removeFavorite(user, book.id)}>
                      Remove
                    </Button>
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mb-5">
        <Card>
          <Card.Header>
            <strong>Deregister</strong>
          </Card.Header>
          <Card.Body style={cardBody}>
            <Card.Text>
              <strong>
                Please remove me from the app and delete all my data:
              </strong>
              <Button
                className="remove-btn"
                onClick={handleDelete}
                variant="danger"
                type="submit">
                Deregister
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};
