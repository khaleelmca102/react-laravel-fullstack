import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider'

const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout')
            .then(()=>{
                setUser({});
                setToken(null);
            })
    }

    useEffect (() => {
        axiosClient.get('/user')
            .then(({data})=>{
                setUser(data);
            })
    },[])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                       {user.name}
                       <a className='btn-logout' href="#" onClick={onLogout} >Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DefaultLayout