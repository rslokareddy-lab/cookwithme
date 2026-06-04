import React, { useState } from "react";
import { 
  Sparkles, ArrowRight, ArrowLeft, Users, Mail, User, ShieldAlert, Lock, Smile, ChefHat
} from "lucide-react";
import { UserProfile } from "../types";

interface LandingScreenProps {
  onSignUp: (newProfile: UserProfile) => void;
  onLogIn: (profile: UserProfile) => void;
  onEnterGuest: () => void;
  profiles: UserProfile[];
}

export default function LandingScreen({
  onSignUp,
  onLogIn,
  onEnterGuest,
  profiles = []
}: LandingScreenProps) {
  const [slide, setSlide] = useState(0);
  const [authMode, setAuthMode] = useState<"carousel" | "signup" | "login">(() => {
    const mode = localStorage.getItem("cook_mate_land_mode") as "signup" | "login" | null;
    localStorage.removeItem("cook_mate_land_mode");
    return mode || "carousel";
  });

  // Sign up Form states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  // Login Form states
  const [loginUserOrEmail, setLoginUserOrEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // High-resolution sharp photography paired with simple, warm user-friendly wording
  const slides = [
    {
      title: "Your Friendly Kitchen Sidekick",
      tagline: "Let's make cooking fun!",
      description: "Meet CookMate! We help you prepare delicious meals with easy step-by-step guides, voice helpers, and automatic timers. It's like having a chef buddy helping you out!",
      bgImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1920&q=90",
      image: (
        <svg className="w-full max-w-[220px] h-32 mx-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="75" r="50" className="fill-amber-50" />
          {/* Visually coherent cooking pot with gentle rising steam */}
          <rect x="65" y="75" width="70" height="40" rx="8" className="fill-slate-800" />
          <rect x="60" y="70" width="80" height="6" rx="3" className="fill-slate-700" />
          <rect x="92" y="62" width="16" height="8" rx="2" className="fill-slate-600" />
          <rect x="53" y="85" width="12" height="6" rx="2" className="fill-slate-600" />
          <rect x="135" y="85" width="12" height="6" rx="2" className="fill-slate-600" />
          {/* Stable and beautiful pulsing steam waves */}
          <path d="M80 50 Q85 41 80 32" stroke="#A0855B" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />
          <path d="M100 46 Q105 37 100 28" stroke="#A0855B" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: "250ms" }} />
          <path d="M120 50 Q125 41 120 32" stroke="#A0855B" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: "500ms" }} />
          <circle cx="150" cy="45" r="3.5" className="fill-amber-400 animate-pulse" />
          <circle cx="50" cy="55" r="2.5" className="fill-amber-300 animate-pulse" style={{ animationDelay: "400ms" }} />
        </svg>
      )
    },
    {
      title: "Use Ingredients You Already Have",
      tagline: "No waste, tasty meals",
      description: "Just add whatever food items are sitting inside your fridge or pantry. We will immediately show you delicious recipes you can cook right now with what you've got!",
      bgImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1920&q=90",
      image: (
        <svg className="w-full max-w-[220px] h-32 mx-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="75" r="55" className="fill-emerald-50/60" />
          <rect x="70" y="40" width="60" height="80" rx="6" className="fill-emerald-800 stroke-emerald-600" strokeWidth="3" />
          <line x1="70" y1="80" x2="130" y2="80" stroke="#10B981" strokeWidth="2" />
          <rect x="80" y="55" width="12" height="18" rx="2" className="fill-amber-400" />
          <circle cx="115" cy="65" r="5" className="fill-rose-400" />
          <rect x="82" y="90" width="36" height="14" rx="2" className="fill-emerald-500" />
          <path d="M130 65C150 65 140 100 160 100" stroke="#059669" strokeWidth="2" strokeDasharray="2,2" />
          <path d="M130 95C150 95 155 75 165 75" stroke="#059669" strokeWidth="2" strokeDasharray="2,2" />
        </svg>
      )
    },
    {
      title: "Earn Levels & Rewards",
      tagline: "Your cooking journey",
      description: "Complete cooking recipes to earn points and upgrade your friendly chef level! Watch your skills grow, win trophies, and unlock customized styles for your app.",
      bgImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1920&q=90",
      image: (
        <svg className="w-full max-w-[220px] h-32 mx-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="75" r="50" className="fill-indigo-50/60" />
          <rect x="65" y="50" width="15" height="60" rx="2" className="fill-indigo-600" />
          <rect x="83" y="45" width="14" height="65" rx="2" className="fill-indigo-400" />
          <rect x="100" y="60" width="16" height="50" rx="3" className="fill-[#A0855B]" />
          <circle cx="140" cy="80" r="16" className="fill-amber-400 animate-pulse" />
          <polygon points="140,70 144,78 152,78 146,84 148,92 140,87 132,92 134,84 128,78 136,78" className="fill-white" />
        </svg>
      )
    },
    {
      title: "Introducing CookMate",
      tagline: "Your Culinary Adventure",
      description: "Ready to start cooking? Create your custom culinary profile container, keep a fun streak going, and build delicious food memories with your favorite recipes!",
      bgImage: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1920&q=90",
      image: (
        <svg className="w-full max-w-[220px] h-32 mx-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="75" r="50" className="fill-rose-50/50" />
          <path d="M100 45C115 20 145 35 100 95C55 35 85 20 100 45Z" className="fill-rose-500 animate-pulse" />
          <path d="M100 70Q105 60 100 50Q95 60 100 70" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    }
  };

  const handlePrev = () => {
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  const handleUsernameInput = (val: string) => {
    // IG username: lowercase, no spaces, no caps, only alphanumeric + '.' and '_'
    const cleaned = val.toLowerCase().replace(/[^a-z0-9._]/g, "");
    setUsername(cleaned);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");

    const nick = nickname.trim();
    const userStr = username.trim();
    const emailStr = email.trim();
    const passStr = password.trim();

    if (!nick || !userStr || !emailStr || !passStr) {
      setSignUpError("Please fill out all credentials to proceed.");
      return;
    }

    if (userStr.length < 3) {
      setSignUpError("Username must be at least 3 characters.");
      return;
    }

    // Check duplicate username inside existing profiles list
    if (profiles.some(p => p.username === userStr || p.name.toLowerCase() === nick.toLowerCase())) {
      setSignUpError("This Chef Profile or Username already exists.");
      return;
    }

    // Generate compliant initial profile
    const freshProfile: UserProfile = {
      name: nick,
      username: userStr,
      email: emailStr,
      password: passStr,
      isGuest: false,
      level: 1,
      xp: 0,
      streak: 3,
      lastCookedDate: (() => {
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        return yesterdayDate.toLocaleDateString("en-CA");
      })(),
      pantry: [
        { name: "Chicken breast", quantity: "400g", category: "Proteins" },
        { name: "Eggs", quantity: "6 whole", category: "Proteins" },
        { name: "Broccoli", quantity: "1.5 cups", category: "Vegetables" },
        { name: "Garlic cloves", quantity: "8 cloves", category: "Vegetables" },
        { name: "Onion", quantity: "4 whole", category: "Vegetables" },
        { name: "Tomato", quantity: "5 medium", category: "Vegetables" },
        { name: "Pasta", quantity: "400g", category: "Grains & Grains" },
        { name: "Olive oil", quantity: "500ml", category: "Liquid & Oils" },
        { name: "Butter", quantity: "250g", category: "Liquid & Oils" }
      ],
      dietPreferences: [],
      allergies: [],
      favorites: [],
      completedSessions: [],
      unlockedThemes: ["Modern Slate"],
      activeTheme: "Modern Slate",
      badges: [],
      shoppingList: []
    };

    onSignUp(freshProfile);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const target = loginUserOrEmail.trim().toLowerCase();
    const pass = loginPassword.trim();

    if (!target || !pass) {
      setLoginError("Please enter your username or email and password.");
      return;
    }

    const matchedProfile = profiles.find(p => 
      !p.isGuest && 
      (p.username?.toLowerCase() === target || p.email?.toLowerCase() === target) &&
      p.password === pass
    );

    if (matchedProfile) {
      onLogIn(matchedProfile);
    } else {
      setLoginError("Invalid username/email or password. Please try again.");
    }
  };

  const active = slides[slide];

  return (
    <div id="landing-screen-wrapper" className="fixed inset-0 w-full h-full z-50 overflow-hidden flex items-center justify-center p-4 bg-slate-950 select-none">
      
      {/* BACKGROUND IMAGE WITH REDUCED WHITE OVERLAY OPACITY AS REQUESTED */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 transform scale-100"
        style={{ backgroundImage: `url(${active.bgImage})` }} 
      />

      {/* WHITE OVERLAY - DECREASED FROM 70% TO 45% AS EXPLICITLY REQUESTED */}
      <div className="absolute inset-0 w-full h-full bg-white/45 backdrop-blur-[1.5px] z-0" />

      {/* CENTERED COMPACT CAROUSEL PANEL (Absolutely SAME dimension of h-[510px] sm:h-[530px] to prevent resizing) */}
      <div id="landing-carousel-card" className="relative z-10 bg-white border border-slate-200/80 rounded-[28px] p-5 sm:p-7 md:p-8 shadow-2xl max-w-sm sm:max-w-md w-full h-[510px] sm:h-[530px] flex flex-col justify-between text-center animate-fade-in my-auto mx-auto overflow-hidden">
        
        {authMode === "carousel" ? (
          <>
            {/* PROGRESS DECORATOR - CLEAN ALIGNMENT */}
            <div className="flex justify-end items-center text-[10px] font-mono font-black text-[#A0855B] uppercase tracking-wider">
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">Slide {slide + 1} of 4</span>
            </div>

            {/* COMPACT SVG EMBED */}
            <div className="flex items-center justify-center h-28 sm:h-32">
              {active.image}
            </div>

            {/* FRIENDLY COPYWRITING */}
            <div className="space-y-1.5 min-h-[110px] flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-widest font-mono font-black text-[#A0855B] block">
                {active.tagline}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight leading-snug">
                {active.title}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                {active.description}
              </p>
            </div>

            {/* PAGINATION DOTS */}
            <div className="flex justify-center items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlide(idx)}
                  className={`h-2 transition-all rounded-full cursor-pointer ${
                    slide === idx 
                      ? "w-6 bg-[#A0855B]" 
                      : "w-2 bg-slate-200 hover:bg-slate-400"
                  }`}
                  title={`Page ${idx + 1}`}
                />
              ))}
            </div>

            {/* NAVIGATION CONTROLS */}
            <div className="pt-2 border-t border-slate-100">
              {slide < 3 ? (
                /* First 3 slides navigation */
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={slide === 0}
                    className={`px-3 py-1.5 border border-slate-200 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors ${
                      slide === 0 
                        ? "opacity-20 cursor-not-allowed text-slate-350" 
                        : "hover:bg-slate-50 text-slate-700 cursor-pointer"
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all active:scale-98"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              ) : (
                /* Slide 4 custom auth trigger options exactly as configured */
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Create Account Top trigger */}
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className="py-3 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-serif font-black flex items-center justify-center gap-1 shadow-md cursor-pointer transition-all active:scale-98"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Create account</span>
                    </button>

                    {/* Login switch profile selector bottom trigger */}
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className="py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-250 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-[#A0855B]" />
                      <span>Login</span>
                    </button>
                  </div>

                  {/* BOTTOM RECOVERY EXPLAINERS */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-650 font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={onEnterGuest}
                      className="text-xs font-bold text-[#A0855B] hover:underline cursor-pointer"
                    >
                      Skip for now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : authMode === "signup" ? (
          /* EMBEDDED SIGN UP SCREEN INSIDE ACCURATE INNER BOUNDS OF THE MIDDLE BOX CARD - NO OVERFLOW */
          <form onSubmit={handleSignUpSubmit} className="flex flex-col justify-between h-full text-left">
            <div className="space-y-2">
              <div className="border-b border-slate-100 pb-1.5" />

              {signUpError && (
                <div className="p-2 bg-amber-50/80 border border-[#A0855B]/30 text-amber-900 rounded-xl text-[10px] font-bold flex items-center gap-1.5 animate-shake">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>{signUpError}</span>
                </div>
              )}

              <div className="space-y-2 text-xs">
                {/* 1. NICKNAME */}
                <div>
                  <label className="text-[9px] font-extrabold uppercase text-slate-400 block mb-0.5">Chef Nickname / Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450 select-none pointer-events-none">
                      <ChefHat className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Chef Nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 border border-slate-200 focus:outline-none focus:border-[#A0855B] rounded-xl text-xs bg-slate-50/50 text-slate-800 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 2. INSTAGRAM-STYLE USERNAME (no caps, no spaces) */}
                <div>
                  <label className="text-[9px] font-extrabold uppercase text-slate-400 block mb-0.5">Username (Lowercase, No Spaces)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs select-none pointer-events-none font-sans">@</span>
                    <input
                      type="text"
                      required
                      placeholder="username"
                      value={username}
                      onChange={(e) => handleUsernameInput(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 border border-slate-200 focus:outline-none focus:border-[#A0855B] rounded-xl text-xs bg-slate-50/50 text-slate-850 font-mono font-bold transition-all"
                    />
                  </div>
                </div>

                {/* 3. EMAIL ADDRESS */}
                <div>
                  <label className="text-[9px] font-extrabold uppercase text-slate-400 block mb-0.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 select-none pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 border border-slate-200 focus:outline-none focus:border-[#A0855B] rounded-xl text-xs bg-slate-50/50 text-slate-800 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 4. PASSWORD */}
                <div>
                  <label className="text-[9px] font-extrabold uppercase text-slate-400 block mb-0.5">Secret Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 select-none pointer-events-none" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 border border-slate-200 focus:outline-none focus:border-[#A0855B] rounded-xl text-xs bg-slate-50/50 text-slate-800 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAuthMode("carousel")}
                className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-650 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Compile Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          /* SECURE EMAIL / USERNAME & PASSWORD LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="flex flex-col justify-between h-full text-left">
            <div className="space-y-3 flex-1 flex flex-col min-h-0">
              <div className="border-b border-slate-100 pb-1.5" />

              <p className="text-[10px] text-slate-400 leading-tight">
                Enter your username or email address and your personal password to unlock your private kitchen cockpit.
              </p>

              {loginError && (
                <div className="p-2 bg-amber-50/80 border border-[#A0855B]/30 text-amber-900 rounded-xl text-[10px] font-bold flex items-center gap-1.5 animate-shake">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-3 text-xs">
                {/* USERNAME OR EMAIL */}
                <div>
                  <label className="text-[9px] font-extrabold uppercase text-slate-400 block mb-0.5">Username or Email</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs select-none pointer-events-none font-sans">@</span>
                    <input
                      type="text"
                      required
                      placeholder="Username or email address"
                      value={loginUserOrEmail}
                      onChange={(e) => setLoginUserOrEmail(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 border border-slate-200 focus:outline-none focus:border-[#A0855B] rounded-xl text-xs bg-slate-50/50 text-slate-850 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-[9px] font-extrabold uppercase text-slate-400 block mb-0.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 select-none pointer-events-none" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 border border-slate-200 focus:outline-none focus:border-[#A0855B] rounded-xl text-xs bg-slate-50/50 text-slate-800 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAuthMode("carousel")}
                className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-650 font-bold rounded-xl text-xs"
              >
                Back To Guide
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer animate-pulse"
              >
                <span>Unlock CookMate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
