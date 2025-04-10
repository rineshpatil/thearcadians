import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// API key for LLM search
const API_KEY = "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";

// Define types for our data
type Participant = {
  name: string;
  points: number;
  milestone: string;
  arcadeGames: number;
  profileUrl: string;
};

// Function to read and parse the CSV file
function readParticipantsData(): Participant[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'participants.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  return records.map((record: any) => ({
    name: record['User Name'],
    profileUrl: record['Google Cloud Skills Boost Profile URL'],
    milestone: record['Milestone Earned'],
    arcadeGames: parseInt(record['# of Arcade Games Completed'] || '0', 10),
    points: parseInt(record['# of Arcade Games Completed'] || '0', 10) * 100 // Simple calculation for demo
  }));
}

// Function to handle facilitator queries
function getFacilitatorInfo(query: string) {
  if (query.toLowerCase().includes('facilitator') || 
      query.toLowerCase().includes('cohort') || 
      query.toLowerCase().includes('who')) {
    return {
      facilitators: [
        {
          name: "Rinesh Patil",
          role: "Google Cloud Arcade Facilitator",
          linkedin: "https://www.linkedin.com/in/rineshpatil/",
          bio: "Rinesh Patil is a dedicated Google Cloud Arcade Facilitator helping participants navigate their cloud learning journey."
        },
        {
          name: "Aishwary Gathe",
          role: "Google Cloud Arcade Facilitator",
          linkedin: "https://www.linkedin.com/in/aishwarygathe/",
          bio: "Aishwary Gathe is an experienced Google Cloud Arcade Facilitator supporting participants in mastering cloud technologies."
        }
      ]
    };
  }
  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query')?.toLowerCase() || '';
  
  try {
    const participants = readParticipantsData();
    
    // If no query, return all participants
    if (!query) {
      return NextResponse.json({ participants });
    }
    
    // Filter participants based on the query
    const filteredParticipants = participants.filter(participant => 
      participant.name.toLowerCase().includes(query)
    );
    
    // Check for facilitator information
    const facilitatorInfo = getFacilitatorInfo(query);
    
    // Generate a response about the Arcade program if no participants match
    // and the query seems to be asking about the program
    let programInfo = null;
    if (filteredParticipants.length === 0 && !facilitatorInfo) {
      const arcadeKeywords = ['arcade', 'program', 'google cloud', 'points', 'badges', 'milestone'];
      const isArcadeQuery = arcadeKeywords.some(keyword => query.includes(keyword));
      
      if (isArcadeQuery) {
        programInfo = {
          name: "Google Cloud Arcade Facilitator Program 2025",
          description: "The Arcade Facilitator Program is an always-on, no-cost gaming campaign where technical practitioners of all levels can learn new cloud skills like computing, application development, big data & AI/ML and earn digital badges & points to use towards claiming swag prizes and Google Cloud goodies.",
          duration: "April 1, 2025 - June 2, 2025",
          benefits: [
            "Earn digital badges for your professional profile",
            "Gain hands-on experience with cloud technologies",
            "Earn points redeemable for Google Cloud merchandise",
            "Join a community of technical practitioners"
          ]
        };
      }
    }
    
    return NextResponse.json({ 
      participants: filteredParticipants,
      programInfo,
      facilitatorInfo,
      query,
      apiKey: API_KEY // Include API key in response for client-side use
    });
  } catch (error) {
    console.error('Error processing search:', error);
    return NextResponse.json(
      { error: 'Failed to process search' },
      { status: 500 }
    );
  }
}
