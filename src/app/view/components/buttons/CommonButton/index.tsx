import BaseButton from 'app/view/components/buttons/CommonButton/BaseButton';
import { ButtonTypeEnum } from 'app/view/components/buttons/CommonButton/enum';
import React, { MouseEventHandler } from 'react';

interface IOwnProps {
    onClick?: MouseEventHandler;
    isEnabled?: boolean;
    type: ButtonTypeEnum;
    showProgress?: boolean;
    fullWidth?: boolean;

}

const buttonSuccessStyle: React.CSSProperties = {
    borderColor: 'green',
    color: 'green'
};

const buttonErrorStyle: React.CSSProperties = {
    borderColor: 'red',
    color: 'red'
};

const buttonDefaultStyle: React.CSSProperties = {
    borderColor: 'transparent',
    border: 0,
    color: 'black',
    backgroundColor: 'white'
};

export class CommonButton extends React.Component<IOwnProps> {

    public shouldComponentUpdate(nextProps: IOwnProps) {
        const should =
            this.props.isEnabled !== nextProps.isEnabled ||
            this.props.type !== nextProps.type ||
            this.props.fullWidth !== nextProps.fullWidth ||
            this.props.onClick !== nextProps.onClick;

        return should;
    }

    public render() {
        const style = this.props.type === ButtonTypeEnum.Success
            ? buttonSuccessStyle
            : this.props.type === ButtonTypeEnum.Error
                ? buttonErrorStyle
                : this.props.type === ButtonTypeEnum.Default
                    ? buttonDefaultStyle
                    : {};
        const isEnabled = this.props.isEnabled === undefined ||
            this.props.isEnabled === true;
        return (
            <BaseButton style={ style } onClick={ this.props.onClick }
                isEnabled={ isEnabled }
                fullWidth={ this.props.fullWidth }
                showProgress={ this.props.showProgress }>
                { this.props.children }
            </BaseButton>
        );
    }
}
