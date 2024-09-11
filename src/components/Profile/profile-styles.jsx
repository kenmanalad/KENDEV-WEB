// export const profileDivStyle = (screenWidth) => {

//     return screenWidth >= 1405 ?  
//         "flex justify-evenly p-4 rounded shadow w-2/5 bg-white" 
//         : screenWidth < 1405 && screenWidth > 1129 ?   
// }

const responsiveStyle = (screenWidth,values) => {

    //There should be customized styles for 3 different screen widths
    //These are 3 screen widths:
    //More than 1405
    //Less than 1405 but not less than 1129
    //Mobile view
    //These will change depending on what is required 

    //0 for mobile view
    //1 screen more than 1405
    //2 screen less than 1405 more than 1129

    if(screenWidth >= 1405 ){
        return values[1];
    }else if(screenWidth < 1405 && screenWidth > 1145){
        return values[2];
    }
    else if(screenWidth < 885){
        return values[3];
    }
    return values[0];

}

export const profileDivStyle = (screenWidth) => {

    //flex justify-evenly p-4 rounded shadow bg-white
    let widthValues = ["w-2/3","w-2/5","w-1/2"];

    let width = responsiveStyle(screenWidth, widthValues);

    let flexValues = ["flex-row","flex-row","flex-row","flex-col"];

    let flex = responsiveStyle(screenWidth,flexValues);

    let justifyValues = ["justify-evenly","justify-evenly","justify-evenly","justify-center"];

    let justify = responsiveStyle(screenWidth,justifyValues);

    let additionalStyle = "flex p-4 rounded shadow bg-white"

    return `${width} ${flex} ${justify} ${additionalStyle}`;

}
export const profileNameStyle = (screenWidth) => {

    let fontSizes = ["text-2xl","text-2xl","text-2xl", "text-base"];

    let fontSize = responsiveStyle(screenWidth,fontSizes);

    let additionalStyle = "flex justify-center items-center"

    return `${fontSize} ${additionalStyle}`;

}

export const profilePicStyle = (screenWidth) => {

    //"w-3/4 h-48 rounded-lg shadow"
    let heightValues = ["h-56","h-48","h-52","h-24"];

    let height = responsiveStyle(screenWidth,heightValues);

    let widthValues = ["w-4/5","w-3/4","w-4/5","w-24"];

    let width = responsiveStyle(screenWidth, widthValues);

    let additionalStyle = "rounded-lg shadow";

    return `${height} ${width} ${additionalStyle}`;

}