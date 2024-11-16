import React, { useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  onSubmit: (sale: {
    date: string;
    amount: number;
    bonusPoints: number;
    notes: string;
    clientName: string;
    tourNumber: number;
    outcome: 'SOLD' | 'NO SALE' | 'COURTESY' | 'RESALE';
    membershipId?: string;
    ownershipType: 'DEED' | 'TRUST' | 'BOTH';
    existingOwnership?: string;
    followUp?: string;
  }) => void;
  onClose: () => void;
};

const outcomes = ['SOLD', 'NO SALE', 'COURTESY', 'RESALE'] as const;
const ownershipTypes = ['DEED', 'TRUST', 'BOTH'] as const;

function SaleForm({ onSubmit, onClose }: Props) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    bonusPoints: '',
    tourNumber: 1,
    clientName: '',
    outcome: 'SOLD' as const,
    membershipId: '',
    ownershipType: 'DEED' as const,
    existingOwnership: '',
    notes: '',
    followUp: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: Number(formData.amount) || 0,
      bonusPoints: Number(formData.bonusPoints) || 0,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">New Sale Entry</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tour Number
            </label>
            <input
              type="number"
              value={formData.tourNumber}
              onChange={(e) => setFormData({ ...formData, tourNumber: Number(e.target.value) })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Client Name
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
              required
              placeholder="e.g., John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Outcome
            </label>
            <select
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value as typeof outcomes[number] })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
              required
            >
              {outcomes.map((outcome) => (
                <option key={outcome} value={outcome}>
                  {outcome}
                </option>
              ))}
            </select>
          </div>

          {formData.outcome === 'SOLD' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sale Amount ($)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
                  placeholder="e.g., 25000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bonus Points
                </label>
                <input
                  type="number"
                  value={formData.bonusPoints}
                  onChange={(e) => setFormData({ ...formData, bonusPoints: e.target.value })}
                  className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
                  placeholder="e.g., 15000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Membership ID
                </label>
                <input
                  type="text"
                  value={formData.membershipId}
                  onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
                  className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
                  placeholder="e.g., #1-697522610"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ownership Type
                </label>
                <select
                  value={formData.ownershipType}
                  onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value as typeof ownershipTypes[number] })}
                  className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
                  required
                >
                  {ownershipTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Existing Ownership
            </label>
            <input
              type="text"
              value={formData.existingOwnership}
              onChange={(e) => setFormData({ ...formData, existingOwnership: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
              placeholder="e.g., GRAND WAIKKIIAN/ELARA 8800"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
              rows={4}
              placeholder="Enter any additional notes or details about the sale..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Follow Up
            </label>
            <input
              type="text"
              value={formData.followUp}
              onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2"
              placeholder="Any follow-up actions needed?"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}

export default SaleForm;