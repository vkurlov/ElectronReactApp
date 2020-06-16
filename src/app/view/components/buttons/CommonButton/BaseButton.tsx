import { Button, CircularProgress } from '@material-ui/core';
import React, { MouseEventHandler } from 'react';

interface IOwnProps {
    fullWidth?: boolean;
    onClick?: MouseEventHandler;
    style?: React.CSSProperties;
    isEnabled?: boolean;
    showProgress?: boolean;
}

const buttonStyleDisabled: React.CSSProperties = {
    borderColor: 'gray',
    color: 'gray',
    backgroundColor: 'LightGray'
};


class BaseButton extends React.Component<IOwnProps> {
    public render() {
        return (
            <Button fullWidth={ this.props.fullWidth } variant="outlined" size="small" disabled={ this.props.isEnabled === false } color="primary"
                style={ this.props.isEnabled ? this.props.style : buttonStyleDisabled }
                onClick={ this.props.isEnabled ? this.props.onClick : undefined }>
                { this.props.children }
                { this.props.showProgress
                    ? (<CircularProgress size="1rem" style={ { marginLeft: '10px' } } />)
                    : null
                }

            </Button>
        );
    }
}

export default BaseButton;