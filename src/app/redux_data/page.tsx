"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

import MainLayout from '@/components/layout/MainLayout';

const HomePage = () => {
    const appState = useSelector((state: RootState) => state.appState);
    const userState = useSelector((state: RootState) => state.user);
    const filterState = useSelector((state: RootState) => state.filter);

    return (
        <MainLayout>
            <div>
                <h2>App State</h2>
                <pre>{JSON.stringify(appState, null, 2)}</pre>
                <h2>User State</h2>
                <pre>{JSON.stringify(userState, null, 2)}</pre>
                <h2>Filter State</h2>
                <pre>{JSON.stringify(filterState, null, 2)}</pre>
            </div>
        </MainLayout>
    );
};

export default HomePage;
