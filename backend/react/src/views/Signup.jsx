import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const Signup = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const onSumbit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value
    }

    axiosClient.post('/signup',payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
        }
      })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSumbit}>
          <h1 className='title'>Signup</h1>
          {errors && <div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
          }
          <input
            type="text"
            placeholder='Full Name'
            ref={nameRef}
          />
          <input 
            type='email'
            placeholder='Email'
            ref={emailRef}
          />
          <input 
            type='password'
            placeholder='Password'
            ref={passwordRef}
          />          
          <input 
            type='password'
            placeholder='Confirm Password'
            ref={confirmPasswordRef}
          />
          <button className='btn btn-block'> Signup </button>
          <p className='message'>
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup