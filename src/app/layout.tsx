import HelpWidget from "./components/help-widget";
import { AuthProvider } from "./context/AuthContext";
import BackgroundCurve from "./ext/BackgroundCurve";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "Bonhomiee",
  description: "Next.js Travel Homepage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <BackgroundCurve />
        <Toaster />
        {/* <Header /> */}
        
        <AuthProvider>
        {children}
        </AuthProvider>
        
        <HelpWidget/>
      </body>
    </html>
  );
} 

