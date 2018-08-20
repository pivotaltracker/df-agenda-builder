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
                {display: '4 hours', value: 4},
                {display: '6 hours', value: 6},
                {display: '8 hours', value: 8},
              ]}
            />
            <br/>
            <br/>
            <DropdownSelector
              title='What time will your Kick-off start?'
              onOptionSelect={onStartTimeSelect}
              selectedTime={startTime}
              dropdownOptions={[
                {display: '8:00 am',  value: '08:00'},
                {display: '9:00 am',  value: '09:00'},
                {display: '10:00 am', value: '10:00'},
                {display: '11:00 am', value: '11:00'},
                {display: '12:00 am', value: '12:00'},
                {display: '1:00 am',  value: '13:00'},
                {display: '2:00 am',  value: '14:00'},
                {display: '3:00 am',  value: '15:00'},
                {display: '4:00 am',  value: '16:00'},
                {display: '5:00 am',  value: '17:00'},
              ]}
            />
            <br/>
            <br/>
            <ButtonSelector
              title='How long will the lunch break be?'
              onButtonPress={onLunchDurationSelect}
              selectedButton={lunchDuration}
              buttonOptions={[
                {display: 'No Lunch Break', value: 0},
                {display: '30 minutes', value: 30},
                {display: '45 minutes', value: 45},
                {display: '60 minutes', value: 60},
                {display: '75 minutes', value: 75},
                {display: '90 minutes', value: 90},
              ]}
            />
            <br/>
            <br/>
            <DropdownSelector
              title='What time will the lunch break start?'
              onOptionSelect={onLunchStartTimeSelect}
              selectedTime={lunchStartTime}
              dropdownOptions={[
                {display: 'Noon', value: '12:00'},
                {display: '12:15 pm', value: '12:15'},
                {display: '12:30 pm', value: '12:30'},
                {display: '12:45 pm', value: '12:45'},
                {display: '1:00 pm', value: '13:00'},
                {display: '1:15 pm', value: '13:15'},
                {display: '1:30 pm', value: '13:30'},
                {display: '1:45 pm', value: '13:45'},
                {display: '2:00 pm', value: '14:00'},
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
  duration: PropTypes.number,
  lunchDuration: PropTypes.number,
  lunchStartTime: PropTypes.string,
  onDurationSelect: PropTypes.func.isRequired,
  onLunchDurationSelect: PropTypes.func.isRequired,
  onLunchStartTimeSelect: PropTypes.func.isRequired,
  onStartTimeSelect: PropTypes.func.isRequired,
  startTime: PropTypes.string,
};

export default withStyles(styles)(TimeScheduler);
