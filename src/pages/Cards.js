import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCards } from "../services/api";

export default function Cards({ userName }) {
  const [cards, setCards] = useState([]);
  const [qty, setQty] = useState(0);
  const [table, setTable] = useState([]);

  useEffect(() => {
    async function getAllCards() {
      const { data: allCards } = await getCards();
      allCards.sort(shuffle);
      const deck = [];
      for (let i = 0; i < 8; i++) {
      deck.push(allCards[i]);
      }

      for (let i = 0; i < deck.length; i++) {
       deck[i] = { ...deck[i], point: Math.floor(Math.random() * 11) };
      }
      const tableDeck = [];
      for (let i = 0; i < 5; i++) {
        tableDeck.push(deck[i]);
      }

      setTable(tableDeck);
      setCards(deck);
      setQty(5);
    }
    getAllCards();
  }, []);

  function shuffle() {
    return Math.random() - 0.5;
  }

  return (
    <>
    
      <Div>{userName}</Div>
      <Table>
        {table.map((card, i) => (
          <Card>
            <Name>{card.name}</Name>
            <Point>{card.point}</Point>
            <Image key={i} src={card.card_images[0].image_url}></Image>
            <Description>{card.desc}</Description>
          </Card>
        ))}
      </Table>
     <ButtonContainer>
      <Button
        onClick={() => {
          setTable([...table, cards[qty]]);
          setQty(qty + 1);
        }}
        disabled={qty === 8}
      >
        Puxar carta
      </Button>
      <Button onClick={() => setTable([...table.sort(shuffle)])}>
        Embaralhar carta{" "}
      </Button>
      </ButtonContainer>
      
    </>
  );
}




const Div = styled.div`
background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  width: 100%;
  height: 1.2rem;  
  color: white;
  margin-top: -9%;
  
`;

const Image = styled.img`
  height: 200px;
  width: 140px;
  justify-content: center;
`;

const Card = styled.div`
  height: 100px;
  width: 250px;
  
`;
const Table = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  height: 70vh;
  width: 100vw;
`;
const Point = styled.div`
color: #ffffff;

`;


const Description = styled.span`

font-size: 12px;
  display: flex;
  text-align: center; 
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-top: 10px;
  text-transform: capitalize;
  color: #ffffff;
  `;
  const Name = styled.h1`
  color: #ffffff;
  font-size: 17px;
  height: 2rem;
  `;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  
`;

const Button = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 20%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  margin: 0 15px;
`;
