import React from "react";
import { GiCrossedBones } from "react-icons/gi";

export const Notification = ({notifications, open, setOpen}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-[360px] bg-white shadow-xl z-50 border-l border-gray-100 transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Notifications
          </h2>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
          aria-label="Close notifications"
        >
          <GiCrossedBones fontSize={16} />
        </button>
      </div>

      {/* Notification List */}
      <div className="h-[calc(100vh-65px)] overflow-y-auto divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-gray-400 px-6 text-center">
            <p className="text-sm font-medium">No notifications yet</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`group relative p-4 transition-colors duration-150 hover:bg-gray-50/80 cursor-pointer ${
                !item.isRead ? "bg-blue-50/40" : "bg-white"
              }`}
            >
              {/* Subtle unread indicator bar on the left */}
              {!item.isRead && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
              )}

              <div className="flex items-start justify-between gap-2">
                <h3
                  className={`text-sm tracking-tight ${
                    !item.isRead
                      ? "font-semibold text-gray-900"
                      : "font-medium text-gray-700"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                {item.message}
              </p>

              <p className="text-[11px] font-medium text-gray-400 mt-2">
                {new Date(item.createdAt).toLocaleString(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
