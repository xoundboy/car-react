import Car from "./Car";
import React, { Component } from 'react';
import Road from './Road';
import "../scss/root.css";
import "../scss/reset.css";

export default class Root extends Component {

	constructor() {
		super();
		this.setRef = this.setRef.bind(this);
		this.state = {viewport:{}};
	}

	componentDidMount() {
		this.setState({viewport:{
				height: this.rootDiv.clientHeight,
				width: this.rootDiv.clientWidth
			}
		});
		window.addEventListener("resize", this.onWindowResize, true);
		window.addEventListener("keydown", this.onKeyDown, true);
	}

	setRef(root) {
		return this.rootDiv = root;
	}

	render() {
		return (
			<div className="Root" ref={this.setRef}>
				<Road viewport={this.state.viewport} />
				<Car viewport={this.state.viewport} />
			</div>
		);
	}

	onKeyDown(event){
		switch(event.key) {
			case " ":
				// if (started)
				// 	pauseGame();
				// else
				// 	startGame();
				break;
			default:
		}
	}

	onWindowResize(){
		// todo
	}
}
