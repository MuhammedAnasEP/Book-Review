import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray'}}>
        <FormContainer>
       <h1>Sign In</h1>
       {error && <Message variant='danger'>{error}</Message>}
       {loading && <Loader />}
       <Form >
         <Form.Group controlId='username'>
           <Form.Label>Username</Form.Label>
           <Form.Control
             type='text'
             placeholder='Enter Username'
             value={username}
             onChange={(e) => setUsername(e.target.value)}
           ></Form.Control>
         </Form.Group>

         <Form.Group controlId='password'>
           <Form.Label>Password</Form.Label>
           <Form.Control
             type='password'
             placeholder='Enter password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           ></Form.Control>
         </Form.Group>

         <Button type='submit' className='mt-3' variant='primary'>
           Sign In
         </Button>
       </Form>

       <Row className='py-3'>
         <Col>
           New Customer?{' '}
           <Link to={'/register'}>
             Register
           </Link>
         </Col>
       </Row>
     </FormContainer>
    </div>
  )
}

export default LoginPage