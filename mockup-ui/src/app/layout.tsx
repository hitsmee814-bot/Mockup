import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title: "TravelX",
  description: "Next.js Travel Homepage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />   {/* 👈 this shows up on every page */}
        {children}
      </body>
    </html>
  );
}
