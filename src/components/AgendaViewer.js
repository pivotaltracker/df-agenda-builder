import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import '../App.css';

const ACTIVITY_TIME_IN_MINUTES = 15;

const styles = {
  AgendaViewer: {

  },
  card: {
    width: 500,
    backgroundColor: '#F4F5F7',
  },
};

class AgendaViewer extends React.Component {
  state = {
    activities: this.props.activities,
  }

  render () {
    let {
      classes
    } = this.props;

    return (
      <div className={classes.AgendaViewer}>
        <div className='StepDefinition'>How dis?</div>

        <div className='contentContainer'>
          <Card className={classes.card}>
            <CardContent>
              <div>Dis?</div>
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
      startTime,
    } = this.props;

    let {
      activities,
    } = this.state;

    let startHour = parseInt(startTime.split(':')[0], 10);
    if (startTime.includes('pm')) {
      startHour += 12;
    }

    let now = moment(); // grab now so that we are doing time math for today
    let start = moment(`${now.year()}-${now.month()+1}-${now.date()} ${startHour}:00`, 'YYYY-MM-DD HH:mm'); //2013-02-08 09:30

    const activityDuration = this.activityTimeInMinutes();

    activities.forEach((activity, index) => {
      let activityTime = moment(start);
      activityTime.add(activityDuration*index, 'minutes');
      console.log(activity.content, activityTime.format('h:mm a'));

      activities[index].time = activityTime.format('h:mm a');
    });

    return activities;
  }

  activityTimeInMinutes = () => {
    let {
      duration,
      lunchDuration,
    } = this.props;

    let {
      activities
    } = this.state;

    let normalizedLunchDuration = lunchDuration;
    if (normalizedLunchDuration === 'No Lunch Break') {
      normalizedLunchDuration = '0 minutes';
    }

    let totalMinutes = parseInt(duration.split(' ')[0], 10) * 60;
    let workMinutes = totalMinutes - parseInt(normalizedLunchDuration.split(' ')[0], 10);

    console.log('totalMinutes', totalMinutes)
    console.log('workMinutes', workMinutes)
    console.log('thingies', activities.length)

    return Math.floor(workMinutes/activities.length);
  };
}

AgendaViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  activityType: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  lunchDuration: PropTypes.string.isRequired,
  lunchStartTime: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
};

export default withStyles(styles)(AgendaViewer);
