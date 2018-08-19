import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const styles = theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const STEPS = ['Type', 'Timing', 'Activities', 'Review'];

class HorizontalStepper extends React.Component {
  render() {
    let {
      activeStep,
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

HorizontalStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalStepper);
