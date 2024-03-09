import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
  // Stan przechowujący przekreślone dni
  const [crossedOutDays, setCrossedOutDays] = useState(new Set());

  // Stan do włączania/wyłączania konfetti
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    // Przy załadowaniu komponentu, ładuj przekreślone dni z LocalStorage
    const crossedOutDays = JSON.parse(
      localStorage.getItem("crossedOutDays") || "[]"
    );

    setCrossedOutDays(new Set(crossedOutDays));
  }, []);

  useEffect(() => {
    // Zapisuj przekreślone dni do LocalStorage przy każdej aktualizacji stanu
    localStorage.setItem(
      "crossedOutDays",
      JSON.stringify(Array.from(crossedOutDays))
    );
  }, [crossedOutDays]);

  // Funkcja obsługująca kliknięcie dnia
  const handleDayClick = (day: any) => {
    setCrossedOutDays((prev) => {
      const newCrossedOutDays = new Set(prev);
      if (newCrossedOutDays.has(day)) {
        newCrossedOutDays.delete(day);
      } else {
        newCrossedOutDays.add(day);
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 10000); // Konfetti tylko przez 2 sekundy
      }
      return newCrossedOutDays;
    });
  };

  const days = Array.from({ length: 100 }, (_, index) => index + 1);

  return (
    <>
      {celebrate && <Confetti />}
      <div className="grid-container">
        {days.map((day) => (
          <motion.div
            key={day}
            className={`grid-item ${crossedOutDays.has(day) ? "crossed" : ""}`}
            onClick={() => handleDayClick(day)}
            whileTap={{ scale: 0.9 }}
          >
            {crossedOutDays.has(day) && (
              <motion.div
                className="cross"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                &#10005;
              </motion.div>
            )}
            <span className="day-number">{day}</span>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default App;
