import React from 'react';

function isIndexSelected(selected, index) {
  if (!Array.isArray(selected) && typeof selected !== 'number') {
    return false;
  }

  if (Array.isArray(selected)) {
    return selected.includes(index);
  }

  return selected === index;
}

export default function ButtonGroup({
  onClick,
  selected,
  children,
  disabled,
  className = ''
}) {
  // Get the length of children safely
  const childArray = React.Children.toArray(children);

  function getBorderRadii(index) {
    const lastIndex = childArray.length - 1;
    if (index === 0) {
      return 'rounded-r-none';
    } else if (index === lastIndex) {
      return 'rounded-l-none -ml-1';
    }
    return 'rounded-none -ml-1';
  }

  return (
    <div className={className}>
      {React.Children.map(childArray, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        // Determine if this button is selected
        const isSelected = child.props.isSelected
          ? child.props.isSelected
          : isIndexSelected(selected, index);

        const borderRadiiOverride = getBorderRadii(index);
        const selectedOverride = isSelected ? 'bg-custom-primary' : '';

        return React.cloneElement(child, {
          disabled: disabled || child.props.disabled,
          active: isSelected,
          className: `${child.props.className || ''} ${selectedOverride} ${borderRadiiOverride}`,
          onClick: (event) => {
            if (disabled) {
              return;
            }

            if (child.props.onClick) {
              child.props.onClick(event);
            }

            if (onClick) {
              onClick(event, index);
            }
          },
        });
      })}
    </div>
  );
  
}
