import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients, doctors, appointments..."
              className="pl-10 bg-muted/50 border-0 focus:bg-background transition-smooth"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent transition-smooth"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-destructive-foreground rounded-full"></span>
            </span>
          </Button>

          {/* Current time */}
          <div className="hidden sm:block text-sm text-muted-foreground ml-4">
            {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </header>
  );
};