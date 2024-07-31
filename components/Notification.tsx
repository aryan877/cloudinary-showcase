"use client";

import React, { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export default function Notification() {
  const { notifications, removeNotification } = useNotificationStore();

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        removeNotification(notifications[0].id);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="toast toast-top toast-end">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`alert alert-${notification.type}`}
        >
          <span>{notification.message}</span>
        </div>
      ))}
    </div>
  );
}
