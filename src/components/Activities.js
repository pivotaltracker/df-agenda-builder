import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../App.css';

const styles = {
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
  margin: `${grid * 1.5}px 75px`,
  border: isDragging ? '1px dashed #3f51b5' : '1px solid #D8D9DB',

  // change background colour if dragging
  background: isDragging ? 'white' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: '#F4F5F7',
  padding: grid,
  width: 500,
});

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {id: 1, content: 'Create a Problem Statement'},
        {id: 2, content: 'Determine Business Goals & Anti-Goals'},
        {id: 3, content: 'Determine Product Goals & Anti-Goals'},
        {id: 4, content: 'Determine Technical Goals & Anti-Goals'},
        {id: 5, content: 'Determine Enablement Goals & Anti-Goals'},
        {id: 6, content: 'Create a Stakeholder Map'},
        {id: 7, content: 'Understand Integrations'},
        {id: 8, content: 'Understand Value Proposition'},
        {id: 9, content: 'List Assumptions and Experiments'},
        {id: 10, content: 'List Risks and Mitigations'},
        {id: 11, content: 'Create Proto-personas'},
        {id: 12, content: 'Determine Use Cases'},
        {id: 13, content: 'Create an Interview and Observations List'},
        {id: 14, content: 'Create D&F Calendar'},
      ],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  render () {
    return (
      <div className='contentContainer'>
        <div className='timingCards'>

          <div className='ActivitiesContentContainer'>
            <div className='ActivitiesLabels'>
            
            </div>
            <DragDropContext onDragEnd={this.onDragEnd} className='ActivitiesItems'>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className='MuiPaper-root-9 MuiPaper-elevation1-12 MuiPaper-rounded-10 MuiCard-root-146 SimpleCard-card-148'
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          
        </div>
      </div>
    );
  }
}

Activities.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Activities);
