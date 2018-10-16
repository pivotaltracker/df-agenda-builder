import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import '../App.css';

const BREAK_TITLE = 'Revisit & Clean-up';
const TIME_FORMAT = 'h:mm';

const styles = {
  AgendaViewer: {

  },
  card: {
    width: 575,
    backgroundColor: '#F4F5F7',
  },
  kickOffName: {
    backgroundColor: '#FFF',
    textAlign: 'center',
    border: 'none',
    marginBottom: 35,
  }
};

class AgendaViewer extends React.Component {
  render () {
    let {
      classes,
      duration,
      startTime,
      lunchStartTime,
      lunchDuration,
      kickOffName,
    } = this.props;

    return (
      <div className={classes.AgendaViewer}>
        <div className='StepHeader'>Build a Kick-off Agenda</div>


        <div className='contentContainer'>
          <div className='StepSubheader' style={{marginRight: '316px'}}>How does your Kick-off agenda look?<br />Name your Kick-off and click the pencil icon to swap activities.</div>

          <Card className={classes.card}>
            <CardContent>
              <div className='AgendaContainer'>
                <div className='AgendaContainer__grid'>
                  {[8,9,10,11,12,1,2,3,4].map((hour) => {
                    return (
                      <div className='Hour__container'>
                        <span className='Hour__name'>{hour}</span>
                        <span className='Hour__ampm'>{hour <= 7 ? 'PM' : 'AM'}</span>
                        <span className='Hour__line'>&nbsp;</span>
                      </div>
                    );
                  })}
                </div>
                <div className='AgendaContainer__content'>
                  <TextField
                    id="standard-bare"
                    className={classes.textField}
                    style={styles.kickOffName}
                    value={this.props.kickOffName}
                    margin="normal"
                    placeholder="Kick-off Name"
                    variant="filled"
                    fullWidth
                    onChange={this.updateKickOffName_}
                  />

                  {this.scheduledActivities().map((activity, index) => {
                    const heightStyle = {
                      paddingTop: `${Math.floor(activity.duration / 2)}px`,
                      paddingBottom: `${Math.ceil(activity.duration / 2)}px`,
                    };

                    return(<div style={heightStyle} className={`AgendaItem AgendaItem--${activity.type}`} key={index}>{activity.content}, {activity.startTime} - {activity.endTime}</div>);
                  })}
                </div>
              </div>
              <div>&nbsp;</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  updateKickOffName_ = (e) => {
    this.props.onChangeKickOffName(e.target.value)
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
        if (!lunchScheduled && lunchNeeded && (segmentEndTime.isAfter(lunchStart) || segmentEndTime.isSame(lunchStart))) {
          console.log('lunch start', lunchStart.format(TIME_FORMAT))
          console.log('seg start', segmentStartTime.format(TIME_FORMAT))
          console.log('seg end', segmentEndTime.format(TIME_FORMAT))

          if (!segmentStartTime.isSame(lunchStart)) {
            scheduledActivitiesList.push(this.createActivity_(BREAK_TITLE, segmentStartTime, lunchStart, 'non-activity'));
          }

          segmentStartTime = moment(lunchStart);
          segmentStartTime.add(lunchDuration, 'minutes');
          segmentEndTime = moment(segmentStartTime);
          segmentEndTime.add(activityDuration, 'minutes');

          scheduledActivitiesList.push(this.createActivity_('Lunch', lunchStart, segmentStartTime, 'non-activity'));
          lunchScheduled = true;

          if (segmentEndTime.isBefore(finish)) {
            scheduledActivitiesList.push(this.createActivity_(activity.content, segmentStartTime, segmentEndTime, 'activity'));

            segmentStartTime = moment(segmentEndTime);
            segmentEndTime = moment(segmentStartTime);
            segmentEndTime.add(activityDuration, 'minutes');
          } else {
            scheduledActivitiesList.push(this.createActivity_(BREAK_TITLE, segmentStartTime, segmentEndTime, 'non-activity'));
          }
        } else if (segmentEndTime.isAfter(finish)) {
          outOfTime = true;
          if (segmentStartTime.isBefore(finish)) {
            scheduledActivitiesList.push(this.createActivity_(BREAK_TITLE, segmentStartTime, segmentEndTime, 'non-activity'));
          }
        } else {
          scheduledActivitiesList.push(this.createActivity_(activity.content, segmentStartTime, segmentEndTime, 'activity'));

          segmentStartTime = moment(segmentEndTime);
          segmentEndTime = moment(segmentStartTime);
          segmentEndTime.add(activityDuration, 'minutes');
        }
      }
    });

    return scheduledActivitiesList;
  }

  createActivity_ = (content, startTime, endTime, type) => {
    return {
      content: content,
      startTime: startTime.format(TIME_FORMAT),
      endTime: endTime.format(TIME_FORMAT),
      duration: endTime.diff(startTime) / 1000 / 60,
      type: type,
    }
  }
}

AgendaViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  kickOffName: PropTypes.string.isRequired,
  onChangeKickOffName: PropTypes.func.isRequired,
  activityType: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  lunchDuration: PropTypes.number.isRequired,
  lunchStartTime: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
};

export default withStyles(styles)(AgendaViewer);
