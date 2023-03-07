import React from "react";

export default function Dice(props) {
	const styles = {
		backgroundColor: props.isHeld ? "#59e391" : "white",
	};

	return (
		<div onClick={props.holdDice} className="dice" style={styles}>
			<h2 className="dice--num">{props.value}</h2>
		</div>
	);
}
