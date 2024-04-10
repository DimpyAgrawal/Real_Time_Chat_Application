import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import Card from './Card';

const Drag = () => {
  const userId = localStorage.getItem('id');
  const [cards, setCards] = useState([]);
  const fetchInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/alluser');
      setCards(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error in getting " + error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [activeCard, setActiveCard] = useState(0);

  const handleLeftSwipe = () => {
    console.log('left');
    setCards(prevCards => {
      const updatedCards = prevCards.filter((card, index) => index !== activeCard);
      setActiveCard(activeCard === 0 ? 0 : activeCard - 1); // Update active card index
      return updatedCards;
    });
  };
  
  const handleRightSwipe = async (id) => {
    console.log('right');
    try {
      const res2 = await axios.put(`http://localhost:8080/friend/${id}`, { id: userId });
      console.log(res2.data.msg);
      setCards(prevCards => {
        const updatedCards = prevCards.filter((card, index) => index !== activeCard);
        const nextActiveCardIndex = activeCard === 0 ? 0 : activeCard - 1; // Calculate the index of the previous card
        setActiveCard(nextActiveCardIndex); // Set the previous card as the active card
        
        // Reset position of the next card
        const nextCard = updatedCards[nextActiveCardIndex];
        const resetNextCard = { ...nextCard, position: { x: 0, y: 0 } };
        updatedCards[nextActiveCardIndex] = resetNextCard;
  
        return updatedCards;
      });
    } catch (err) {
      console.log('error in uploading', err);
    }
  };
  
  
  
  
  const handleUpSwipe = async () => {
    console.log('Up');
    const res = await axios.put(`http://localhost:8080/like/${cards[activeCard]._id}`, { id: userId });

    setCards(prevCards => {
      const updatedCards = prevCards.map((card, index) => {
        if (index === activeCard) {
          return { ...card, position: { x: 0, y: 0 } }; // Reset position
        }
        return card;
      });
      return updatedCards;
    });
  };
  
  const handleDownSwipe = () => {
    console.log('Down');
    setCards(prevCards => {
      const updatedCards = prevCards.map((card, index) => {
        if (index === activeCard) {
          return { ...card, position: { x: 0, y: 0 } }; // Reset position
        }
        return card;
      });
      return updatedCards;
    });
  };

  const handleStop = (event, data) => {
    if (Math.abs(data.lastX) > 100) {
      if (data.lastX < 0) {
        handleLeftSwipe();
      } else {
        const id = cards[activeCard]._id; // Assuming the ID field is named _id, adjust it if necessary
        handleRightSwipe(id); // Pass the card ID to the function
      }
    } else if (Math.abs(data.lastY) > 100) {
      if (data.lastY < 0) {
        
        handleUpSwipe();
      } else {
        handleDownSwipe();
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {cards.map((card, index) => (
        <Draggable
          key={index}
          axis="both"
          bounds={{ left: -200, right: 200, top: -200, bottom: 200 }}
          onStop={handleStop}
          position={card.position}
          disabled={index !== activeCard}
        >
          <div style={{ display: index === activeCard ? 'block' : 'none' }}>
            <Card card={card} />
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default Drag;
