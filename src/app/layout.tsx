// app/layout.tsx
'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store'; // Import persistor

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ children }: { children: React.ReactNode }) {

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
            <PersistGate loading={null} persistor={persistor}>
              <TooltipProvider>
                {children}
              </TooltipProvider>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
