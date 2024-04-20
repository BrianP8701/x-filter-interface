// app/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { usePathname } from 'next/navigation'
import { store } from "./store/store";
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@radix-ui/react-tooltip";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPage = store.getState().appState.current_page;
  const pathname = usePathname();

  useEffect(() => {
    // Normalize and ensure both paths start with a slash
    const normalizedPathname = `/${pathname}`.replace(/\/\/+/g, '/');
    const normalizedCurrentPage = `/${currentPage}`.replace(/\/\/+/g, '/');

    // Check if the current route is different from the intended route before pushing
    if (normalizedPathname !== normalizedCurrentPage && !normalizedPathname.includes(normalizedCurrentPage)) {
      router.push(currentPage);
    }
  }, [currentPage, pathname, router]); // Add dependencies here


  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
