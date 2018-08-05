import React, { Component } from 'react';
import Road from './Road';
import "../scss/root.css";
import "../scss/reset.css";
import Car from "./Car";

export default class Root extends Component {

	constructor() {
		super();
		this.setRef = this.setRef.bind(this);
		this.state = {
			viewport:{}
		}
	}

	componentDidMount() {
		this.setState({viewport:{
				height: this.rootDiv.clientHeight,
				width: this.rootDiv.clientWidth
			}
		});
	}

	setRef(root) {
		return this.rootDiv = root;
	}

	render() {
		return (
			<div className="Root" ref={this.setRef}>
				<Road
					viewport={this.state.viewport} />
				<Car />
			</div>
		);
	}
}
