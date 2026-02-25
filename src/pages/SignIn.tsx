import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Globe, ArrowLeft, RefreshCw } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captcha) {
      alert("Invalid CAPTCHA. Please try again.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">FreightIQ</span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mb-6">Sign in to your freight intelligence platform</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input required type="email" placeholder="you@company.com" className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            {/* CAPTCHA */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Security Verification</label>
              <div className="flex items-center gap-3">
                <div className="h-11 px-4 rounded-lg bg-muted border border-border flex items-center justify-center font-mono text-lg tracking-[0.3em] font-bold select-none text-primary min-w-[120px]">
                  {captcha}
                </div>
                <button type="button" onClick={() => setCaptcha(generateCaptcha())} className="h-11 w-11 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors shrink-0">
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </button>
                <input
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <button type="submit" className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
