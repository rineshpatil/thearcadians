"use client";

import { useState } from "react";
import Image from "next/image";

// Add this import at the top
import './globals.css';

type Facilitator = {
  name: string;
  role: string;
  image: string;
  linkedIn: string;
  bio: string;
};

export default function About() {
  // Updated facilitator data with real information
  const [facilitators] = useState<Facilitator[]>([
    {
      name: "Rinesh Patil",
      role: "Google Cloud Arcade Facilitator",
      image: "/images/Rinesh Patil.png",
      linkedIn: "https://www.linkedin.com/in/rineshpatil/",
      bio: "Rinesh Patil is a dedicated Google Cloud Arcade Facilitator helping participants navigate their cloud learning journey and achieve their certification goals."
    },
    {
      name: "Aishwary Gathe",
      role: "Google Cloud Arcade Facilitator",
      image: "/images/Aishwary Gathe.jpg",
      linkedIn: "https://www.linkedin.com/in/aishwarygathe/",
      bio: "Aishwary Gathe is an experienced Google Cloud Arcade Facilitator supporting participants in mastering cloud technologies and building their skills portfolio."
    }
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground space-y-8">
      <section className="text-center py-8">
        <h1 className="arcade-title text-3xl md:text-4xl font-bold mb-4">ABOUT</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Learn more about the Google Cloud Arcade Facilitator Program 2025 and the facilitators who make it possible.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg p-6 shadow-lg border">
          <h2 className="text-2xl font-bold mb-4">Arcade Facilitator Program 2025</h2>
          
          <div className="prose prose-invert max-w-none">
            <p>
              The Arcade Facilitator Program is an always-on, no-cost gaming campaign where technical practitioners of all levels can learn new cloud skills like computing, application development, big data & AI/ML and earn digital badges & points to use towards claiming swag prizes and Google Cloud goodies.
            </p>
            
            <p className="mt-4">
              Program Duration: April 1, 2025 at 5:00 PM - June 2, 2025 at 11:59 PM GMT+5:30
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">Why join the program?</h3>
            <p>
              There are a lot of things in store for you. By the end of this program:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>You can showcase what you've learned here to your professional network using Google Cloud-hosted digital badges that you can add to your resume and professional profiles.</li>
              <li>You'll earn points that can be redeemed for exclusive Google Cloud merchandise and swag.</li>
              <li>You'll gain hands-on experience with cutting-edge cloud technologies that are in high demand in the industry.</li>
              <li>You'll become part of a community of like-minded technical practitioners.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">Program Structure</h3>
            <p>
              The Arcade Facilitator Program is structured as a gaming campaign with the following components:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Learning Paths:</strong> Structured sequences of labs and quests focused on specific Google Cloud technologies.</li>
              <li><strong>Badges:</strong> Digital credentials earned by completing labs and quests, which can be shared on professional profiles.</li>
              <li><strong>Points:</strong> Earned for completing activities, with higher points for more advanced challenges.</li>
              <li><strong>Leaderboard:</strong> Tracks participant progress and recognizes top performers.</li>
              <li><strong>Rewards:</strong> Points can be redeemed for exclusive Google Cloud merchandise and swag.</li>
            </ul>
            
            <div className="mt-6">
              <Image 
                src="/images/GCRAF 2025.png" 
                alt="Google Cloud Arcade Swags" 
                width={800} 
                height={400} 
                className="rounded-lg mx-auto"
              />
              <p className="text-center text-sm mt-2 text-muted-foreground">
                Google Cloud Swags - depends upon the number of arcade points you collect
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-8">
        <div className="bg-card rounded-lg p-6 shadow-lg border">
          <h2 className="text-2xl font-bold mb-6">Meet the Facilitators</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilitators.map((facilitator, index) => (
              <div key={index} className="bg-card/50 rounded-lg p-4 border text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full">
                  <Image 
                    src={facilitator.image} 
                    alt={facilitator.name} 
                    fill 
                    style={{objectFit: 'cover'}} 
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold">{facilitator.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{facilitator.role}</p>
                <p className="mt-3 text-sm">{facilitator.bio}</p>
                <div className="mt-3">
                  <a 
                    href={facilitator.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline text-sm flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-8">
        <div className="bg-card rounded-lg p-6 shadow-lg border">
          <h2 className="text-2xl font-bold mb-4">Join the Community</h2>
          
          <p className="mb-4">
            Connect with other Arcade participants and facilitators to share experiences, ask questions, and collaborate on challenges.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <a 
              href="https://t.me/googlecloudarcade" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-white p-4 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-2.426 14.741h-1.449l-.111-.741s-.401.345-1.087.345c-.689 0-1.18-.4-1.18-1.057 0-.881.535-1.134 1.134-1.134h1.1v-.223c0-.314-.245-.349-.705-.349-.545 0-.982.116-1.155.116l-.245-1.076c.245-.116 1-.223 1.6-.223 1.011 0 1.545.576 1.545 1.359l-.045 2.984zm.401-1.993h-.6c-.223 0-.535.022-.535.349 0 .245.223.256.401.256.312 0 .535-.111.735-.223v-.382zm4.347 1.993v-2.662c0-.576-.156-.865-.915-.865-.535 0-.915.134-1.2.223l-.134-.741c.245-.088.735-.223 1.356-.223.915 0 1.545.4 1.545 1.359v2.906h-1.449l-.111-.512s-.401.6-1.122.6c-.689 0-1.191-.445-1.191-1.122 0-1.122 1.011-1.359 2.024-1.359v-.223c0-.178-.111-.223-.401-.223-.445 0-.845.111-.956.111l-.223-.689c.156-.088.645-.245 1.313-.245.956 0 1.465.4 1.465 1.057v2.618h-.001zm-.044-1.634c-.556 0-1.122.111-1.122.576 0 .267.223.4.489.4.312 0 .535-.178.689-.334v-.642h-.056z"/>
              </svg>
              Join us on Telegram
            </a>
            <a 
              href="https://chat.whatsapp.com/GSKxsS4IADG3COgvOGrp2H"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Join us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="relative h-32 md:h-48">
        <div className="absolute bottom-0 right-1/4 spaceship" style={{ animationDelay: "1.5s" }}>
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
