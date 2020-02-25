const BackImage = {
    basicImage: ["url(/src/assets/back_1.jpg)"],

    changeBack(arc = null){
        let backList = arc
        if(backList.length < 1){
            backList = BackImage.basicImage
        }
        const randomBack = Math.floor(Math.random() * backList.length)
        document.body.style.backgroundImage = backList[randomBack]
        console.log(document.body.style.backgroundImage)
        
        if(!document.body.style.backgroundImage){
            document.body.style.backgroundImage = BackImage.basicImage
        }
    }
}
export {
    BackImage
}