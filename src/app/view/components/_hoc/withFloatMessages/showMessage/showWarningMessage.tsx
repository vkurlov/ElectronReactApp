import { IShowMessageProps } from 'app/view/components/_hoc/withFloatMessages/interfaces';
import { MessageContentView } from 'app/view/components/_hoc/withFloatMessages/MessageContent/MessageContent';
import React from 'react';

export function showWarningMessage(props: IShowMessageProps) {
    const key = props.enqueueSnackbar((<MessageContentView>{ props.content }</MessageContentView>),
        {
            variant: 'warning',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            onClick: () => {
                props.closeSnackbar(key);
            },
            autoHideDuration: 3000
        });
}