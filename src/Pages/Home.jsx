import viteLogo from '/vite.svg';
import reactLogo from '/react.svg';
import { Button, Container } from 'react-bootstrap';

function Home() {
    return (
    <Container className='text-center py-4'>
      <div>
          <h3>Made Using :&nbsp;</h3>
          <img src={viteLogo} className="logo" />
          <img src={reactLogo} className="logo react" />
      </div>
        <Button href='/posts'>Get Started</Button>
      <div className='mt-3'>
        tutor puh
      </div>
    </Container>
    );
}

export default Home;