// app/home/signup/page.tsx
'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signupUser } from '@/app/api/authentication';
import { ApiError } from "@/types/apiError";
import UserTypeSelect from "@/components/custom/UserTypeSelect";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCurrentPage } from "@/app/store/appState";

import { setUser } from "@/app/store/userSlice";
import { useDispatch } from "react-redux";

export default function Dashboard() {
    const [username, setUsername] = useState('');
    const [x_username, setXUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    const [isXUsernameEmpty, setIsXUsernameEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
    const dispatch = useDispatch();

    const router = useRouter(); // for routing

    const validateForm = () => {
        let isValid = true;
        let errorMessage = ''; // Use a local variable to accumulate error messages


        setIsPasswordEmpty(!password);
        setIsConfirmPasswordEmpty(!confirmPassword);
        setIsUsernameEmpty(!username);
        setIsXUsernameEmpty(!x_username);

        if (!username || !x_username || !password || !confirmPassword) {
            errorMessage = 'Fill out required fields';
            isValid = false;
        }

        if (password !== confirmPassword) {
            if (errorMessage) errorMessage += '\nPasswords do not match';
            else errorMessage = 'Passwords do not match';
            isValid = false;
        }

        setError(errorMessage); // Set the error state once at the end with the accumulated message
        return isValid;
    };

    const handleSignup = async () => {
        console.log('Signup button clicked');
        if (validateForm()) {
            setError('');
            try {
                const user = await signupUser(username, x_username, password);
                dispatch(setUser(user));
                console.log('Signup successful', user);
                dispatch(setCurrentPage('/filter_convo'));
                router.push('/filter_convo'); // Redirect to dashboard upon success
            } catch (error) {
                const typedError = error as ApiError;
                setError(typedError.message || 'Signup failed');
            }
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid">
                        <div className="grid gap-2">
                            <Label htmlFor="username" className={isUsernameEmpty ? 'error-label' : ''}>Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="x_username" className={isXUsernameEmpty ? 'error-label' : ''}>X Username</Label>
                        <Input
                            id="x_username"
                            type="text"
                            placeholder="x_username"
                            required
                            value={x_username}
                            onChange={(e) => setXUsername(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className={isPasswordEmpty ? 'error-label' : ''}>Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password" className={isConfirmPasswordEmpty ? 'error-label' : ''}>Confirm password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button type="button" onClick={handleSignup} className="w-full">
                        Create an account
                    </Button>
                    {/* <Button variant="outline" className="w-full">
                        Sign up with Gmail
                    </Button> */}
                    {error.split('\n').map((line, index) => (
                        <p key={index} className="text-red-500 text-center text-sm">{line}</p>
                    ))}                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/authentication/signin" className="underline" onClick={() => {
                            dispatch(setCurrentPage('/authentication/signin'));
                            router.push('/authentication/signin');
                        }}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block lg:h-screen">
                <Image
                    src="/snow.jpeg"
                    alt="Image"
                    className="absolute top-0 left-0 w-full h-full"
                    fill
                    sizes="(min-width: 1024px) 100vw, 0vw"
                    style={{
                        objectFit: "cover"
                    }} />
            </div>
        </div>
    );
}
