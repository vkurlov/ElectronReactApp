import React, { ComponentType } from 'react';

interface IOwnState {
    scrollWidth: number;
    scrollHeight: number;
    isMobileSized: boolean;
}

export interface IWithWindowDimensionsProps {
    windowDimensions: {
        scrollWidth: number;
        scrollHeight: number;
        isMobileSized: boolean;
    };
}

interface INeedProps extends IWithWindowDimensionsProps {

}

type OwnProps = Omit<INeedProps, keyof IWithWindowDimensionsProps>;

export default function withWindowDimensions(WrappedComponent: React.ComponentType<INeedProps>):
    ComponentType<OwnProps> {
    return class extends React.Component<OwnProps, IOwnState> {
        public constructor(props: OwnProps) {
            super(props);
            this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
            this.state = {
                scrollWidth: 0,
                scrollHeight: 0,
                isMobileSized: false
            };
        }

        public componentDidMount() {
            this.updateWindowDimensions();
            window.addEventListener('resize', this.updateWindowDimensions);
        }

        public componentWillUnmount() {
            window.removeEventListener('resize', this.updateWindowDimensions);
        }

        public updateWindowDimensions() {
            const scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );

            const scrollWidth = Math.max(
                document.body.scrollWidth, document.documentElement.scrollWidth,
                document.body.offsetWidth, document.documentElement.offsetWidth,
                document.body.clientWidth, document.documentElement.clientWidth
            );

            this.setState({
                scrollWidth, // window.innerWidth,
                scrollHeight, // window.innerHeight
                isMobileSized: window.innerWidth <= 770
            });
        }

        public shouldComponentUpdate(_nextProps: OwnProps, nextState: IOwnState) {
            const shouldUpdate =
                this.state.scrollWidth !== nextState.scrollWidth ||
                this.state.scrollHeight !== nextState.scrollHeight;
            return shouldUpdate;
        }

        public render() {
            return (
                <WrappedComponent
                    windowDimensions={ {
                        scrollWidth: this.state.scrollWidth,
                        scrollHeight: this.state.scrollHeight,
                        isMobileSized: this.state.isMobileSized
                    } }>
                    { this.props.children }
                </WrappedComponent>
            );
        }
    };
}