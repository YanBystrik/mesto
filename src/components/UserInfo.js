export default class UserInfo {
    constructor({ profileTitle, profileSubtitle, profileAvatar }){
    this.profileTitle = profileTitle;
    this.profileSubtitle = profileSubtitle;
    this.profileAvatar = profileAvatar;
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

    setInfoFromApi(res){
        this.profileTitle.textContent = res.name;
        this.profileSubtitle.textContent = res.about;
        this.profileAvatar.src = res.avatar;
    }
}