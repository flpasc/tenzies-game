import "./App.css";
import Dice from "./components/Dice";
import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

export default function App() {
	const [diceArray, setDiceArray] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		tenzies ? console.log("you won") : console.log("");
	}, [tenzies]);

	useEffect(() => {
		setTenzies(() => {
			return diceArray.every((dice) => {
				return dice.isHeld && dice.value === diceArray[0].value;
			});
		});
	}, [diceArray]);

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

	function generateNewDice() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: uuid(),
		};
	}

	// returns 10 random [numbers]
	function allNewDice() {
		const rndDiceArray = [];
		for (let i = 0; i < 10; i++) {
			rndDiceArray.push(generateNewDice());
		}
		return rndDiceArray;
	}

	function rollDice() {
		setDiceArray((prevArray) => {
			return prevArray.map((dice) => {
				return dice.isHeld ? dice : generateNewDice();
			});
		});
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
			<h1 className="header">Tenzies</h1>
			<p className="description">
				Roll until all dice are the same. Click each die to freeze it at its current calue between
				rolls.
			</p>
			<div className="dice--area">{diceElements} </div>
			<button className="button-reroll" onClick={rollDice}>
				Roll
			</button>
		</main>
	);
}
