import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

type Props = {
  selectedDate: string;
  asp: number;
  goal: number;
  totalSales: number;
  totalBonusPoints: number;
  onUpdateTargets: (asp: number, goal: number) => void;
};

function MonthHeader({ selectedDate, asp, goal, totalSales, totalBonusPoints, onUpdateTargets }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAsp, setEditedAsp] = useState(asp);
  const [editedGoal, setEditedGoal] = useState(goal);
  const [year, month] = selectedDate.split('-');
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const handleSave = () => {
    onUpdateTargets(editedAsp, editedGoal);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {months[parseInt(month) - 1]} ({year})
        </h2>
        
        {isEditing ? (
          <div className="space-y-4 w-full max-w-xs">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">ASP Target ($)</label>
              <input
                type="number"
                value={editedAsp}
                onChange={(e) => setEditedAsp(Number(e.target.value))}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2 text-center"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Monthly Goal ($)</label>
              <input
                type="number"
                value={editedGoal}
                onChange={(e) => setEditedGoal(Number(e.target.value))}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2 text-center"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors w-full"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsEditing(true)}
              className="absolute -right-8 top-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <div className="text-xl text-gray-600 dark:text-gray-400 font-medium">
              ${asp.toLocaleString()} ASP
            </div>
            <div className="text-lg text-gray-500 dark:text-gray-400 mt-1">
              ${goal.toLocaleString()} Goal
            </div>
          </div>
        )}
        
        {totalSales > 0 && (
          <div className="space-y-2 mt-4">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ${totalSales.toLocaleString()}
            </div>
            <div className="text-lg text-gray-500 dark:text-gray-400">
              {totalBonusPoints.toLocaleString()} Bonus Points
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthHeader;