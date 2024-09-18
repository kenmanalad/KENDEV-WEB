import { responsiveStyle } from "../Shared/Styling/responsive-style";

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