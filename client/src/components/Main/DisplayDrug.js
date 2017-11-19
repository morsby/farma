import React, { Component } from 'react';
import { connect } from 'react-redux';

import { scrollToWhen } from 'react-redux-scroll';

import marked from 'marked';

import { Card, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';

import * as actions from '../../actions';
import * as actionTypes from '../../actions/types';

// TODO: Valider Markdown for at sikre ensartet udseende

class DisplayDrug extends Component {
	constructor() {
		super();

		this.state = { expanded: true };
		this.renderChapters = this.renderChapters.bind(this);
		this.isDrugClicked = this.isDrugClicked.bind(this);
		this.onToggleClick = this.onToggleClick.bind(this);
		this.onCloseClick = this.onCloseClick.bind(this);

		this.ScrollableHeader = scrollToWhen(
			this.isDrugClicked,
			null,
			{ yMargin: 50 },
			['id']
		)('h4');
	}

	isDrugClicked = (action, props) => {
		const res =
			action.type === actionTypes.SCROLL_TO_DRUG &&
			props.id === action.drugId;

		return res;
	};

	createMarkup(md) {
		return { __html: marked(md) };
	}

	renderChapters() {
		let numberOfChaps = this.props.drug.chapters.length;
		return this.props.drug.chapters.map((chap, i) => {
			if (chap === null) {
				chap = 'Intet kapitel';
			}
			if (numberOfChaps === i + 1) {
				return `${chap}`;
			} else {
				return `${chap}, `;
			}
		});
	}

	onToggleClick() {
		this.setState({ expanded: !this.state.expanded });
	}

	onCloseClick() {
		this.props.toggleDrug(this.props.drug._id);
	}

	componentDidMount() {
		// Crude fix
		setTimeout(() => {
			if (this.props.nav.navLastOpenedDrug === this.props.drug._id)
				this.props.scrollToDrug(this.props.drug._id);
		}, 100);
	}

	render() {
		let drug = this.props.drug;

		const important = drug.important ? 'important' : '';
		const classes = `card-title ${important}`;

		let content = null;
		if (this.state.expanded) {
			content = (
				<CardText
					dangerouslySetInnerHTML={this.createMarkup(drug.content)}
					className="drug-content"
				/>
			);
		}

		return (
			<Card className="m-3">
				<CardBody>
					<this.ScrollableHeader
						ref={el => {
							this.el = el;
						}}
						id={drug._id}
						className={classes}
					>
						{drug.name}
					</this.ScrollableHeader>
					<CardSubtitle>
						Kapitel: {this.renderChapters()}
					</CardSubtitle>
					{content}
					<Button className="m-3" onClick={this.onCloseClick}>
						Luk
					</Button>
					<Button className="m-3" onClick={this.onToggleClick}>
						Skjul
					</Button>
				</CardBody>
			</Card>
		);
	}
}

function mapStateToProps({ nav }) {
	return { nav };
}

export default connect(mapStateToProps, actions)(DisplayDrug);
