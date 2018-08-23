import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import '../App.css';

const styles = {
  NavButton: {
    margin: '0 0 0 10px',
    flex: '0 0 auto',
    width: '100px',
    backgroundColor: '#E49954',
  },
  NavigationOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '10px 0',
  },
  NavigationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 500,

  }
};

class NavButtons extends React.Component {
  render () {
    let {
      classes,
    } = this.props;

    return (
      <div className={classes.NavigationOuterContainer}>
        <div className={classes.NavigationContainer}>
          {this.renderPrevButton()}
          {this.renderNextButton()}
        </div>
      </div>
    );
  }

  renderPrevButton = () => {
    let {
      classes,
      finished,
      onFirstStep,
      onClickPrev,
    } = this.props;

    if (!onFirstStep && !finished) {
      return (
        <Button className={classes.NavButton} variant="contained" color="primary" onClick={onClickPrev}>Back</Button>
      );
    }
  }

  renderNextButton = () => {
    let {
      canMoveToNextStep,
      classes,
      finished,
      onClickNext,
      onClickReset,
      onLastStep,
    } = this.props;

    if (finished) {
      return (
        <Button className={classes.NavButton} variant="contained" color="primary" onClick={onClickReset}>
          Reset
        </Button>
      );
    } else {
      let buttonLabel = onLastStep ? 'Finish' : 'Next';
      let buttonDisabled = !canMoveToNextStep;
      return (
        <Button className={classes.NavButton} variant="contained" color="primary" onClick={onClickNext} disabled={buttonDisabled}>
          {buttonLabel}
        </Button>
      );
    }
  }
}

NavButtons.propTypes = {
  finished: PropTypes.bool.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
  onFirstStep: PropTypes.bool.isRequired,
  onLastStep: PropTypes.bool.isRequired,
  canMoveToNextStep: PropTypes.bool.isRequired,
};

export default withStyles(styles)(NavButtons);
