import { responsiveStyle } from "../../Shared/Styling/responsive-style";

export const courseDivNameStyle = (screenWidth, additionalStyle) => {
    let textSizes = ["text-2xl","text-2xl","text-2xl","text-lg"];
    let textSize =  responsiveStyle(screenWidth,textSizes);

    return `${textSize} ${additionalStyle}`;
}

export const courseDivStyle = (screenWidth, additionalStyle) => {
    let height = ["h-96","h-96","h-96",""];
    let finalHeight =  responsiveStyle(screenWidth,height);

    return `${finalHeight} ${additionalStyle}`;
}

export const confirmDivStyle = (screenWidth, additionalStyle) => {
    let height = ["h-3/5","","",""];
    let finalHeight =  responsiveStyle(screenWidth,height);

    return `${finalHeight} ${additionalStyle}`;
}

export const feedDivStyle = (screenWidth, additionalStyle, length) => {
    let height;
    if(length <= 8){
        height = [];
    }
    let finalHeight =  responsiveStyle(screenWidth,height);

    return `${finalHeight} ${additionalStyle}`;
}