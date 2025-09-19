'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, Settings } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="text-white">
          <div className="text-sm font-medium">
            {session?.user?.name || session?.user?.email || 'User'}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          className="p-2 hover:bg-gray-800 hover:bg-opacity-50 rounded-lg text-white transition-colors duration-200"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        <button
          onClick={handleSignOut}
          className="p-2 hover:bg-gray-800 hover:bg-opacity-50 rounded-lg text-white transition-colors duration-200"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
