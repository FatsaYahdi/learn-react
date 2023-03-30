import viteLogo from '/vite.svg';
import reactLogo from '/react.svg';
import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';

function Home() {
  const token = localStorage.getItem('token')
    return (
    <Container className='text-center py-4'>
      <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" />
          </a>
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