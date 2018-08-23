import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Select } from '@material-ui/core';
import '../App.css';

const styles = {
  card: {
    width: 500,
    backgroundColor: '#F4F5F7',
  },
  title: {
    fontFamily: 'Roboto Slab',
  }
};

class DropdownSelector extends React.Component {
  render () {
    const {
      classes,
      dropdownOptions,
      selectedTime,
      title,
    } = this.props;

    return (
      <div>
        <div className={classes.title}>{title}</div>
        <br/>
        <Card className={classes.card}>
          <CardContent>
            <Select onChange={this.onSelectTime}
                    value={selectedTime}>
              {dropdownOptions.map((timeOptionData, index) => {
                return <option key={index} value={timeOptionData.value}>{timeOptionData.display}</option>
              })}
            </Select>
          </CardContent>
        </Card>
      </div>
    );
  }

  onSelectTime = (event) => {
    this.props.onOptionSelect(event.target.value);
  }
}

DropdownSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  dropdownOptions: PropTypes.array.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  selectedTime: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(DropdownSelector);
