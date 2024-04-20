"use client";
// components/layout/MainLayout.tsx
import React, { useState, ReactNode } from 'react';
import styles from '@/styles/AppNavigation.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { setCurrentPage } from "@/app/store/appState";

interface MainLayoutProps {
    children?: ReactNode;
}

interface NavButtonProps {
    icon: string;
    label: string;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, onClick }) => (
    <button className={styles.button} onClick={onClick}>
        <div style={{ position: 'relative', height: '30px', width: '30px' }}>
            <Image src={icon} alt={label} layout="fill" objectFit="contain" />
        </div>
        <span className={styles.buttonLabel}>{label}</span>
    </button>
);

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleModeChange = (mode: string) => {
        dispatch(setCurrentPage(`/${mode}`));
        router.push(`/${mode}`);
    };

    return (
        <div>
            <div className={`${styles.sidebar} bg-background border-r border-muted w-50 h-screen`}>
                <div className={styles.menu}>
                    <NavButton icon="/chat.png" label="Filter Home" onClick={() => handleModeChange('filter_convo')} />
                    <NavButton icon="/choose.png" label="Filter Settings" onClick={() => handleModeChange('filter_choose')} />
                    <NavButton icon="/choose.png" label="Redux Tree" onClick={() => handleModeChange('redux_data')} />
                </div>
            </div>
            <div className="h-screen ml-[50px]" style={{ width: 'calc(100% - 50px)', overflow: 'hidden' }}> {/* Disable scroll here */}
                <div className="h-screen w-full" style={{ overflowY: 'auto' }}> {/* Enable scroll on children container if necessary */}
                    {children}
                </div>
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                    <Button type="submit" className="mx-2" onClick={() => handleModeChange('filter_convo')}>
                        Filter
                    </Button>
                    <Button type="submit" className="mx-2" onClick={() => handleModeChange('terminator')}>
                        Terminator
                    </Button>
                </div>
            </div>
        </div>
    );

};

export default MainLayout;
