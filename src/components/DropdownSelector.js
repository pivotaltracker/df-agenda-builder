import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../App.css';
import { Select } from '../../node_modules/@material-ui/core';

const styles = {
  card: {
    width: 500,
    backgroundColor: '#eee',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SimpleCard extends React.Component {
  state = {
    selectedTime: this.props.defaultOption
  }

  onSelectTime = (event) => {
    this.setState({ selectedTime: event.target.value });
  }

  render () {
    const {
      classes,
      dropdownOptions,
      title,
    } = this.props;

    return (
      <div>
        <Typography>{title}</Typography>
        <Card className={classes.card}>
          <CardContent>
            <Select onChange={this.onSelectTime}
                    value={this.state.selectedTime}>
              {dropdownOptions.map((timeOption, index) => {
                return <option key={index} value={timeOption}>{timeOption}</option>
              })}
            </Select>
          </CardContent>
        </Card>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  dropdownOptions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
};

export default withStyles(styles)(SimpleCard);
