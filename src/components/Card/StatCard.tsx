import React from 'react';

interface StatCardProps {
  title: string;
  count: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p>{count}</p>
      <style jsx>{`
        .stat-card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin: 10px;
          text-align: center;
          flex: 1;
        }
        .stat-card h3 {
          margin: 0;
          font-size: 1.2em;
        }
        .stat-card p {
          margin: 10px 0 0;
          font-size: 2em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default StatCard;
