import React from 'react';
import PropTypes from 'prop-types';
import DefinedProbCard from './DefinedProbCard';
import GreenfieldIdeaCard from './GreenfieldIdeaCard';
import '../App.css';

class TypeSelector extends React.Component {
  render () {
    let {
      activityType,
      onSelectType,
    } = this.props;

    const greenfieldSelectFn = onSelectType.bind(null, 'Greenfield');
    const definedSelectFn = onSelectType.bind(null, 'Defined');

    return (
      <div>
        <div className='StepHeader'>Build a Kick-off Agenda</div>
        <div className='contentContainer'>
          <div className='StepSubheader' style={{marginRight: '316px'}}>Which statement best describes your problem space?</div>
          <div className='cards'>
            <DefinedProbCard onClick={definedSelectFn} active={activityType === 'Defined'} />
            <GreenfieldIdeaCard onClick={greenfieldSelectFn} active={activityType === 'Greenfield'} />
          </div>
        </div>
      </div>
    );
  }
}

TypeSelector.propTypes = {
  activityType: PropTypes.string,
  onSelectType: PropTypes.func.isRequired,
};

export default TypeSelector;
