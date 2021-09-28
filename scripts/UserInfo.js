export default class UserInfo {
    constructor({ profileTitle, profileSubtitle }){
    this.profileTitle = profileTitle;
    this.profileSubtitle = profileSubtitle;
    }

    getUserInfo(){
        return {
            title: this.profileTitle.textContent,
            subtitle: this.profileSubtitle.textContent
        }
    }

    setUserInfo(data){
        this.profileTitle.textContent = data.title;
        this.profileSubtitle.textContent = data.subtitle;
    }
}