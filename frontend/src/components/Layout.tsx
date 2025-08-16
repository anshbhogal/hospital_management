import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
          <footer className="bg-card border-t border-border/50 p-4 text-center text-sm text-muted-foreground">
            2025 All rights reserved by Ansh Bhogal
          </footer>
        </div>
      </div>
    </div>
  );
};