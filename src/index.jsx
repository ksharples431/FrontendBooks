import { createRoot } from 'react-dom/client';
import { Container } from 'react-bootstrap';

import { MainView } from './components/main-view/main-view';

import './index.scss';

const MyBooksApp = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<MyBooksApp />);
