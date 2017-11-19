import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Container, Row, Col } from 'reactstrap';
import Spinner from 'react-spinkit';

import 'bootstrap/dist/css/bootstrap.css';
//import '../style.css';

import Sidebar from './Sidebar';
import Main from './Main';

class App extends Component {
	constructor(props) {
		super(props);

		this.onResponsive = this.onResponsive.bind(this);
		this.displayApp = this.displayApp.bind(this);
	}

	componentDidMount() {
		this.props.fetchDrugs();
	}

	onResponsive(responsive) {
		this.props.navResponsive(responsive);
	}

	displayApp() {
		if (Object.keys(this.props.drugs).length === 0) {
			return <Spinner name="ball-pulse-sync" fadeIn="none" />;
		} else {
			let priority = 'right';
			if (
				this.props.nav.visible &&
				this.props.nav.responsive === 'single'
			) {
				priority = 'left';
			}

			return (
				<Container fluid={true}>
					<Row>
						<Col
							md={2}
							style={{
								position: 'fixed',
								top: '0',
								bottom: '0',
								overflow: 'auto'
							}}
						>
							<Sidebar />
						</Col>
						<Col md={{ size: 8, offset: 2 }}>
							<Main />
						</Col>
						<Col
							md="2"
							style={{
								position: 'fixed',
								top: '0',
								bottom: '0',
								right: '0',
								overflow: 'auto'
							}}
						>
							Åbne stoffer
						</Col>
					</Row>
				</Container>
			);
		}
	}

	render() {
		return this.displayApp();
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav };
}

export default connect(mapStateToProps, actions)(App);
