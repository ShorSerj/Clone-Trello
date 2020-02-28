const BackImage = {
    basicImage: ["url(/src/assets/back_1.jpg)"],

    changeBack(backList = null) {
        let img
        if (backList.length < 1) {
            img = BackImage.basicImage
        } else {
            img = backList[Math.floor(Math.random() * backList.length)]
        }

        document.body.style.backgroundImage = img
    }
}

export {
    BackImage
}