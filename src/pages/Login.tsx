import { Ship } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl bg-primary" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Ship className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">FreightIQ</span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="text-2xl font-bold text-center mb-1">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            {isSignUp ? "Start predicting freight delays today" : "Sign in to your freight intelligence platform"}
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isSignUp && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Organization</label>
                <input
                  type="text"
                  placeholder="Acme Logistics"
                  className="w-full h-11 rounded-lg bg-secondary border border-border px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full h-11 rounded-lg bg-secondary border border-border px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-11 rounded-lg bg-secondary border border-border px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <Link
              to="/dashboard"
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-glow)]"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Link>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to FreightIQ's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
