import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const cardBody = {
    backgroundColor: '#f5fab2',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        'https://backendbooks-9697c5937ad6.herokuapp.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data) {
          localStorage.setItem('user', JSON.stringify(data.userInfo));
          localStorage.setItem('token', data.userInfo.token);
          onLoggedIn(data.userInfo, data.userInfo.token);
        } else {
          alert('User data not found.');
        }
      } else {
        console.error(
          'Login request failed with status:',
          response.status
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Card>
      <Card.Header>Log In</Card.Header>
      <Card.Body style={cardBody}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formLoginEmail">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength="3"
              className="mb-3"
            />
          </Form.Group>
          <Form.Group controlId="formLoginPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
