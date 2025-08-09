'use client';

import { useGetNotificationsQuery } from '@/state/api';
import { Bell } from 'lucide-react';

const CardNotifications = () => {
  const { data: notifications, isLoading } = useGetNotificationsQuery(undefined);

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h2 className="text-lg font-semibold px-7 pt-5 pb-2">Notifications</h2>
          <hr />
          <div className="overflow-auto h-full">
            {notifications?.map((notification) => (
              <div
                key={notification._id}
                className={`flex items-center gap-3 px-5 py-4 border-b ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
              >
                <Bell className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{notification.message}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardNotifications;