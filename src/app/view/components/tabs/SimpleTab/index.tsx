import { Tab, Tabs } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface IOwnProps {
    activeTabIndex: number;
    tabs: string[];
    children: (activeTabIndex: number) => ReactElement;
}

interface IOwnState {
    activeTabIndex: number;
}

export class SimpleTab extends React.Component<IOwnProps, IOwnState> {

    constructor(props: IOwnProps) {
        super(props);
        this.state = {
            activeTabIndex: props.activeTabIndex
        };
        this.onTabChange = this.onTabChange.bind(this);
    }
    public render() {
        return (
            <>
                <Tabs
                    value={ this.state.activeTabIndex }
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    onChange={ this.onTabChange }
                >
                    { this.createTabs() }
                </Tabs>
                <div style={ {
                    padding: '5px'
                } }>
                    { this.props.children(this.state.activeTabIndex) }
                </div >
            </>


        );
    }

    private createTabs() {
        return this.props.tabs.map(tab => (<Tab key={ tab } label={ tab } />));
    }

    private onTabChange(_event: React.ChangeEvent<{}>, value: number) {
        this.setState({
            activeTabIndex: value
        });
    }
}