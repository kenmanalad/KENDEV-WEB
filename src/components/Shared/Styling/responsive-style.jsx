export const responsiveStyle = (screenWidth,values) => {

    //There should be customized styles for 3 different screen widths
    //These are 3 screen widths:
    //More than 1405
    //Less than 1405 but not less than 1129
    //Mobile view
    //These will change depending on what is required 

    //0 for mobile view
    //1 screen more than 1405
    //2 screen less than 1405 more than 1129

    if(screenWidth >= 1535 ){
        return values[1];
    }else if(screenWidth < 1535 && screenWidth > 1145){
        return values[2];
    }
    else if(screenWidth < 885){
        return values[3];
    }
    return values[0];

}