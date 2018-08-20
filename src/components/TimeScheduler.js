import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonSelector from './ButtonSelector';
import DropdownSelector from './DropdownSelector';
import '../App.css';

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

class TimeScheduler extends React.Component {
  render () {
    let {
      activityType,
      duration,
      lunchDuration,
      lunchStartTime,
      onDurationSelect,
      onLunchDurationSelect,
      onLunchStartTimeSelect,
      onStartTimeSelect,
      startTime,
    } = this.props;

    return (
      <div>
        <div className='StepDefinition'>{activityType} Kickoff Activities</div>
        <br/>
        <div className='contentContainer'>
          <div className='timingCards'>
            <ButtonSelector
              title='How long will your Kick-off be?'
              onButtonPress={onDurationSelect}
              selectedButton={duration}
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
              onOptionSelect={onStartTimeSelect}
              selectedTime={startTime}
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
              onButtonPress={onLunchDurationSelect}
              selectedButton={lunchDuration}
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
              onOptionSelect={onLunchStartTimeSelect}
              selectedTime={lunchStartTime}
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
  }
}

TimeScheduler.propTypes = {
  activityType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  duration: PropTypes.string,
  lunchDuration: PropTypes.string,
  lunchStartTime: PropTypes.string,
  onDurationSelect: PropTypes.func.isRequired,
  onLunchDurationSelect: PropTypes.func.isRequired,
  onLunchStartTimeSelect: PropTypes.func.isRequired,
  onStartTimeSelect: PropTypes.func.isRequired,
  startTime: PropTypes.string,
};

export default withStyles(styles)(TimeScheduler);
