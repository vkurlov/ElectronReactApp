import { Backdrop } from '@material-ui/core';
import React from 'react';

export function LoadingBounce() {

    return (
        <Backdrop open={ true } style={ {
            zIndex: 1201,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            marginLeft: '270px',
            marginTop: '51px',
        } } >
            <div className="sk-spinner sk-spinner-double-bounce" style={ {
                position: 'absolute',
                top: '100px'
            } }>
                <div className="sk-double-bounce1"></div>
                <div className="sk-double-bounce2"></div>
            </div>

        </Backdrop>
    );
}