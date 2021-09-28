export default class UserInfo {
    constructor({ inputTitle, inputSubtitle }){
    this.inputTitle = inputTitle;
    this.inputSubtitle = inputSubtitle;
    }

    getUserInfo(){
        const infoObj = {
            title: this.inputTitle.textContent,
            subtitle: this.inputSubtitle.textContent
        }
        return infoObj;
    }

    setUserInfo(infoObj){
        this.inputTitle.textContent = infoObj.title;
        this.inputSubtitle.textContent = infoObj.subtitle;
    }
}