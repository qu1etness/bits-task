import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import router from "./routes.ts";
import {WishesProvider} from "@/context/wishes-contex.tsx";
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WishesProvider>
            <RouterProvider router={router}/>
            <Toaster position="bottom-right" richColors closeButton />
        </WishesProvider>
    </StrictMode>
);
