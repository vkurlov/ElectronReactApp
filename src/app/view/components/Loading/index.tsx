
import { LinearProgress } from '@material-ui/core';
import React from 'react';


interface IOwnProps {
}

export class Loading extends React.Component<IOwnProps> {
    public render() {
        return (
            <>
                <LinearProgress />
                <br />
                <LinearProgress />
                <br />
                <LinearProgress />
                <br />
                <LinearProgress />
                <br />
                <LinearProgress />
            </>
        );
    }
}




