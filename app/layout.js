import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "AI Mock Interview Platform",
  description: "Developed by Umair Faheem",
  icons: {
    icon: "/logo.svg", 
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`overflow-x-hidden`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
