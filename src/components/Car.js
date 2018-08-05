import React, { Component } from 'react';
import "../scss/car.css";

export default class Car extends Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div className="Car">
				<div className="carBody" />
				<div className="cab">
					<div className="glass" />
				</div>
				<div className="wheel">
					<div className="hub" />
				</div>
				<div className="wheel secondWheel">
					<div className="hub" />
				</div>
			</div>
		);
	}
}
