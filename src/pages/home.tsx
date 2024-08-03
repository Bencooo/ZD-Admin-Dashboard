import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getNewUsersByDate } from '../services/auth.service';
Chart.register(...registerables);

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserCount = async (date: string) => {
    setLoading(true);
    setError(null); // Clear previous error messages
    try {
      const count = await getNewUsersByDate(date);
      console.log('Fetched user count:', count);
      setUserCount(count);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching user count:', err);
        setError(err.message || 'Failed to fetch user count');
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCount(selectedDate);
  }, [selectedDate]);

  const data = {
    labels: [selectedDate],
    datasets: [
      {
        label: 'New Users',
        data: userCount !== null ? [userCount] : [], // Ensure data is not null
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <label>
        Select Date:
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </label>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <p>Total New Users: {userCount !== null ? userCount : 'No data available'}</p>
          <div style={{ width: '600px', height: '400px' }}>
            <Line data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
