import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Globe, ArrowLeft, RefreshCw } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Account Created!</h1>
          <p className="text-muted-foreground mb-2">Verification email sent to your email address.</p>
          <p className="text-sm text-muted-foreground mb-8">Please check your inbox and verify your email to get started.</p>
          <button onClick={() => navigate("/signin")} className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
          <h1 className="text-2xl font-bold mb-1">Create Your Account</h1>
          <p className="text-sm text-muted-foreground mb-6">Start predicting freight delays today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                <input required type="text" placeholder="John Doe" className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Company Name *</label>
                <input required type="text" placeholder="Acme Logistics" className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email ID *</label>
              <input required type="email" placeholder="you@company.com" className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone Number *</label>
              <input required type="tel" placeholder="+1 (555) 000-0000" className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Type of Goods *</label>
                <select required className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select type</option>
                  <option value="perishable">Perishable</option>
                  <option value="electronics">Electronics</option>
                  <option value="pharma">Pharma</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Mode of Shipment *</label>
                <select required className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select mode</option>
                  <option value="sea">Sea</option>
                  <option value="air">Air</option>
                  <option value="road">Road</option>
                  <option value="multimodal">Multimodal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Password *</label>
              <input required type="password" placeholder="••••••••" className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            {/* CAPTCHA */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Security Verification *</label>
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
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
