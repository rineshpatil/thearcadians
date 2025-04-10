import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Define types for our data
type Participant = {
  name: string;
  profileUrl: string;
  milestone: string;
  arcadeGames: number;
  points: number;
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

export async function GET(request: NextRequest) {
  try {
    const participants = readParticipantsData();
    
    // Sort participants by points in descending order (highest points first)
    const sortedParticipants = [...participants].sort((a, b) => b.points - a.points);
    
    return NextResponse.json({ participants: sortedParticipants });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard data' },
      { status: 500 }
    );
  }
}
