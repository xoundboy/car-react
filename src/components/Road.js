import React, { Component } from 'react';
import "../scss/road.css";

const BAR_WIDTH = 10;
const INITIAL_BAR_OFFSET = 0;
const INITIAL_BAR_HEIGHT = 250;

export default class Road extends Component {

	constructor(props) {
		super(props);
		this.state = {
			bars: [],
			barHeight: INITIAL_BAR_HEIGHT
		};
	}

	componentWillReceiveProps(nextProps){
		if (this.state.bars.length === 0)
			this.setInitialBars(nextProps);
	}

	getBarsInViewport(width) {
		return Math.ceil(width / BAR_WIDTH);
	}

	setInitialBars(nextProps) {
		console.log();
		let bars = [];
		for (let i = 0; i < this.getBarsInViewport(nextProps.viewport.width); i++)
			bars.push(new RoadBar(INITIAL_BAR_OFFSET, INITIAL_BAR_HEIGHT, BAR_WIDTH));
		this.setState({bars:bars});
		console.log(bars);
	}

	render() {
		return (
			<div className="Road" ref={this.setRef}>
				{this.state.bars.map((bar, index) => {
					console.log(bar);
					const style = {
						width: bar.width,
						height: bar.height,
						top: (this.props.viewport.height / 2) - (bar.height / 2) + "px"
					};
					return (
						<div className={"bar"} key={index} style={style}/>
					)
				})}
			</div>
		);
	}
}

class RoadBar {
	constructor(offset, height, width) {
		this.offset = offset;
		this.height = height;
		this.width = width;
	}
}
