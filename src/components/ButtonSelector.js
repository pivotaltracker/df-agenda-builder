import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../App.css';

const styles = {
  card: {
    width: 500,
    backgroundColor: '#F4F5F7',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class ButtonSelector extends React.Component {
  render () {
    const {
      buttonOptions,
      classes,
      onButtonPress,
      selectedButton,
      title,
    } = this.props;

    return (
      <div>
      <Typography>{title}</Typography>
      <br/>
      <Card className={classes.card}>
        <CardContent className='LengthContainer'>
          {buttonOptions.map((buttonName, index) => {
            let buttonStyle = {};
            if (buttonName === selectedButton) {
              buttonStyle.backgroundColor = '#3F7291';
              buttonStyle.color = '#FFF'
            }

            return(
              <Button
                key={index}
                style={buttonStyle}
                variant='contained'
                className='LengthButton'
                onClick={onButtonPress.bind(null, buttonName)}>
                {buttonName}
              </Button>
            );
          }, this)}
        </CardContent>
      </Card>
      </div>
    );
  }
}

ButtonSelector.propTypes = {
  buttonOptions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  selectedButton: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(ButtonSelector);
