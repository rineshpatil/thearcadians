"use client";

import { useState, useEffect } from "react";

type Participant = {
  name: string;
  profileUrl: string;
  milestone: string;
  arcadeGames: number;
  points: number;
};

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        
        const data = await response.json();
        setLeaderboardData((data as { participants: Participant[] }).participants);
      } catch (err) {
        console.error("Leaderboard error:", err);
        setError("An error occurred while fetching leaderboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Function to render trophy based on rank
  const renderTrophy = (rank: number) => {
    if (rank === 0) return <span className="trophy-gold mr-2">🏆</span>;
    if (rank === 1) return <span className="trophy-silver mr-2">🥈</span>;
    if (rank === 2) return <span className="trophy-bronze mr-2">🥉</span>;
    return null;
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="arcade-title text-3xl md:text-4xl font-bold mb-4">LEADERBOARD</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Check out the top performers in the Google Cloud Arcade program. The top three participants
          receive special recognition with gold, silver, and bronze trophies.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg p-6 shadow-lg border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Participants Ranking</h2>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md text-center">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Rank</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Milestone</th>
                    <th className="py-3 px-4 text-center">Arcade Games</th>
                    <th className="py-3 px-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((participant, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {renderTrophy(index)}
                          <span>{index + 1}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <a 
                          href={participant.profileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary hover:underline"
                        >
                          {participant.name}
                        </a>
                      </td>
                      <td className="py-3 px-4">{participant.milestone || "None"}</td>
                      <td className="py-3 px-4 text-center">{participant.arcadeGames}</td>
                      <td className="py-3 px-4 text-right">{participant.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <div className="relative h-32 md:h-48">
        <div className="absolute bottom-0 right-1/3 spaceship" style={{ animationDelay: "1s" }}>
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
