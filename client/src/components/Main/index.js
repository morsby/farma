import React from 'react';
import { connect } from 'react-redux';

import DrugContainer from './DrugContainer';

import * as actions from '../../actions';

const Main = () => {
	return <DrugContainer />;
};

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav };
}

export default connect(mapStateToProps, actions)(Main);
