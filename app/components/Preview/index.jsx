import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactF1Preview from '../ReactF1Preview/index.jsx';

import * as SelectStateActions from '../../actions/selectState';
import * as ErrorsAction from '../../actions/errors';
import styles from './style.css';
import noPreviewSvg from './no-preview.svg';
import classnames from 'classnames';

class Preview extends Component {
  static propType = {
    previewState: React.PropTypes.string,
    download: React.PropTypes.bool,
    displayError: React.PropTypes.func,
    filter: React.PropTypes.array,
    compState: React.PropTypes.bool,
    compName: React.PropTypes.string
  };

  render() {
    const { previewState, download, displayError, filter, compState, compName } = this.props;
    const className = classnames(styles.container, this.props.className);
    try {
      return (
        <div className={className}>
          {
            !download || filter.indexOf(previewState) === -1 
            ? <NoPreview />
            : <div className={styles.previewContainer} >
                <ReactF1Preview 
                  previewState={previewState} 
                  compState={compState} 
                  compName={compName}
                />
              </div>
          }
        </div>
      );  
    }
    catch (e) {
      displayError({
        description: 'Preview rendering error',
        suggestion: 'Make sure your project\'s composition is compatible with F1.',
        error: e.message
      });
    }
    
  }
}

function NoPreview() {
  return (
    <div className={styles.noPreview}>
      <div dangerouslySetInnerHTML={{ __html: noPreviewSvg }}></div>
      <label>No<br />Preview</label>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    previewState: state.previewState,
    download: state.download,
    filter: state.filter,
    compState: state.compState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, SelectStateActions, ErrorsAction), dispatch);
}

const PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(Preview);

export default PreviewContainer;
