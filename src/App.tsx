import React, { useState, useEffect } from 'react';
import { PlusCircle, Moon, Sun, Search, DollarSign, TrendingUp, Calendar, Target, Gift } from 'lucide-react';
import SaleEntry from './components/SaleEntry';
import SaleForm from './components/SaleForm';
import Stats from './components/Stats';
import MonthHeader from './components/MonthHeader';
import MonthSelector from './components/MonthSelector';

export type Sale = {
  id: string;
  date: string;
  amount: number;
  bonusPoints: number;
  clientName: string;
  tourNumber: number;
  outcome: 'SOLD' | 'NO SALE' | 'COURTESY' | 'RESALE';
  membershipId?: string;
  ownershipType: 'DEED' | 'TRUST' | 'BOTH';
  existingOwnership?: string;
  notes: string;
  followUp?: string;
};

type MonthlyTarget = {
  asp: number;
  goal: number;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [monthlyTargets, setMonthlyTargets] = useState<Record<string, MonthlyTarget>>({});

  useEffect(() => {
    const savedSales = localStorage.getItem('sales');
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    }

    const savedTargets = localStorage.getItem('monthlyTargets');
    if (savedTargets) {
      setMonthlyTargets(JSON.parse(savedTargets));
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('monthlyTargets', JSON.stringify(monthlyTargets));
  }, [monthlyTargets]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const currentTargets = monthlyTargets[selectedDate] || { asp: 25000, goal: 400000 };

  const updateMonthlyTargets = (asp: number, goal: number) => {
    setMonthlyTargets(prev => ({
      ...prev,
      [selectedDate]: { asp, goal }
    }));
  };

  const handleAddSale = (saleData: Omit<Sale, 'id'>) => {
    const newSale = {
      ...saleData,
      id: crypto.randomUUID()
    };
    setSales(prev => [...prev, newSale]);
    setShowForm(false);
  };

  const handleDeleteSale = (id: string) => {
    setSales(prev => prev.filter(sale => sale.id !== id));
  };

  const filteredSales = sales.filter(sale => {
    const isCurrentMonth = sale.date.startsWith(selectedDate);
    if (!searchQuery) return isCurrentMonth;

    const query = searchQuery.toLowerCase();
    return (
      isCurrentMonth &&
      (sale.clientName.toLowerCase().includes(query) ||
        sale.notes.toLowerCase().includes(query) ||
        sale.membershipId?.toLowerCase().includes(query) ||
        sale.existingOwnership?.toLowerCase().includes(query))
    );
  });

  const monthSales = filteredSales.filter(sale => sale.outcome === 'SOLD');
  const totalSales = monthSales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalBonusPoints = monthSales.reduce((sum, sale) => sum + (sale.bonusPoints || 0), 0);
  const averageSale = monthSales.length > 0 ? totalSales / monthSales.length : 0;
  const totalTours = filteredSales.length;
  const conversionRate = totalTours > 0 ? (monthSales.length / totalTours) * 100 : 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Tracker</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              Add Sale
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search sales..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <MonthSelector
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />

        <MonthHeader 
          selectedDate={selectedDate}
          asp={currentTargets.asp}
          goal={currentTargets.goal}
          totalSales={totalSales}
          totalBonusPoints={totalBonusPoints}
          onUpdateTargets={updateMonthlyTargets}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Stats
            icon={<DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
            title="Total Sales"
            value={`$${totalSales.toLocaleString()}`}
          />
          <Stats
            icon={<TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
            title="Average Sale"
            value={`$${averageSale.toLocaleString()}`}
          />
          <Stats
            icon={<Calendar className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
            title="Total Tours"
            value={totalTours}
          />
          <Stats
            icon={<Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
            title="Conversion Rate"
            value={`${conversionRate.toFixed(1)}%`}
          />
          <Stats
            icon={<Gift className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
            title="Bonus Points"
            value={totalBonusPoints.toLocaleString()}
          />
        </div>

        <div className="space-y-4">
          {filteredSales.map(sale => (
            <SaleEntry
              key={sale.id}
              sale={sale}
              onDelete={handleDeleteSale}
            />
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <SaleForm
              onSubmit={handleAddSale}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;