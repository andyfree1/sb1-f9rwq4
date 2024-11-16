import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  selectedDate: string;
  onChange: (date: string) => void;
};

function MonthSelector({ selectedDate, onChange }: Props) {
  const [year, month] = selectedDate.split('-').map(Number);

  const handlePrevMonth = () => {
    const date = new Date(year, month - 2, 1);
    onChange(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  const handleNextMonth = () => {
    const date = new Date(year, month, 1);
    onChange(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      <button
        onClick={handlePrevMonth}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      </button>
      <button
        onClick={handleNextMonth}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  );
}

export default MonthSelector;