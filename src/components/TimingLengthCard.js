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
    backgroundColor: '#eee',
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
    selectedButton: null
  }

  onClickButton = (buttonName) => {
    this.setState({selectedButton: buttonName});
  }

  render () {
    const { classes } = this.props;
    const buttonNames = ['4 hours', '6 hours', '8 hours'];
    console.log(this.state)

    return (
      <div>
      <Typography>How long will your Kick-off be?</Typography>
      <Card className={classes.card}>
        <CardContent className='LengthContainer'>
          {buttonNames.map(function(buttonName, index) {
            let buttonStyle = {};
            if (buttonName === this.state.selectedButton) {
              buttonStyle.backgroundColor = '#3F7291';
              buttonStyle.color = '#FFF'
            }
            
            return(
              <Button key={index} style={buttonStyle}  variant='contained' className='LengthButton' onClick={this.onClickButton.bind(null, buttonName)}>{buttonName}</Button>
            );
          }, this)}
        </CardContent>
      </Card>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
