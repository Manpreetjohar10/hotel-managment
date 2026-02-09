import React, { useState, useEffect } from "react";
import decodeJwt from "../utils/decodeJwt";

export default function DashboardEmployee() {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = decodeJwt(token);
        setUser(decoded);
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const getRoleLabel = (role) => {
    const labels = {
      manager: "Manager",
      receptionist: "Receptionist",
      waiter: "Waiter",
      cook: "Cook",
    };
    return labels[role] || role;
  };

  const updateGreeting = () => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();

    let greetingText = "Good Night";
    if (minutes >= 180 && minutes <= 710) {
      greetingText = "Good Morning";
    } else if (minutes >= 711 && minutes <= 960) {
      greetingText = "Good Afternoon";
    } else if (minutes >= 961 && minutes <= 1140) {
      greetingText = "Good Evening";
    } else {
      greetingText = "Good Night";
    }

    setGreeting(greetingText);
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-employee">
      <div className="greeting-card">
        <h1 className="greeting-text">
          {greeting}, <span className="user-name">{user.name}</span>
        </h1>
        <p className="role-badge">{getRoleLabel(user.role)}</p>
      </div>
    </div>
  );
}
