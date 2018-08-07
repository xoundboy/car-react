import React, { Component } from 'react';
import "../scss/car.css";

const SPEED_INCREMENT = 5;
const MOTION_FRAME_PADDING = 10;

export default class Car extends Component {

	constructor(props){
		super(props);
		this.setRef = this.setRef.bind(this);
		this.state = {positionX:null,positionY:null};
		this.ticksTravelled = 0;

		this.onKeyTrackingIntervalTick = this.onKeyTrackingIntervalTick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onKeyDown, true);
		window.addEventListener("keyup", this.onKeyUp, true);
		this.keyTrackingInterval = setInterval(this.onKeyTrackingIntervalTick, 10);
		this.setMaxOffsets();
	}

	componentDidUpdate(){
		// todo - add check - only when viewport changed
		this.setMaxOffsets();
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			positionX: 50, // todo, this needs to be dynamic and respond to viewport size changes
			positionY: (nextProps.viewport.height / 2) - this.carDiv.clientHeight
		});
	}

	setMaxOffsets(){
		this.maximumXoffset = (this.props.viewport.width - (this.carDiv.clientWidth + MOTION_FRAME_PADDING));
		this.maximumYoffset = (this.props.viewport.height - (this.carDiv.clientHeight + MOTION_FRAME_PADDING));
	}

	setRef(car) {
		return this.carDiv = car;
	}

	render() {
		const style = {
			top: this.state.positionY + "px",
			left: this.state.positionX + "px"
		};
		return (
			<div className="Car" style={style} ref={this.setRef}>
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

	onKeyTrackingIntervalTick(){
		if (this.arrowRightPressed && this.state.positionX < this.maximumXoffset)
			this.setState({positionX: this.state.positionX + SPEED_INCREMENT});
		if (this.arrowLeftPressed && this.state.positionX > MOTION_FRAME_PADDING)
			this.setState({positionX: this.state.positionX - SPEED_INCREMENT});
		if (this.arrowUpPressed && this.state.positionY > MOTION_FRAME_PADDING)
			this.setState({positionY: this.state.positionY - SPEED_INCREMENT});
		if (this.arrowDownPressed && this.state.positionY < this.maximumYoffset)
			this.setState({positionY: this.state.positionY + SPEED_INCREMENT});
		this.ticksTravelled++;
	}

	onKeyDown(event){
		switch(event.key) {
			case "ArrowRight": this.arrowRightPressed = true; break;
			case "ArrowLeft": this.arrowLeftPressed = true; break;
			case "ArrowUp": this.arrowUpPressed = true; break;
			case "ArrowDown": this.arrowDownPressed = true; break;
			default: break;
		}
	}

	onKeyUp(event){
		switch(event.key) {
			case "ArrowRight": this.arrowRightPressed = false; break;
			case "ArrowLeft": this.arrowLeftPressed = false; break;
			case "ArrowUp": this.arrowUpPressed = false; break;
			case "ArrowDown": this.arrowDownPressed = false; break;
			default: break;
		}
	}
}
