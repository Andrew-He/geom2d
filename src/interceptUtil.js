/**
 * @file interceptUtils.js
 * @author andrew he
 */

import Point from './point';
import Polygon from './Polygon';
import LineSegment from './lineSegment';


const interceptUtils = {

    rectToRect(rect1, rect2) {
        return Math.max(rt1.left, rt2.left) < Math.min(rt1.right, rt2.right)
                    && Math.max(rt1.top, rt2.top) < Math.min(rt1.bottom, rt2.bottom);
    }

    lineToLine(line1, line2) {
        let it = line1.iterator;
        const ptA1 = it.next().value;
        const ptA2 = it.next().value;
        it = line2.iterator;
        const ptB1 = it.next().value;
        const ptB2 = it.next().value;
        const ccw = (ptA1, ptA2, ptB1) => (ptB1.y - ptA1.y) * (ptA2.x - ptA1.x) > (ptA2.y - ptA1.y) * (ptB1.x - ptA1.x);
        return (ccw(ptA1, ptA2, ptB2) !== ccw(ptA2, ptB1, ptB2)) && (ccw(ptA1, ptA2, ptB1) !== ccw(ptA1, ptA2, ptB2));
    }

};

module.exports = interceptUtils;