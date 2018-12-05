import React from 'react';
import {getPixelsPerInch} from './helpers.js';

const loop = (data) => {
    return data.map((item) => {
        if (item[1] === 5) {
            return <svg><line x1={item[0] + 20} y1={11} x2={item[2] + 20} y2={item[3]} stroke="black" /><text x={item[0] + 17} y="11" font-size="10" fill="crimson">{item[4]}</text></svg>
        } else {
            return <line x1={item[0] + 20} y1={item[1]} x2={item[2] + 20} y2={item[3]} stroke="black" />;
        }
    });
};

class HorizontalRule extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className="horizontalRule">
            <svg width={document.designData.documentWidth + getPixelsPerInch()}>{loop(this.getLines())}</svg>
        </div>;
    }
    
    getLines() {
        let retval = [];
        
        let ppi = getPixelsPerInch();
        let eigthInch = ppi/8;
        let cx = (document.designData.documentWidth/eigthInch);
        for (let i = 1; i <= cx; i++) {
            let xpos = Number(i*eigthInch);
            switch(i%8) {
                case 0:
                    retval.push([xpos, 5, xpos, 20, i/8]);
                    break;
                case 1:
                    retval.push([xpos, 15, xpos, 20]);
                    break;
                case 2:
                    retval.push([xpos, 12, xpos, 20]);
                    break;
                case 3:
                    retval.push([xpos, 15, xpos, 20]);
                    break;
                case 4:
                    retval.push([xpos, 10, xpos, 20]);
                    break;
                case 5:
                    retval.push([xpos, 15, xpos, 20]);
                    break;
                case 6:
                    retval.push([xpos, 12, xpos, 20]);
                    break;
                case 7:
                    retval.push([xpos, 15, xpos, 20]);
                    break;
            }
        }

        return retval;
    }
}

export {HorizontalRule};