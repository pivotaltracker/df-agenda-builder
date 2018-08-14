import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DefinedProbCard from './DefinedProbCard';
import GreenfieldIdeaCard from './GreenfieldIdeaCard';


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

function getSteps() {
  return ['Type', 'Timing', 'Activities', 'Review'];
}

function getStepContent(stepIndex, classes) {
  switch (stepIndex) {
    case 0:
    return (
    <div>
      <Typography className={classes.instructions}>{'Which statement best describes your problem space?'}</Typography>

      <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <DefinedProbCard/>
        <GreenfieldIdeaCard/>
      </div>
    </div>
    );
    case 1:
    return (
      <div>
        <Typography className={classes.instructions}>{'How long will your kickoff be?'}</Typography>
  
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          <DefinedProbCard/>
        </div>
      </div>
      );
    case 2:
      return 'Which activities will help you achieve your Kick-off objectives?';
      //call method to bring up stuff for Activities
    case 3:
      return 'How does your Kick-off agenda look?';
      //call method to bring up stuff for Review
    default:
      return 'Unknown stepIndex';
  }
}

class HorizontalStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you're finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {/* this needs to keep track of which card is raised */}
              {getStepContent(activeStep, classes)}

              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalStepper);
