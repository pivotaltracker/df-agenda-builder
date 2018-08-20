import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import '../App.css';

const styles = {
  AgendaViewer: {

  },
  card: {
    width: 500,
    backgroundColor: '#F4F5F7',
  },
};

class AgendaViewer extends React.Component {


  render () {
    let {
      classes,
      duration,
      startTime,
      lunchStartTime,
      lunchDuration,
    } = this.props;

    return (
      <div className={classes.AgendaViewer}>
        <div className='StepDefinition'>How dis?</div>


        <div className='contentContainer'>
          <Card className={classes.card}>
            <CardContent>
              <div>Dis?</div>

              <div>
                <strong>Recap:</strong>
                <div>duration: {duration} hours</div>
                <div>startTime: {startTime}</div>
                <div>lunchStartTime: {lunchStartTime}</div>
                <div>lunchDuration: {lunchDuration} minutes</div>
              </div>

              <br />
              {this.scheduledActivities().map((activity, index) => {
                return(<div key={index}>{activity.time} • {activity.content}</div>);
              })}
            </CardContent>
          </Card>
        </div>

      </div>
    );
  }

  scheduledActivities = () => {
    let {
      activities,
      duration,
      startTime,
      lunchStartTime,
      lunchDuration,
    } = this.props;

    let timedActivities = activities.slice(); // clone activities so we can much with it
    let lunchScheduled = false;

    let now = moment(); // grab now so that we are doing time math for today
    let start = moment(`${now.year()}-${now.month()+1}-${now.date()} ${startTime}`, 'YYYY-MM-DD HH:mm'); //2013-02-08 09:30
    let lunchStart = moment(`${now.year()}-${now.month()+1}-${now.date()} ${lunchStartTime}`, 'YYYY-MM-DD HH:mm'); //2013-02-08 09:30

    const activityDuration = this.activityTimeInMinutes();
    let segmentStartTime = moment(start); // initialize first segment to be at overall start time
    let segmentEndTime;

    timedActivities.forEach((activity, index) => {
      // if next segment will overlap lunch time
      if (!lunchScheduled && (segmentStartTime.isAfter(lunchStart) || segmentStartTime.isSame(lunchStart))) {
        // change the end time to account for the duration of lunch
        segmentEndTime = moment(segmentStartTime);
        segmentEndTime.add(lunchDuration, 'minutes');

        // insert lunch into the list of activities
        timedActivities.splice(index, 0, {
          content: 'LUNCH',
          time: segmentStartTime.format('h:mm a'),
        });

        // reset segment start and end times to continue from the end of lunch
        segmentStartTime = moment(segmentEndTime);
        segmentEndTime = moment(segmentStartTime);
        segmentEndTime.add(activityDuration, 'minutes');

        // mark lunch as scheduled so we don't do this again
        lunchScheduled = true;
      } else {
        // figure out when this segment is going to end
        segmentEndTime = moment(segmentStartTime);
        segmentEndTime.add(activityDuration, 'minutes');

        console.log('scheduling', activity.content, 'to start at', segmentStartTime.format('h:mm a'))
        console.log('scheduling', activity.content, 'to end at', segmentEndTime.format('h:mm a'))

        activity.time = segmentStartTime.format('h:mm a');
        segmentStartTime = moment(segmentEndTime);
      }
    });

    // last activity gets skipped because of the lunch insertion, but we know the start time so set it
    timedActivities[timedActivities.length - 1].time = segmentEndTime.format('h:mm a');

    // add in a fake activity so we can see when our day ends
    let finishTime = moment(start).add(duration, 'hours');
    timedActivities.push({
      content: 'Done!',
      time: finishTime.format('h:mm a'),
    });

    return timedActivities;
  }

  activityTimeInMinutes = () => {
    let {
      activities,
      duration,
      lunchDuration,
    } = this.props;

    let totalMinutes = duration * 60;
    let workMinutes = totalMinutes - lunchDuration;
    return Math.floor(workMinutes/activities.length);
  }
}

AgendaViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  activityType: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  lunchDuration: PropTypes.number.isRequired,
  lunchStartTime: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
};

export default withStyles(styles)(AgendaViewer);
