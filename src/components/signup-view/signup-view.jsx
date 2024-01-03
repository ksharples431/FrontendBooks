import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
      birthday: birthday,
    };

    try {
      const response = await fetch(
        'https://backendbooks-9697c5937ad6.herokuapp.com/auth/signup',
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
        console.log(data);

        if (data) {
          localStorage.setItem('user', JSON.stringify(data.userInfo));
          localStorage.setItem('token', data.userInfo.token);
          onSignedUp(data.userInfo, data.userInfo.token);
        } else {
          alert('User data not found.');
        }
      } else {
        console.error(
          'Signup request failed with status:',
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
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSignupUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>
          <Form.Group controlId="formSignupEmail">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>
          <Form.Group controlId="formSignupPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>
          <Form.Group controlId="formSignupBirthday">
            <Form.Label>Birthday: </Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
