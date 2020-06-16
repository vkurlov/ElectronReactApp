import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { ReactNode } from 'react';

interface IOwnProps {
    children?: ReactNode;
}

const messageContentStyle: CSSProperties = {
    width: '300px',
    wordWrap: 'break-word',
    cursor: 'pointer'
};

export class MessageContentView extends React.Component<IOwnProps> {
    public render() {
        return (
            <>
                <div style={ messageContentStyle }>
                    { this.props.children }
                </div>
            </>
        );
    }
}
