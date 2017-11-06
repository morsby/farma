import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import marked from 'marked';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';

import * as actions from '../../actions';

class Main extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
		this.renderDrug = this.renderDrug.bind(this);
	}

	onClick() {
		this.props.navVisible(this.props.nav.visible);
	}

	renderDrug(drug) {
		let createMarkup = md => {
			return { __html: marked(md) };
		};

		if (drug.visible) {
			return (
				<Box pad="medium" margin="small" key={drug._id}>
					<h2>{drug.name}</h2>
					<div
						dangerouslySetInnerHTML={createMarkup(drug.content)}
						className="drug-content"
					/>
				</Box>
			);
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				<Header onClick={this.onClick}>
					<Title responsive={false}>Farma.morsby.dk</Title>
				</Header>
				<Box pad="medium">
					{_.map(this.props.drugs, drug => this.renderDrug(drug))}
				</Box>
			</div>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(Main);
