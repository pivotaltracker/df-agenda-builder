import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import '../App.css';

const BREAK_TITLE = 'Revisit & Clean-up';
const TIME_FORMAT = 'h:mm';

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
        <div className='StepHeader'>Build a Kick-off Agenda</div>


        <div className='contentContainer'>
          <Card className={classes.card}>
            <CardContent>
              <div style={{border: '1px solid #000', padding: '8px'}}>
                <strong>Recap:</strong>
                <div>duration: {duration} hours</div>
                <div>startTime: {startTime}</div>
                <div>lunchStartTime: {lunchStartTime}</div>
                <div>lunchDuration: {lunchDuration} minutes</div>
              </div>

              <br />
              {this.scheduledActivities().map((activity, index) => {
                return(<div className={`AgendaItem AgendaItem--${activity.type}`} key={index}>{activity.content}, {activity.startTime} - {activity.endTime}</div>);
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

    let scheduledActivitiesList = [];

    let lunchScheduled = false;
    let lunchNeeded = lunchDuration > 0;

    let now = moment(); // grab now so that we are doing time math for today
    const start = moment(`${now.year()}-${now.month()+1}-${now.date()} ${startTime}`, 'YYYY-MM-DD HH:mm'); //2013-02-08 09:30
    const finish = moment(start).add(duration, 'hours');
    const lunchStart = moment(`${now.year()}-${now.month()+1}-${now.date()} ${lunchStartTime}`, 'YYYY-MM-DD HH:mm'); //2013-02-08 09:30
    let outOfTime = false;

    const activityDuration = 45;
    let segmentStartTime = moment(start); // initialize first segment to be at overall start time
    let segmentEndTime = moment(segmentStartTime);
    segmentEndTime.add(activityDuration, 'minutes');

    activities.forEach((activity, index) => {

      if (!outOfTime) {
        if (!lunchScheduled && lunchNeeded && (segmentEndTime.isAfter(lunchStart) || segmentStartTime.isSame(lunchStart))) {
          if (!segmentStartTime.isSame(lunchStart)) {
            scheduledActivitiesList.push({
              content: BREAK_TITLE,
              startTime: segmentStartTime.format(TIME_FORMAT),
              endTime: segmentEndTime.format(TIME_FORMAT),
              type: 'non-activity',
            });
          }

          segmentStartTime = moment(lunchStart);
          segmentStartTime.add(lunchDuration, 'minutes');
          segmentEndTime = moment(segmentStartTime);
          segmentEndTime.add(activityDuration, 'minutes');

          scheduledActivitiesList.push({
            content: 'Lunch',
            startTime: lunchStart.format(TIME_FORMAT),
            endTime: segmentStartTime.format(TIME_FORMAT),
            type: 'non-activity',
          });
          lunchScheduled = true;



          if (segmentEndTime.isBefore(finish)) {
            scheduledActivitiesList.push({
              content: activity.content,
              startTime: segmentStartTime.format(TIME_FORMAT),
              endTime: segmentEndTime.format(TIME_FORMAT),
              type: 'activity',
            });

            segmentStartTime = moment(segmentEndTime);
            segmentEndTime = moment(segmentStartTime);
            segmentEndTime.add(activityDuration, 'minutes');
          } else {
            scheduledActivitiesList.push({
              content: BREAK_TITLE,
              startTime: segmentStartTime.format(TIME_FORMAT),
              endTime: segmentEndTime.format(TIME_FORMAT),
              type: 'non-activity',
            });
          }
        } else if (segmentEndTime.isAfter(finish)) {
          outOfTime = true;
          if (segmentStartTime.isBefore(finish)) {
            scheduledActivitiesList.push({
              content: BREAK_TITLE,
              startTime: segmentStartTime.format(TIME_FORMAT),
              endTime: segmentEndTime.format(TIME_FORMAT),
              type: 'non-activity',
            });
          }
        } else {
          scheduledActivitiesList.push({
            content: activity.content,
            startTime: segmentStartTime.format(TIME_FORMAT),
            endTime: segmentEndTime.format(TIME_FORMAT),
            type: 'activity',
          });

          segmentStartTime = moment(segmentEndTime);
          segmentEndTime = moment(segmentStartTime);
          segmentEndTime.add(activityDuration, 'minutes');
        }
      }
    });

    return scheduledActivitiesList;
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
