import Circle from './src/circle';
import Point from './src/point';
import Polygon from './src/polygon';
import Rectangle from './src/rectangle';
import Segment from './src/segment';
import Factory from './src/factory';


const geom2D = Factory.register('circle', Circle)
                    .register('point', Point)
                    .register('polygon', Polygon)
                    .register('rectangle', Rectangle)
                    .register('segment', Segment)


module.exports = function() {
    return geom2D;
}

