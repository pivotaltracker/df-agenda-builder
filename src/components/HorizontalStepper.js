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
  stepperContainer: {
    backgroundColor: '#F3F5F7',
    filter: 'drop-shadow(0px 1px 3px #999999)',
    height: 108,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
  },
  Stepper: {
    backgroundColor: '#F3F5F7',
    width: 350,
  }
});

const STEPS = ['Type', 'Timing', 'Activities', 'Review'];

class HorizontalStepper extends React.Component {
  render() {
    let {
      activeStep,
      classes,
    } = this.props;

    return (
      <div className={classes.stepperContainer}>
        <Stepper activeStep={activeStep} className={classes.Stepper} alternativeLabel>
          {STEPS.map((label, i) => {
            return (
              <Step key={label}>
                <StepLabel className={`HorizontalStepperStepLabel${i <= activeStep ? ' HorizontalStepperStepLabel--active' : ''}`}>{label}</StepLabel>
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
