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
import ButtonSelector from './ButtonSelector';
import DropdownSelector from './DropdownSelector';
import Activities from './Activities';


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

function getStepContent(stepIndex, classes, pickCard, activeCard) {
  switch (stepIndex) {
    case 0:
      let definedActive, greenFieldActive;
      if (activeCard === 'Greenfield') {
        greenFieldActive = true;
      }
      if (activeCard === 'Defined') {
        definedActive = true;
      }
      return (
        <div>
          <Typography className={classes.instructions}>Build a Kick-off Activities</Typography>
          <div className='contentContainer'>
            <Typography>Which statement best describes your problem space?</Typography>
            <div className='cards'>
              <DefinedProbCard onClick={pickCard} active={definedActive} />
              <GreenfieldIdeaCard onClick={pickCard} active={greenFieldActive} />
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div>
          <Typography className={classes.instructions}>{activeCard} Kickoff Activities</Typography>
          <br/>
          <div className='contentContainer'>
            <div className='timingCards'>
              <ButtonSelector
                title='How long will your Kick-off be?' 
                buttonOptions={[
                  '4 hours',
                  '6 hours',
                  '8 hours',
                ]}
              />
              <br/>
              <br/>
              <DropdownSelector
                title='What time will your Kick-off start?'
                defaultOption='8:00 am'
                dropdownOptions={[
                  '8:00 am',
                  '9:00 am',
                  '10:00 am',
                  '11:00 am',
                  '12:00 pm',
                  '1:00 pm',
                  '2:00 pm',
                  '3:00 pm',
                  '4:00 pm',
                  '5:00 pm',
                ]} 
              />
              <br/>
              <br/>
              <ButtonSelector 
                title='How long will the lunch break be?'
                buttonOptions={[
                  'No Lunch Break',
                  '30 minutes',
                  '45 minutes',
                  '60 minutes',
                  '75 minutes',
                  '90 minutes',
                ]}
              />
              <br/>
              <br/>
              <DropdownSelector 
                title='What time will the lunch break start?'
                defaultOption='Noon'
                dropdownOptions={[
                  'Noon',
                  '12:15 pm',
                  '12:30 pm',
                  '12:45 pm',
                  '1:00 pm',
                  '1:15 pm',
                  '1:30 pm',
                  '1:45 pm',
                  '2:00 pm',
                ]}
              />
              <br/>
              <br/>
              </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <Typography className={classes.instructions}>Which activities will help you achieve your Kick-off objectives?</Typography>
          <Activities/>
        </div>
      );
    //call method to bring up stuff for Activities
    case 3:
      return (
        <div>
          <Typography className={classes.instructions}>How does your Kick-off agenda look?</Typography>
        </div>
      );
    //call method to bring up stuff for Review
    default:
      return 'Unknown stepIndex';
  }
}

class HorizontalStepper extends React.Component {
  state = {
    activeStep: 1, /* TODO: Change me back to 0 after testing */
    activeCard: 'none',
    startTime: '',
    duration: null,

  };

  pickCard = (cardName) => {
    this.setState({activeCard: cardName})
  }

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
                {getStepContent(activeStep, classes, this.pickCard, this.state.activeCard)}

                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext} >
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
