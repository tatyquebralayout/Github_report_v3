import React from 'react';

interface ActivityChartProps {
  activity?: number[];
}

export function ActivityChart({ activity }: ActivityChartProps) {
  if (!activity) return null;
  
  const maxActivity = Math.max(...activity);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Activity (Last 12 Months)</h3>
      <div className="flex items-end h-32 space-x-1">
        {activity.map((value, index) => (
          <div 
            key={index} 
            className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm hover:from-blue-600 hover:to-blue-500 transition-all duration-200"
            style={{ height: `${(value / maxActivity) * 100}%` }}
            title={`${months[index]}: ${value} activities`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {months.map((month, index) => (
          <span key={index}>{month}</span>
        ))}
      </div>
    </div>
  );
}