import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export const SignupView = ({ onSignedUp }) => {
  const cardBody = {
    backgroundColor: '#f5fab2',
  };
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBirthday = new Date(birthday);
    const formattedBirthday = newBirthday.toISOString().split('T')[0];
    console.log(formattedBirthday)
    console.log(birthday)

    const data = {
      username: username,
      email: email,
      password: password,
      birthday: formattedBirthday,
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
        if (data) {
          console.log(data.userInfo)
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
      console.error('Error signing up:', error);
    }
  };

  return (
    <Card>
      <Card.Header>Log In</Card.Header>
      <Card.Body style={cardBody}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSignupUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              className="mb-3"
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
              className="mb-3"
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
              className="mb-3"
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
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
