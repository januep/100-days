import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css"; // Make sure to define some basic styles

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
        <motion.span
          className="cross"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          X
        </motion.span>
      ) : (
        number
      )}
    </motion.div>
  );
};

const App: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

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
