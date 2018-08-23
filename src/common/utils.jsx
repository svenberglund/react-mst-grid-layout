

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
    let intR = 0;
    let intG = null;
    let intB = null;

    if (zeroToThousand >= midVal){
        intB = 255;
        intG = Math.round(255 * ((maxVal - zeroToThousand) / (maxVal - midVal)));
   }
   else{
       intG = 255;
       intB = Math.round(255 * ((zeroToThousand - minVal) / (midVal - minVal)));
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


    return `rgb(${intR},${intG},${intB})`;
}
