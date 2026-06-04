import React, { useState } from "react";
import { UserProfile, CookingSession } from "../types";
import { ChefHat, Sparkles, Star, Award, Clock, ArrowRight, MessageSquare, Plus, Upload, Camera, Image, X, Check } from "lucide-react";

interface PostCookingScreenProps {
  user: UserProfile;
  session: CookingSession;
  onConcludeCooking: (finalSession: CookingSession) => void;
}

export default function PostCookingScreen({ user, session, onConcludeCooking }: PostCookingScreenProps) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const [dishImage, setDishImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Experience math helpers
  const handleRatingSelect = (stars: number) => {
    setRating(stars);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadImage(file);
    }
  };

  const loadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setDishImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      loadImage(file);
    }
  };

  const simulateCameraShot = () => {
    const options = [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60"
    ];
    const picked = options[Math.floor(Math.random() * options.length)];
    setDishImage(picked);
  };

  const handleConclude = () => {
    // Add positive rating bonus if star >= 4
    let ratingBonus = rating >= 4 ? 5 : 0;
    
    // Construct finalized session
    const finalized: CookingSession = {
      ...session,
      rating,
      feedbackNotes: feedback,
      dishImage: dishImage || undefined,
      xpEarned: session.xpEarned + ratingBonus
    };
    
    onConcludeCooking(finalized);
  };

  const getMultiplierLabel = () => {
    if (user.streak >= 3) {
      return `Cook Streak active: 1.2x boost factored in!`;
    }
    return `Cooking Streak: ${user.streak} Days. (Cook 3 days in a row for 1.2x boost)`;
  };

  const formatSecondsToMinutes = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return mins > 0 
      ? `${mins}m ${remainingSecs}s` 
      : `${remainingSecs}s`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 md:p-10 max-w-2xl mx-auto space-y-8 animate-fade-in text-slate-800">
      
      {/* 1. CELEBRATION SHIELD */}
      <div className="text-center space-y-3">
        <div className="p-4 bg-orange-50 text-orange-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-sm border border-orange-100">
          <ChefHat className="w-10 h-10 animate-pulse" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-black tracking-tight text-slate-900">
          Bon Appétit!
        </h2>
        <div className="flex justify-center items-center gap-1.5 text-xs text-[#A0855B] font-bold uppercase font-mono tracking-widest">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>Feast Prepared Successfully</span>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
        </div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          You have successfully finished cooking <strong>{session.recipeTitle}</strong>. Take a look at your culinary performance summary below:
        </p>
      </div>

      {/* 2. STATS BREAKDOWN GRID */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#FAF9F6] border border-slate-150 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-mono font-black text-slate-450 block uppercase mb-1">Time Elapsed</span>
          <span className="text-lg font-bold text-slate-800 font-mono flex items-center justify-center gap-1">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{formatSecondsToMinutes(session.totalTimeTaken)}</span>
          </span>
        </div>
        <div className="bg-[#FAF9F6] border border-slate-150 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-mono font-black text-slate-450 block uppercase mb-1">Steps Followed</span>
          <span className="text-lg font-black text-slate-800 font-mono">
            {session.stepsCompletedCount} / {session.stepsCompletedCount}
          </span>
        </div>
      </div>

      {/* 3. XP SCORE SHEET DETAIL BLOCK */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 md:p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
          <span className="text-xs font-mono font-black text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>Experience Points Score Sheet</span>
          </span>
          <span className="text-lg font-mono font-black text-amber-300">
            +{session.xpEarned + (rating >= 4 ? 5 : 0)} XP
          </span>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-slate-400">Base Completion:</span>
            <span>+50 XP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Complexity Rank points:</span>
            <span>+{(session.xpEarned >= 80) ? "30 XP" : "10 XP"}</span>
          </div>

          {/* Perfect clock bonus */}
          {session.timerAccuracyBonus && (
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>⏱️ Perfect Timer Accuracy:</span>
              <span>+25 XP</span>
            </div>
          )}

          {/* Clean attempt bonus */}
          {session.firstAttemptBonus && (
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>💎 Clean Attempt (No redos):</span>
              <span>+15 XP</span>
            </div>
          )}

          {/* Positive rating dynamic bonus indicators */}
          {rating >= 4 && (
            <div className="flex justify-between text-amber-300 font-bold">
              <span>⭐ Positive Feedback Reward:</span>
              <span>+5 XP</span>
            </div>
          )}

          {user.streak >= 3 && (
            <div className="flex justify-between text-[#A0855B] font-bold border-t border-white/5 pt-1.5">
              <span>🔥 Streak Multiplier Active (1.2x):</span>
              <span>Factored In</span>
            </div>
          )}
        </div>

        <div className="text-[10px] text-slate-400 text-center font-serif italic pt-1 text-xs">
          `{getMultiplierLabel()}`
        </div>
      </div>

      {/* 4. USER FEEDBACK NOTES & RATING */}
      <div className="space-y-4 border-t border-slate-100 pt-6">

        {/* DISH PHOTO UPLOADER CARD */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="text-center">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 justify-center">
              <Camera className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>Plating Exhibition: Take/Upload Dish Photo</span>
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Drag and drop your recipe creation photo below, select standard files, or simulate a smartphone snapshot.</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("dish-photo-uploader")?.click()}
              className={`w-full max-w-sm h-44 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all overflow-hidden relative ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800 scale-[1.01]"
                  : dishImage
                  ? "border-slate-300 bg-slate-50"
                  : "border-slate-200 hover:border-[#A0855B] hover:bg-stone-50 text-slate-400"
              }`}
            >
              <input
                id="dish-photo-uploader"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {dishImage ? (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100 animate-fade-in group">
                  <img
                    src={dishImage}
                    alt="My Culinary Masterpiece"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 flex gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDishImage(null);
                      }}
                      className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg transition-transform focus:outline-none cursor-pointer"
                      title="Remove Image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 text-amber-300 text-[10px] font-mono uppercase tracking-wider font-extrabold px-3 py-1 rounded-xl shadow-md border border-white/10 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                    <span>DISH SNAPSHOT LOGGED</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 pointer-events-none">
                  <Upload className="w-7 h-7 mx-auto text-slate-400 animate-pulse" />
                  <div className="text-xs font-bold text-slate-700">
                    Drag & Drop snapshot, or <span className="text-[#A0855B] underline">Browse</span>
                  </div>
                  <div className="text-[9.5px] text-slate-400 font-mono">
                    PNG, JPG, WEBP limits up to 5MB
                  </div>
                </div>
              )}
            </div>

            {!dishImage && (
              <button
                type="button"
                onClick={simulateCameraShot}
                className="px-3.5 py-2.5 border border-slate-200 hover:border-[#A0855B] bg-[#FAF9F6] hover:bg-[#F1EDE4] text-slate-700 rounded-2xl text-[10.5px] font-bold flex items-center gap-1.5 transition-all focus:outline-none cursor-pointer"
                title="Mock Camera Image"
              >
                <Camera className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>Simulate Camera Shot (Preset Demo) 📸</span>
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-500 uppercase tracking-wide mb-2 text-center">
            Rate This Recipe Difficulty & Outcome
          </label>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = hoverRating !== null ? star <= hoverRating : star <= rating;
              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => handleRatingSelect(star)}
                  className="p-1 transition-transform transform active:scale-110 focus:outline-none"
                >
                  <Star 
                    className={`w-7 h-7 ${
                      active 
                        ? "text-amber-400 fill-amber-400 filter drop-shadow-sm" 
                        : "text-slate-200 hover:text-amber-200"
                    }`} 
                  />
                </button>
              );
            })}
          </div>
          {rating >= 4 && (
            <span className="text-[10px] font-mono font-bold text-center block text-emerald-600 uppercase mt-1">
              🎉 +5 XP feedback points unlocked!
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-black text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chef Notes & Recipe Adjustments</span>
          </label>
          <textarea
            placeholder="Type notes for next cooking session (e.g. 'Use slightly less ginger, keep chicken cube sizes smaller for better searing')"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-20 p-3 border border-slate-250 rounded-xl text-xs bg-[#FAF9F6] focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
          />
        </div>
      </div>

      {/* 5. FINALIZE CTAs */}
      <div className="pt-4 flex gap-3">
        <button
          onClick={handleConclude}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-2xl shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 focus:outline-none pointer-cursor"
        >
          <span>Complete Session & Record XP</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
}
