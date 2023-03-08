import "./App.css";
import Dice from "./components/Dice";
import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import ReactConfetti from "react-confetti";

export default function App() {
	const [diceArray, setDiceArray] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [rolls, setRolls] = useState(0);
	const [best, setBest] = useState(() => JSON.parse(localStorage.getItem("best")) || 100);

	useEffect(() => {
		if (tenzies && rolls < best) {
			localStorage.setItem("best", JSON.stringify(rolls));
			setBest(rolls);
		}
	}, [tenzies, rolls, best]);

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
		if (tenzies) {
			setTenzies(false);
			setRolls(0);
			setDiceArray(allNewDice());
		} else {
			setRolls((prevRoll) => prevRoll + 1);
			setDiceArray((prevArray) => {
				return prevArray.map((dice) => {
					return dice.isHeld ? dice : generateNewDice();
				});
			});
		}
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
			{tenzies && <ReactConfetti />}
			<button className="button-reroll" onClick={rollDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
			<div className="dice-rolls">Rolls: {rolls}</div>
			<div className="dice-best">Personal Best: {best}</div>
		</main>
	);
}
