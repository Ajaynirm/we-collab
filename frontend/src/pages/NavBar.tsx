import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Search, Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Theme = "light" | "dark";

const navLinks = [
  { name: "Dashboard", href: "#" },
  { name: "Tasks", href: "#" },
  { name: "Teams", href: "#" },
  { name: "Messages", href: "#" },
];

export const Navbar: React.FC = () => {
  const [active, setActive] = useState("Dashboard");
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 pt-8">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => setActive(link.name)}
                    className={`text-left text-sm font-medium transition hover:text-primary ${
                      active === link.name
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <h1 className="text-xl font-bold select-none">
            Collab<span className="text-primary">Sync</span>
          </h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 ml-6 relative">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActive(link.name)}
                className={`relative text-sm font-medium transition hover:text-primary ${
                  active === link.name
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
                {active === link.name && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 w-56 md:w-64"
            />
          </div>

          {/* Notification */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/avatars/user.jpg" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Login</Button>
          <Button>Get Started</Button>
        </div>
      </div>
     
    </header>
  );
};
