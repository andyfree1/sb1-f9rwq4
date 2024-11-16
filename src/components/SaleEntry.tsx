import React from 'react';
import { Trash2, AlertCircle, Gift } from 'lucide-react';
import type { Sale } from '../App';

type Props = {
  sale: Sale;
  onDelete: (id: string) => void;
};

function SaleEntry({ sale, onDelete }: Props) {
  const getStatusColor = (outcome: Sale['outcome']) => {
    switch (outcome) {
      case 'SOLD':
        return 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100';
      case 'NO SALE':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100';
      case 'COURTESY':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100';
      case 'RESALE':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(sale.date).toLocaleDateString()}
            </time>
            <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(sale.outcome)}`}>
              {sale.outcome}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Tour #{sale.tourNumber}
            </span>
          </div>
          
          <div className="mb-2">
            <h3 className="text-lg font-semibold dark:text-white">
              {sale.clientName}
            </h3>
            {sale.membershipId && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ID: {sale.membershipId}
              </p>
            )}
          </div>

          {sale.outcome === 'SOLD' && (
            <div className="flex items-center gap-4 mb-2">
              <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                ${sale.amount.toLocaleString()}
              </p>
              {sale.bonusPoints > 0 && (
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Gift className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {sale.bonusPoints.toLocaleString()} points
                  </span>
                </div>
              )}
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">
            {sale.notes}
          </p>

          {sale.followUp && (
            <div className="mt-2 flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{sale.followUp}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={() => onDelete(sale.id)}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default SaleEntry;