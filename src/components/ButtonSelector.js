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

class SimpleCard extends React.Component {
  state = {
    selectedButton: null
  }

  onClickButton = (buttonName) => {
    this.setState({selectedButton: buttonName});
  }

  render () {
    const { 
      classes,
      buttonOptions,
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
  buttonOptions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleCard);
