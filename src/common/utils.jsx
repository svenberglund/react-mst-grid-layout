

var alfanums = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function randomString(length, chars = alfanums) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export function randomInt(min, max){
    return Math.ceil( min - 0.5 + (Math.random() * max));
}

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
    
    var midVal = (maxVal - minVal)/2;
    var intR;
    var intG;
    var intB = Math.round(0);

    if (actual >= midVal){
         intR = 255;
         intG = Math.round(255 * ((maxVal - actual) / (maxVal - midVal)));
    }
    else{
        intG = 255;
        intR = Math.round(255 * ((actual - minVal) / (midVal - minVal)));
    }

    return to_rgb(intR, intG, intB);
    
    
    */

    /* 
    rgbL is a value that is active in low ranges ot the underlying variable.
    rgbH is active in higher ranges. 
    e.g. to construct a heat map from this output do something like this `rgb(${ouput.get(rgbH)},${output.get(rgbL)},0)`
    */
    return {'rgbL' : intL, 'rgbH' : intH};
    //return `rgb(${intR},${intG},${intB})`;
}
