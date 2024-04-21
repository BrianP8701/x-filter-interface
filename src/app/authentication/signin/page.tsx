"use client";
// app/home/signin/page.tsx
import Image from "next/legacy/image"
import Link from "next/link"
import { useState } from "react";
import { useDispatch } from "react-redux";

import { signinUser } from '@/app/api/authentication';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { setCurrentPage } from "@/app/store/appState";
import { setUser } from "@/app/store/userSlice";
import { setChat } from "@/app/store/chatSlice";

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter(); // for routing

  const handleSignin = async () => {
    console.log('Signin button clicked');
    try {
      const response = await signinUser(username, password);
      const user = response.user;
      const chat = response.conversation;
      console.log('Chat:', chat);
      dispatch(setUser(user));
      dispatch(setChat(chat));
      dispatch(setCurrentPage('/filter_convo'));
      router.push('/filter_convo'); // Redirect to dashboard upon success
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" onClick={handleSignin}>
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href="/authentication/signup" className="underline" onClick={() => {
              dispatch(setCurrentPage('/authentication/signup'));
              router.push('/authentication/signup');
            }}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block lg:h-screen">
        <Image
          src="/snow.jpeg"
          alt="Image"
          className="absolute top-0 left-0 w-full h-full"
          layout="fill"
          sizes="(min-width: 1024px) 100vw, 0vw"
          style={{
            objectFit: "cover"
          }} />
      </div>
    </div>
  );
}
