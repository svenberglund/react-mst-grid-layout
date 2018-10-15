import GridElmentSuper from './elements/gridElementSuper'

var renderElmClasses = new Map();
renderElmClasses.set("super", GridElmentSuper);


/* A map where all the subclasses of gridElementSuper needs to be registered */
export default renderElmClasses;