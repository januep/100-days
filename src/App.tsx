import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

interface CardProps {
  number: number;
  flipCard: () => void;
  isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({ number, flipCard, isFlipped }) => {
  return (
    <motion.div
      className="card"
      onClick={flipCard}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {isFlipped ? (
        <motion.img
          src={`${process.env.PUBLIC_URL}/x.png`}
          alt="Cross"
          className="cross"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        />
      ) : (
        number
      )}
    </motion.div>
  );
};

const App: React.FC = () => {
  // Initialize flippedCards from local storage or as an empty object
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>(
    () => {
      const saved = localStorage.getItem("flippedCards");
      return saved ? JSON.parse(saved) : {};
    }
  );

  // Effect to save flippedCards to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("flippedCards", JSON.stringify(flippedCards));
  }, [flippedCards]);

  const flipCard = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="grid">
      {Array.from({ length: 100 }).map((_, index) => (
        <Card
          key={index}
          number={index + 1}
          flipCard={() => flipCard(index)}
          isFlipped={!!flippedCards[index]}
        />
      ))}
    </div>
  );
};

export default App;
