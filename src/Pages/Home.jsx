import viteLogo from '/vite.svg';
import reactLogo from '/react.svg';
import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';

function Home() {
  const token = localStorage.getItem('token')
    return (
    <Container className='text-center py-4'>
      <div>
          <h3>Made Using :&nbsp;</h3>
          <img src={viteLogo} className="logo" />
          <img src={reactLogo} className="logo react" />
      </div>
      {token ?
        <Button href='/posts' variant='secondary'>Get Started</Button>
        :
        <Button href='/login' variant='secondary'>Login</Button>
      }
      <div className='mt-3'>
        tutor puh
      </div>
    </Container>
    );
}

export default Home;