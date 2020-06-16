
import { CircularProgress } from '@material-ui/core';
import React from 'react';


interface IOwnProps {
    Style?: React.CSSProperties;
}

export class CircularProgressWhite extends React.Component<IOwnProps> {
    public render() {
        return (
            <CircularProgress size="30px" style={ { color: '#FFF', ...this.props.Style } } />
        );
    }
}




