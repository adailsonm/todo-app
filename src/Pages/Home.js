import React from 'react';
import { Header } from '../components/Header';
import { List } from '../components/List';
import { useAuth } from '../contexts/auth';

export function Home() {
    return (
        <>
            <Header/>
            <List />
        </>
    );
}


