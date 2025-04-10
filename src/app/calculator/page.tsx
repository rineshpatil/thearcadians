"use client";

import { useState } from "react";

type Participant = {
  name: string;
  profileUrl: string;
  milestone: string;
  arcadeGames: number;
  points: number;
};

type CalculatorResult = {
  participant: Participant;
  rank: number;
  totalParticipants: number;
};

export default function PointsCalculator() {
  const [profileUrl, setProfileUrl] = useState("");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileUrl.trim()) return;
    
    setLoading(true);
    setError("");
    setResult(null);
    
    try {
      const response = await fetch(`/api/calculator?profileUrl=${encodeURIComponent(profileUrl)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Participant not found. Please check the Google Cloud Skills Boost Profile URL and try again.");
        }
        throw new Error("Failed to fetch participant data");
      }
      
      const data = await response.json() as CalculatorResult;
      setResult(data);
    } catch (err: unknown) {
      console.error("Calculator error:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : "An error occurred while calculating points. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to get trophy based on rank
  const getTrophy = (rank: number) => {
    if (rank === 1) return <span className="trophy-gold">🏆</span>;
    if (rank === 2) return <span className="trophy-silver">🥈</span>;
    if (rank === 3) return <span className="trophy-bronze">🥉</span>;
    return null;
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="arcade-title text-3xl md:text-4xl font-bold mb-4">POINTS CALCULATOR</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Enter your Google Cloud Skills Boost Profile URL to fetch your points from our database and see where you stand in the
          Google Cloud Arcade program.
        </p>
      </section>

      <section className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg p-6 shadow-lg border">
          <h2 className="text-2xl font-bold mb-4">Calculate Your Points</h2>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="profileUrl" className="block text-sm font-medium mb-1">
                Google Cloud Skills Boost Profile URL
              </label>
              <div className="relative">
                <input
                  id="profileUrl"
                  type="text"
                  placeholder="https://www.cloudskillsboost.google/public_profiles/..."
                  className="w-full p-3 pr-10 rounded-md border bg-background"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 top-3 text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Calculating..." : "Calculate Points"}
              </button>
            </div>
          </form>

          {/* Loading state */}
          {loading && (
            <div className="mt-6 p-4 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-md text-center">
              {error}
            </div>
          )}

          {/* Results section */}
          {result && !loading && (
            <div className="mt-6 p-6 bg-card/50 rounded-md border">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Results for {result.participant.name}</h3>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
                  <div className="bg-card p-4 rounded-lg border text-center min-w-[150px]">
                    <div className="text-sm text-muted-foreground mb-1">Milestone</div>
                    <div className="text-xl font-bold">{result.participant.milestone || "None"}</div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border text-center min-w-[150px]">
                    <div className="text-sm text-muted-foreground mb-1">Arcade Games</div>
                    <div className="text-4xl font-bold">{result.participant.arcadeGames}</div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border text-center min-w-[150px]">
                    <div className="text-sm text-muted-foreground mb-1">Points</div>
                    <div className="text-4xl font-bold text-primary">{result.participant.points}</div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border text-center min-w-[150px]">
                    <div className="text-sm text-muted-foreground mb-1">Rank</div>
                    <div className="text-4xl font-bold flex justify-center items-center">
                      {getTrophy(result.rank)}
                      <span className="ml-2">{result.rank}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      of {result.totalParticipants} participants
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  Keep participating in the Google Cloud Arcade program to earn more points and improve your ranking!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="relative h-32 md:h-48">
        <div className="absolute bottom-0 left-1/3 spaceship" style={{ animationDelay: "0.5s" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L8 7H16L12 2Z" fill="#FFD700" />
            <path d="M8 7V16H16V7H8Z" fill="#E0E0E0" />
            <path d="M8 16L6 20H10L8 16Z" fill="#FF6B6B" />
            <path d="M16 16L14 20H18L16 16Z" fill="#FF6B6B" />
            <path d="M12 16L10 20H14L12 16Z" fill="#FF6B6B" />
          </svg>
        </div>
      </div>
    </div>
  );
}
