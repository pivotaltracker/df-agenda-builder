import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import '../App.css';

const styles = {
  card: {
    width: 500,
    backgroundColor: '#F4F5F7',
  },
  title: {

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
        <div className={classes.title}>{title}</div>
        <br/>
        <Card className={classes.card}>
          <CardContent className='LengthContainer'>
            {buttonOptions.map((buttonData, index) => {
              let buttonStyle = {};
              if (buttonData.value === selectedButton) {
                buttonStyle.backgroundColor = '#3F7291';
                buttonStyle.color = '#FFF'
              }

              return(
                <Button
                  key={index}
                  style={buttonStyle}
                  variant='contained'
                  className='LengthButton'
                  onClick={onButtonPress.bind(null, buttonData.value)}>
                  {buttonData.display}
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
  selectedButton: PropTypes.number,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(ButtonSelector);
