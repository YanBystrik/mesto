export default class UserInfo {
    constructor({ profileTitle, profileSubtitle }){
    this.profileTitle = profileTitle;
    this.profileSubtitle = profileSubtitle;
    }

    getUserInfo(){
        const infoObj = {
            title: this.profileTitle.textContent,
            subtitle: this.profileSubtitle.textContent
        }
        return infoObj;
    }

    setUserInfo(infoObj){
        this.profileTitle.textContent = infoObj.title;
        this.profileSubtitle.textContent = infoObj.subtitle;
    }
}