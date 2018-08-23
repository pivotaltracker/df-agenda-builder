import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';

import '../App.css';

const styles = {
  ActivitiesContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ActivitiesContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  ActivitiesLabels: {
    fontSize: '36px',
    marginTop: '0px',
    textAlign: 'right',
    color: '#aaa',
    marginLeft: '20px',
  },
  ActivitiesLabel: {
    margin: '23px 0',
  },
  ActivitiesCards: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Card: {
    width: 500,
    backgroundColor: '#F4F5F7',
  },
  activityDescription: {
    width: 460,
    backgroundColor: '#eab889',
    padding: '10px 20px',
    margin: '0 0 10px 0',
  },
  activityDescriptionTitle: {
    fontFamily: 'Roboto Slab',
    marginBottom: 8,
  },
  CloseButton: {
    backgroundColor: 'none',
    marginLeft: 385,
  },
  activityDescriptionContent: {

  }
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `${grid * 1.5}px 10px`,
  border: isDragging ? '1px dashed #3f51b5' : '1px solid #D8D9DB',

  // change background colour if dragging
  background: isDragging ? 'white' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: 'none',
  padding: grid,
  width: 420,
});

class ActivityScheduler extends React.Component {
  state = {
    activityDescription: null,
  }

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    let {
      activities,
      onActivityReorder,
    } = this.props;

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedActivities = reorder(
      activities,
      result.source.index,
      result.destination.index
    );

    onActivityReorder(reorderedActivities)
  }

  render () {
    let {
      activities,
      classes,
    } = this.props;

    let {
      activityDescription
    } = this.state;

    return (
      <div>
        <div className='StepHeader'>Build a Kick-off Agenda</div>
        <div className={classes.ActivitiesContentContainer}>
          <div className='StepSubheader' style={{width: 500}}>Which activities will help you achieve your Kick-off objectives?<br />Drag &amp; Drop the activites to place them in order of importance. Click an activity to learn more.</div>
          {activityDescription ? this.showActivityDescription() : null}
          <Card className={classes.Card}>
            <div className={classes.ActivitiesContent}>

              <div className={classes.ActivitiesLabels}>
                {activities.map((item, index) => (
                  <div key={index} className={classes.ActivitiesLabel}>{index + 1}</div>
                ))}
              </div>

              <div className={classes.ActivitiesCards}>
                <DragDropContext onDragEnd={this.onDragEnd} className='ActivitiesItems'>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      className='MuiPaper-root-9 MuiCard-root-146 SimpleCard-card-148'>
                        {activities.map((item, index) => {
                          let describeActivityFn = this.describeActivity.bind(null, item.content);

                          return(
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={describeActivityFn}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              >
                              {item.content}
                              </div>
                            )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>


            </div>
          </Card>
        </div>
      </div>
    );
  }

  describeActivity = (description) => {
    this.setState((prevState, props) => {
      return {activityDescription: description};
    });
  }

  showActivityDescription = () => {
    let {
      classes,
    } = this.props;

    let {
      activityDescription
    } = this.state;

    return(
      <Card className={classes.activityDescription}>
        <div className={classes.activityDescriptionTitle}>Activity Description:</div>
        <div className={classes.activityDescriptionContent}>This is a detailed desription of the activity {activityDescription}</div>
        <br />
        <Button className={classes.CloseButton} onClick={this.describeActivity.bind(null, null)}>Close</Button>
      </Card>
    );
  }
}

ActivityScheduler.propTypes = {
  onActivityReorder: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActivityScheduler);
