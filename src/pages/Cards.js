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
      <div>{userName}</div>
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

      <button
        onClick={() => {
          setTable([...table, cards[qty]]);
          setQty(qty + 1);
        }}
        disabled={qty === 8}
      >
        Puxar carta
      </button>
      <button onClick={() => setTable([...table.sort(shuffle)])}>
        Embaralhar carta{" "}
      </button>
    </>
  );
}

const Image = styled.img`
  height: 200px;
  width: 140px;
`;

const Card = styled.div`
  height: 100px;
  width: 500px;
`;
const Table = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  height: 50vh;
  width: 100vw;
`;
const Point = styled.div``;
const Description = styled.span``;
const Name = styled.h1``;
