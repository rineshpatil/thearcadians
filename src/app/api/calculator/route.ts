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
  const searchParams = request.nextUrl.searchParams;
  const profileUrl = searchParams.get('profileUrl') || '';
  
  try {
    if (!profileUrl) {
      return NextResponse.json(
        { error: 'Google Cloud Skills Boost Profile URL parameter is required' },
        { status: 400 }
      );
    }
    
    const participants = readParticipantsData();
    
    // Find participant by profile URL (exact match)
    const participant = participants.find(p => 
      p.profileUrl === profileUrl
    );
    
    if (!participant) {
      return NextResponse.json(
        { error: 'Participant not found' },
        { status: 404 }
      );
    }
    
    // Calculate rank
    const sortedParticipants = [...participants].sort((a, b) => b.points - a.points);
    const rank = sortedParticipants.findIndex(p => p.name === participant.name) + 1;
    
    return NextResponse.json({ 
      participant,
      rank,
      totalParticipants: participants.length
    });
  } catch (error) {
    console.error('Error calculating points:', error);
    return NextResponse.json(
      { error: 'Failed to calculate points' },
      { status: 500 }
    );
  }
}
