import React from 'react';

interface ParticipantListProps {
  participants: string[];
  currentUser: string;
}

export const ParticipantList: React.FC<ParticipantListProps> = ({ participants, currentUser }) => {
  // Use a Set to ensure the list of names is unique before rendering
  const uniqueParticipants = [...new Set(participants)];

  return (
    <aside className="w-48 md:w-56 lg:w-64 bg-gray-800 p-4 flex-shrink-0 border-r border-gray-700/50 hidden sm:flex sm:flex-col">
      <h2 className="text-lg font-bold text-white mb-4">
        Participants 
        <span className="text-sm font-normal text-gray-400 ml-2">({uniqueParticipants.length})</span>
      </h2>
      <ul className="space-y-2 overflow-y-auto">
        {uniqueParticipants.sort().map((name) => (
          <li 
            key={name} 
            className="flex items-center space-x-3 p-2 rounded-md text-gray-300 transition-colors duration-200 hover:bg-gray-700"
            title={name}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="truncate">
              {name}
              {name === currentUser && <span className="text-xs text-cyan-400 ml-1">(You)</span>}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};