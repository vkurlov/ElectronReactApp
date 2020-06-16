import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { CommonButton } from 'app/view/components/buttons/CommonButton';
import { ButtonTypeEnum } from 'app/view/components/buttons/CommonButton/enum';
import React from 'react';

interface IOwnProps {
    isModalOpen: boolean;
    title: string;
    dialogWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    onOkClick?: () => void;
    okButtonText?: string;
    isOkButtonEnabled?: boolean;

    showProgressForOkButton?: boolean;
    cancelButtonText?: string;
    onCancelClick: () => void;
}
export class SimpleModal extends React.Component<IOwnProps> {
    public render() {
        return (
            <Dialog
                fullWidth={ true }
                maxWidth={ this.props.dialogWidth }
                open={ this.props.isModalOpen }
                scroll="paper"
                onClose={ this.props.onCancelClick }>
                <DialogTitle id="max-width-dialog-title">{ this.props.title }</DialogTitle>
                <DialogContent>
                    { this.props.children }
                </DialogContent>
                <DialogActions>
                    <CommonButton type={ ButtonTypeEnum.Success }
                        isEnabled={ this.props.isOkButtonEnabled }
                        onClick={ this.props.onOkClick }
                        showProgress={ this.props.showProgressForOkButton }
                    >
                        { this.props.okButtonText ?? 'ОК' }
                    </CommonButton>
                    <CommonButton type={ ButtonTypeEnum.Default } onClick={ this.props.onCancelClick }>
                        { this.props.cancelButtonText ?? 'Закрыть' }
                    </CommonButton>
                </DialogActions>
            </Dialog>
        );
    }
}