import Header from "./components/Header";
import BackgroundBlobs from "./ext/BackgroundBlobs";
import "./globals.css";

export const metadata = {
  title: "Bonhomiee",
  description: "Next.js Travel Homepage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <BackgroundBlobs />
        <Header />
        {children}
      </body>
    </html>
  );
}
