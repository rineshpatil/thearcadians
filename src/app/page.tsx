"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

type Participant = {
  name: string;
  profileUrl: string;
  milestone: string;
  arcadeGames: number;
  points: number;
};

type ProgramInfo = {
  name: string;
  description: string;
  duration: string;
  benefits: string[];
};

type FacilitatorInfo = {
  facilitators: {
    name: string;
    role: string;
    linkedin: string;
    bio: string;
  }[];
};

type SearchResult = {
  participants: Participant[];
  programInfo: ProgramInfo | null;
  facilitatorInfo: FacilitatorInfo | null;
  query: string;
  apiKey: string;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      
      const data = await response.json();
      setSearchResults(data as SearchResult);
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="arcade-title text-4xl md:text-6xl font-bold mb-6">
          THE ARCADIANS
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Welcome to the Google Cloud Arcade Participants community hub. Explore the leaderboard, 
          calculate your points, or learn more about the Arcade Facilitator Program.
        </p>
      </section>

      <section className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg p-6 shadow-lg border">
          <h2 className="text-2xl font-bold mb-4">LLM Search</h2>
          <p className="mb-4">
            Ask questions about the Arcade program or search for participants in our database.
          </p>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Ask a question or search for participants..."
              className="w-full p-3 pr-10 rounded-md border bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-3 top-3 text-primary"
              disabled={isLoading}
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
          </form>
          
          {isLoading && (
            <div className="mt-4 p-4 bg-card/50 rounded-md flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
          
          {searchResults && !isLoading && (
            <div className="mt-4 p-4 bg-card/50 rounded-md">
              {searchResults.participants.length > 0 ? (
                <div>
                  <h3 className="font-bold mb-2">Participants matching "{searchResults.query}":</h3>
                  <div className="space-y-2">
                    {searchResults.participants.map((participant, index) => (
                      <div key={index} className="p-2 bg-card rounded border">
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          <a href={participant.profileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            View Profile
                          </a>
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">Milestone:</span> {participant.milestone || "None"}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">Arcade Games:</span> {participant.arcadeGames}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">Points:</span> {participant.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchResults.facilitatorInfo ? (
                <div>
                  <h3 className="font-bold mb-2">Arcade Facilitators</h3>
                  <div className="space-y-4 mt-3">
                    {searchResults.facilitatorInfo.facilitators.map((facilitator, index) => (
                      <div key={index} className="p-3 bg-card rounded border">
                        <div className="font-medium text-lg">{facilitator.name}</div>
                        <div className="text-sm text-muted-foreground">{facilitator.role}</div>
                        <p className="my-2">{facilitator.bio}</p>
                        <a 
                          href={facilitator.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          LinkedIn Profile
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchResults.programInfo ? (
                <div>
                  <h3 className="font-bold mb-2">{searchResults.programInfo.name}</h3>
                  <p className="mb-2">{searchResults.programInfo.description}</p>
                  <p className="mb-2"><span className="font-medium">Duration:</span> {searchResults.programInfo.duration}</p>
                  <div className="mt-2">
                    <span className="font-medium">Benefits:</span>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {searchResults.programInfo.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  No results found for "{searchResults.query}". Try a different search term.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-card rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">LeaderBoard</h2>
          <p className="mb-4">
            Check out the top performers in the Google Cloud Arcade program.
          </p>
          <Link
            href="/leaderboard"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            View Leaderboard
          </Link>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">Points Calculator</h2>
          <p className="mb-4">
            Calculate your points and see where you stand in the program.
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Calculate Points
          </Link>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">About</h2>
          <p className="mb-4">
            Learn more about the Arcade Facilitator Program and its facilitators.
          </p>
          <Link
            href="/about"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      <div className="relative h-32 md:h-48 mt-8">
        <div className="absolute bottom-0 left-1/4 spaceship">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L8 7H16L12 2Z" fill="#FFD700" />
            <path d="M8 7V16H16V7H8Z" fill="#E0E0E0" />
            <path d="M8 16L6 20H10L8 16Z" fill="#FF6B6B" />
            <path d="M16 16L14 20H18L16 16Z" fill="#FF6B6B" />
            <path d="M12 16L10 20H14L12 16Z" fill="#FF6B6B" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-1/4 spaceship" style={{ animationDelay: "2s" }}>
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
