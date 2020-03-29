const BackImage = {
    basicImage: ["url(../img/back_1.jpg)"],

    changeBack(backList = null) {
        let img
        if (backList.length < 1) {
            img = BackImage.basicImage
        } else {
            img = backList[Math.floor(Math.random() * backList.length)]
        } 
        return img
    }
}

export {
    BackImage
}