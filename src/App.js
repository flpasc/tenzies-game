import "./App.css";
import Dice from "./components/Dice";

function allNewDice() {
	const diceArray = [];

	for (let i = 0; i < 10; i++) {
		const rndNum = Math.floor(Math.random() * 10);
	}
}

function App() {
	return (
		<main className="game">
			<div className="dice--area">
				<Dice value="1" />
				<Dice value="1" />
				<Dice value="1" />
				<Dice value="1" />
				<Dice value="1" />
				<Dice value="1" />
				<Dice value="1" />
				<Dice value="1" />
				<Dice value="1" />
				<Dice value="1" />
			</div>
		</main>
	);
}

export default App;
