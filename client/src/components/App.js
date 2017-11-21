import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';

import { Container, Row, Col } from 'reactstrap';
import Spinner from 'react-spinkit';

import 'bootstrap/dist/css/bootstrap.css';
import '../style.min.css';

import Sidebar from './Sidebar';
import Main from './Main';
import DisplayOpenDrugs from './Main/DisplayOpenDrugs';

class App extends Component {
	constructor(props) {
		super(props);

		this.updateDimensions = _.debounce(
			this.updateDimensions.bind(this),
			300
		);
		this.displayApp = this.displayApp.bind(this);
	}

	componentDidMount() {
		this.props.fetchDrugs();
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);
	}

	updateDimensions() {
		this.props.navResponsive(window.innerWidth);
	}

	displayApp() {
		if (Object.keys(this.props.drugs).length === 0) {
			return <Spinner name="ball-pulse-sync" fadeIn="none" />;
		} else {
			let hideSidebar = null;
			if (
				this.props.nav.responsive === 'mobile' &&
				this.props.nav.visible === false
			) {
				hideSidebar = 'd-none';
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
								overflow: 'auto',
								zIndex: '5'
							}}
							className={'sidebar ' + hideSidebar}
						>
							<Sidebar />
						</Col>
						<Col md={{ size: 8, offset: 2 }}>
							<Main />
						</Col>
						<Col
							md="2"
							className="display-open-drugs d-none d-sm-block"
						>
							<DisplayOpenDrugs />
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
