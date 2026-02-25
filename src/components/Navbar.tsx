import { Link } from "react-router-dom";
import { Ship, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Ship className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">FreightIQ</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#stats" className="hover:text-foreground transition-colors">Platform</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link to="/login" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border px-4 py-4 flex flex-col gap-3">
          <a href="#features" className="text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>How It Works</a>
          <Link to="/login" className="text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Sign In</Link>
          <Link to="/login" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center font-medium" onClick={() => setOpen(false)}>Get Started</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
