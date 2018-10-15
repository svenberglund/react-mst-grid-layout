/*
    Utility functions for use in demo.
*/



var alfanums = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/*
    Delivers a pseudo random string with given lenght and optionally composed from the characters given by chars parameter.
*/
export function randomString(length, chars = alfanums) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/*
    A pseudo random integer in the range between min and max (closed interval).
*/
export function randomInt(min, max){
    return Math.ceil( min - 0.5 + (Math.random() * max));
}

/*
    Maps a integer in the closed range zero to thousand to two different integers as output.
    These two different integers are in the range zero to 255 and the mapping is continuous.
    The output is intended to be used in a heat map style rgb output (e.g. for red and blue).
*/
export function integerToHeatMap(zeroToThousand){

    let minVal = 0;
    let maxVal = 1000;
    let midVal = 500;
    let intH = null;
    let intL = null;

    if (zeroToThousand >= midVal){
        intH = 255;
        intL = Math.round(255 * ((maxVal - zeroToThousand) / (maxVal - midVal)));
   }
   else{
       intL = 255;
       intH = Math.round(255 * ((zeroToThousand - minVal) / (midVal - minVal)));
   }
   
    /* 
    rgbL is a value that is active in low ranges ot the underlying variable.
    rgbH is active in higher ranges. 
    e.g. to construct a blue-to-red heat map from this output do something like this `rgb(${ouput.get(rgbH)},0,${output.get(rgbL)})`
    */
    return {'rgbL' : intL, 'rgbH' : intH};
}
