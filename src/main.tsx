import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import router from "./routes.ts";
import { WishesProvider } from "@/context/wishes-context.tsx";
import { Toaster } from 'sonner'
import { Snowfall } from "react-snowfall";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WishesProvider>
            <RouterProvider router={router} />
            <Toaster position="bottom-right" richColors closeButton />
            <Snowfall color={"blue"} enable3DRotation={true} />
        </WishesProvider>
    </StrictMode>
);
