import { Button } from '@material-ui/core';
import parserIniText from 'app/utilities/parserIniText';
import React from 'react';
// import { exec } from 'child_process';
const execFile = window.require('child_process').execFile;
const execCmd = window.require('child_process').exec;
const remote = window.require('electron').remote;
const fs = window.require('fs');



interface IOwnProps {

}
class MainPageClass extends React.Component<IOwnProps> {
    public render() {
        return (
            <>
                <Button onClick={ this.openNotepad2.bind(this) } color="primary">
                    Open RDP
                </Button>
                <br />
                <Button onClick={ this.openNotepad.bind(this) } color="primary">
                    Get DB Names
                </Button>
            </>
        );
    }
    public openNotepad2() {
        execFile('mstsc', ['/v:ts-efsol.42clouds.com', '/g:gw.42clouds.com']);
    }
    public openNotepad() {
        /*
                fetch('https://reddit.com/r/aww.json?raw_json=1', {
                    mode: 'no-cors'
                }).then(response => {
                    alert(JSON.stringify(response));
                });*/
        const me = this;
        const localdatbasesIni = remote.app.getPath('appData') + '\\1C\\1CEStart\\ibases.v8i';
        fs.readFile(localdatbasesIni, 'utf-8', (err: Error, data: string) => {
            if (err) {
                alert('An error ocurred reading the file :' + err.message);
                return;
            }

            const constiniObj = parserIniText<{ ID: string }>(data);
            const sections = Object.keys(constiniObj);
            for (const section of sections) {
                alert(section);
            }


        });
        // wmic /output:D:\w.txt product where "name like '%1C:%' or name like '%1С:%'" get Name, version, InstallLocation /format:RAWXML

        // alert(remote.app.getPath('appData'));
        // const y = execFile('mstsc', ['/v:ts-efsol.42clouds.com', '/g:gw.42clouds.com']);
        execCmd(`wmic product where "name like '%1C:%' or name like '%1С:%'" get Name, version, InstallLocation /format:RAWXML`, (error: any, stdout: any, stderr: any) => {
            console.log(stdout);
        });

        /*
          , [`wmic /output:D:\w.txt product where "name like '%1C:%' or name like '%1С:%'" get Name, version, InstallLocation /format:RAWXML`], (error: any, stdout: any, stderr: any) => {
            console.log(stdout);
        }
         */

    }


}
export const MainPage = MainPageClass;