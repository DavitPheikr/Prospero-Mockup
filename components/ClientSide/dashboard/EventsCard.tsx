"use client";

import React from "react";
import styles from "./EventsCard.module.scss";
import { Calendar, ExternalLink } from "lucide-react";

interface EventsCardProps {
  className?: string;
}

export default function EventsCard({ className }: EventsCardProps) {
  const handleViewAllEvents = () => {
    // Open the Flutter meetings app in a new window
    window.open("http://localhost:9124", "_blank");
  };

  // Mock upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual General Meeting",
      date: "2024-08-15",
      time: "14:00",
      type: "Meeting",
    },
    {
      id: 2,
      title: "Financial Planning Workshop",
      date: "2024-08-20",
      time: "10:00",
      type: "Workshop",
    },
    {
      id: 3,
      title: "Member Orientation",
      date: "2024-08-25",
      time: "16:00",
      type: "Orientation",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className={`${styles.eventsCard} ${className || ""}`}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Calendar className={styles.icon} />
          <h3>Upcoming Events</h3>
        </div>
        <button 
          className={styles.viewAllButton}
          onClick={handleViewAllEvents}
        >
          <ExternalLink size={16} />
          View All
        </button>
      </div>

      <div className={styles.eventsList}>
        {upcomingEvents.map((event) => (
          <div key={event.id} className={styles.eventItem}>
            <div className={styles.eventDate}>
              <span className={styles.date}>{formatDate(event.date)}</span>
              <span className={styles.time}>{event.time}</span>
            </div>
            <div className={styles.eventDetails}>
              <h4 className={styles.eventTitle}>{event.title}</h4>
              <span className={styles.eventType}>{event.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 