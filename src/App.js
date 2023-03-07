import "./App.css";
import Dice from "./components/Dice";
import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

export default function App() {
	const [diceArray, setDiceArray] = useState(allNewDice());

	const diceElements = diceArray.map((dice) => (
		<Dice
			id={dice.id}
			isHeld={dice.isHeld}
			value={dice.value}
			key={dice.id}
			holdDice={() => {
				holdDice(dice.id);
			}}
		/>
	));

	// returns 10 random [numbers]
	function allNewDice() {
		const rndDiceArray = [];
		for (let i = 0; i < 10; i++) {
			rndDiceArray.push({
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: uuid(),
			});
		}
		return rndDiceArray;
	}

	function rollDice() {
		setDiceArray(allNewDice());
	}

	function holdDice(id) {
		setDiceArray((oldArray) =>
			oldArray.map((dice) => {
				return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
			})
		);
	}

	return (
		<main className="game">
			<div className="dice--area">{diceElements} </div>
			<button className="button-reroll" onClick={rollDice}>
				Roll
			</button>
		</main>
	);
}
