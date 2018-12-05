import React from 'react';
import {getPixelsPerInch} from './helpers.js';

const loop = (data) => {
    return data.map((item) => {
        return data.map((item) => {
        if (item[0] === 5) {
            return <svg><line x1={8} y1={item[1]} x2={item[2]} y2={item[3]} stroke="black" /><text x={3} y={item[1]+3} font-size="10" fill="crimson">{item[4]}</text></svg>
        } else {
            return <line x1={item[0]} y1={item[1]} x2={item[2]} y2={item[3]} stroke="black" />;
        }
    });

    });
};

class VerticalRule extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const myStyle = {
            height: document.designData.documentHeight + getPixelsPerInch() + 'px'
        }
        return <div className="verticalRule" style={myStyle}>
            <svg height={document.designData.documentHeight + getPixelsPerInch()}>{loop(this.getLines())}</svg>
        </div>;
    }

    getLines() {
        let retval = [];
        
        let ppi = getPixelsPerInch();
        let eigthInch = ppi/8;
        let cy = (document.designData.documentHeight/eigthInch);
        for (let i = 1; i <= cy; i++) {
            let ypos = Number(i*eigthInch);
            switch(i%8) {
                case 0:
                    retval.push([5, ypos, 21, ypos, i/8]);
                    break;
                case 1:
                    retval.push([15, ypos, 21, ypos]);
                    break;
                case 2:
                    retval.push([12, ypos, 21, ypos]);
                    break;
                case 3:
                    retval.push([15, ypos, 21, ypos]);
                    break;
                case 4:
                    retval.push([10, ypos, 21, ypos]);
                    break;
                case 5:
                    retval.push([15, ypos, 21, ypos]);
                    break;
                case 6:
                    retval.push([12, ypos, 21, ypos]);
                    break;
                case 7:
                    retval.push([15, ypos, 21, ypos]);
                    break;
            }
        }

        return retval;
    }
}

export {VerticalRule};