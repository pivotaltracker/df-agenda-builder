import React, { Component } from 'react'
import Header from './components/Header'
import HorizontalStepper from './components/HorizontalStepper'
import ActivityScheduler from './components/ActivityScheduler';
import AgendaViewer from './components/AgendaViewer';
import TimeScheduler from './components/TimeScheduler';
import TypeSelector from './components/TypeSelector';
import NavButtons from './components/NavButtons';

const INITIAL_ACTIVITIES = [
  {id: 1, content: 'Create a Problem Statement'},
  {id: 2, content: 'Determine Business Goals & Anti-Goals'},
  {id: 3, content: 'Determine Product Goals & Anti-Goals'},
  {id: 4, content: 'Determine Technical Goals & Anti-Goals'},
  {id: 5, content: 'Determine Enablement Goals & Anti-Goals'},
  {id: 6, content: 'Create a Stakeholder Map'},
  {id: 7, content: 'Understand Integrations'},
  {id: 8, content: 'Understand Value Proposition'},
  {id: 9, content: 'List Assumptions and Experiments'},
  {id: 10, content: 'List Risks and Mitigations'},
  {id: 11, content: 'Create Proto-personas'},
  {id: 12, content: 'Determine Use Cases'},
  {id: 13, content: 'Create an Interview and Observations List'},
  {id: 14, content: 'Create D&F Calendar'},
];

class App extends Component {
  state = {
    activeStep: 0, /* TODO: Change me back to 0 after testing */
    activities: INITIAL_ACTIVITIES,
    activityType: null,
    duration: null,
    lunchDuration: null,
    lunchStartTime: '',
    startTime: '',
  }

  // state = {
  //   activeStep: 2, /* TODO: Change me back to 0 after testing */
  //   activities: INITIAL_ACTIVITIES,
  //   activityType: 'Greenfield',
  //   duration: 8,
  //   lunchDuration: 45,
  //   lunchStartTime: '12:00',
  //   startTime: '08:00',
  // }

  render() {
    let {
      activeStep,
    } = this.state;

    return (
      <div>
        <Header />
        <HorizontalStepper activeStep={activeStep} />
        <div className='contentOuterContainer'>
          {this.renderStep()}
          <NavButtons onClickNext={this.nextStep}
                      onClickPrev={this.prevStep}
                      onClickReset={this.resetSteps}
                      onFirstStep={activeStep === 0}
                      onLastStep={activeStep === 3}
                      finished={activeStep > 3}
                      canMoveToNextStep={this.canMoveToNextStep()}
                      />
        </div>
      </div>
    );
  }

  renderStep = () => {
    let {
      activeStep,
      activities,
      activityType,
      duration,
      lunchDuration,
      lunchStartTime,
      startTime,
    } = this.state;

    switch (activeStep) {
      case 0:
        return (
          <TypeSelector
            activityType={activityType}
            onSelectType={this.setActivityType}
          />
        );
      case 1:
        return (
          <TimeScheduler
            duration={duration}
            lunchDuration={lunchDuration}
            lunchStartTime={lunchStartTime}
            startTime={startTime}
            onDurationSelect={this.durationSet}
            onLunchDurationSelect={this.lunchDurationSet}
            onLunchStartTimeSelect={this.lunchStartTimeSet}
            onStartTimeSelect={this.startTimeSet}
          />
        );
      case 2:
        return <ActivityScheduler activities={activities} onActivityReorder={this.reorderActivities} />;
      case 3:
        return (
          <AgendaViewer
            activityType={activityType}
            duration={duration}
            lunchDuration={lunchDuration}
            lunchStartTime={lunchStartTime}
            startTime={startTime}
            activities={activities}
          />
        );
      case 4:
        return (
          <div>
            All steps completed - you are finished
          </div>
        );
      default:
        return (<div>What choo talkin bout Willis?</div>);
    }
  }

  canMoveToNextStep = () => {
    let {
      activityType,
      duration,
      lunchDuration,
      lunchStartTime,
      startTime,
    } = this.state;

    if (this.state.activeStep === 0 && activityType === null) {
      return false;
    } else if (this.state.activeStep === 1 && (
      duration === null ||
      lunchDuration === null ||
      startTime === '' ||
      (lunchDuration > 0 && lunchStartTime === '')
    )) {
      return false;
    }
    return true;
  }

  nextStep = () => {
    if (this.state.activeStep === 4) {
      return;
    }
    this.setState((prevState, props) => {
      return {activeStep: prevState.activeStep + 1};
    });
  }

  prevStep = () => {
    if (this.state.activeStep === 0) {
      return;
    }
    this.setState((prevState, props) => {
      return {activeStep: prevState.activeStep - 1};
    });
  }

  setActivityType = (activityType) => {
    this.setState((prevState, props) => {
      return {activityType: activityType};
    });
  }

  durationSet = (duration) => {
    this.setState((prevState, props) => {
      return {duration: duration};
    });
  }

  lunchDurationSet = (duration) => {
    this.setState((prevState, props) => {
      return {lunchDuration: duration};
    });
  }

  lunchStartTimeSet = (startTime) => {
    this.setState((prevState, props) => {
      return {lunchStartTime: startTime};
    });
  }

  startTimeSet = (startTime) => {
    this.setState((prevState, props) => {
      return {startTime: startTime};
    });
  }

  resetSteps = () => {
    this.setState((prevState, props) => {
      return {
        activeStep: 0, /* TODO: Change me back to 0 after testing */
        activities: INITIAL_ACTIVITIES,
        activityType: null,
        duration: null,
        lunchDuration: null,
        lunchStartTime: '',
        startTime: '',
      };
    });
  }

  reorderActivities = (activities) => {
    this.setState((prevState, props) => {
      return {activities: activities};
    });
  }

}

export default App
