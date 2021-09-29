export default class UserInfo {
    constructor({ profileTitle, profileSubtitle }){
    this.profileTitle = profileTitle;
    this.profileSubtitle = profileSubtitle;
    }

    getUserInfo(){
        return {
            profile_name: this.profileTitle.textContent,
            profile_job: this.profileSubtitle.textContent
        }
    }

    setUserInfo(data){
        this.profileTitle.textContent = data.profile_name;
        this.profileSubtitle.textContent = data.profile_job;
    }
}