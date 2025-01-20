import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import App from './App.tsx'

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AgoraRTCProvider client={client}>
      <App />
    </AgoraRTCProvider>
  </StrictMode>,
)
