export default class UserInfo {
    constructor({ profileTitle, profileSubtitle }){
    this.profileTitle = profileTitle;
    this.profileSubtitle = profileSubtitle;
    }

    getUserInfo(){
        return {
            profileName: this.profileTitle.textContent,
            profileJob: this.profileSubtitle.textContent
        }
    }

    setUserInfo(data){
        this.profileTitle.textContent = data.profileName;
        this.profileSubtitle.textContent = data.profileJob;
    }
}