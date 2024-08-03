import { useEffect, useState } from 'react';
import StatCard from '../components/Card/StatCard';
import { getNewUsersByDate } from '@/services/user.service';
import { getUserSubscriptionsByDate } from '@/services/userSubscription.service';
import { getUsedCouponsByDate } from '@/services/usedCoupon.service';

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [subscriptionCount, setSubscriptionCount] = useState<number | null>(null);
  const [usedCouponCount, setUsedCouponCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (date: string) => {
    setLoading(true);
    setError(null); // Clear previous error messages

    try {
      const userCount = await getNewUsersByDate(date).catch(() => 0);
      setUserCount(userCount);
    } catch (err) {
      console.error('Error fetching user count:', err);
      setUserCount(0);
    }

    try {
      const subscriptionCount = await getUserSubscriptionsByDate(date).catch(() => 0);
      setSubscriptionCount(subscriptionCount);
    } catch (err) {
      console.error('Error fetching subscription count:', err);
      setSubscriptionCount(0);
    }

    try {
      const usedCouponCount = await getUsedCouponsByDate(date).catch(() => 0);
      setUsedCouponCount(usedCouponCount);
    } catch (err) {
      console.error('Error fetching used coupon count:', err);
      setUsedCouponCount(0);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <label>
        Select Date:
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </label>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          <StatCard title="New Users" count={userCount !== null ? userCount : 0} />
          <StatCard title="New Subscriptions" count={subscriptionCount !== null ? subscriptionCount : 0} />
          <StatCard title="Used Coupons" count={usedCouponCount !== null ? usedCouponCount : 0} />
        </div>
      )}
      <style jsx>{`
        .card-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
