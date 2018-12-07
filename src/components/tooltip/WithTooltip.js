import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TooltipTrigger from 'react-popper-tooltip';
import { withState } from 'recompose';

import Tooltip from './Tooltip';

// A target that doesn't speak popper
// prettier-ignore
const TargetContainer = styled.div`
  display: inline-block;
  cursor: ${props => props.mode === 'hover' ? 'default' : 'pointer'};
`;

const TargetSvgContainer = styled.g`
  cursor: ${props => (props.mode === 'hover' ? 'default' : 'pointer')};
`;

function WithTooltip({
  svg,
  trigger,
  closeOnClick,
  placement,
  modifiers,
  hasChrome,
  tooltip,
  children,
  tooltipShown,
  onVisibilityChange,
}) {
  const Container = svg ? TargetSvgContainer : TargetContainer;
  return (
    <TooltipTrigger
      placement={placement}
      trigger={trigger}
      tooltipShown={tooltipShown}
      onVisibilityChange={onVisibilityChange}
      modifiers={modifiers}
      tooltip={({ getTooltipProps, getArrowProps, tooltipRef, arrowRef, placement }) => (
        <Tooltip
          hasChrome={hasChrome}
          placement={placement}
          tooltipRef={tooltipRef}
          arrowRef={arrowRef}
          arrowProps={getArrowProps()}
          {...getTooltipProps()}
        >
          {typeof tooltip === 'function'
            ? tooltip({ onHide: () => onVisibilityChange(false) })
            : tooltip}
        </Tooltip>
      )}
    >
      {({ getTriggerProps, triggerRef }) => (
        <Container ref={triggerRef} {...getTriggerProps()}>
          {children}
        </Container>
      )}
    </TooltipTrigger>
  );
}

WithTooltip.propTypes = {
  svg: PropTypes.bool,
  trigger: PropTypes.string,
  closeOnClick: PropTypes.bool,
  placement: PropTypes.string,
  modifiers: PropTypes.shape({}),
  hasChrome: PropTypes.bool,
  tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  children: PropTypes.node.isRequired,
  tooltipShown: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
};

WithTooltip.defaultProps = {
  svg: false,
  trigger: 'hover',
  closeOnClick: false,
  placement: 'top',
  modifiers: {},
  hasChrome: true,
};

export default withState('tooltipShown', 'onVisibilityChange', ({ startOpen }) => startOpen)(
  WithTooltip
);
