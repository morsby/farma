import React, { Component } from 'react';
import { connect } from 'react-redux';

import { scrollToWhen } from 'react-redux-scroll';

import marked from 'marked';

import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import DownIcon from 'grommet/components/icons/base/Down';
import UpIcon from 'grommet/components/icons/base/Up';
import CloseIcon from 'grommet/components/icons/base/Close';

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
			{ yMargin: 85 },
			['id']
		)('h1');
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

		let style = {};
		if (drug.important) {
			style.fontWeight = 'bold';
		}

		let content = null;
		if (this.state.expanded) {
			content = (
				<div
					dangerouslySetInnerHTML={this.createMarkup(drug.content)}
					className="drug-content"
				/>
			);
		}

		let icon = this.state.expanded ? (
			<UpIcon onClick={this.onToggleClick} />
		) : (
			<DownIcon onClick={this.onToggleClick} />
		);

		return (
			<Box
				pad="medium"
				margin="small"
				colorIndex="brand"
				style={{ display: 'block' }}
			>
				<this.ScrollableHeader
					style={style}
					ref={el => {
						this.el = el;
					}}
					id={drug._id}
				>
					{drug.name}
				</this.ScrollableHeader>
				<Paragraph size="small">
					Kapitel: {this.renderChapters()}
				</Paragraph>
				{content}
				<div>
					<span style={{ width: '25%', display: 'inline-block' }}>
						{icon}
					</span>
					<CloseIcon onClick={this.onCloseClick} />
				</div>
			</Box>
		);
	}
}

function mapStateToProps({ nav }) {
	return { nav };
}

export default connect(mapStateToProps, actions)(DisplayDrug);
