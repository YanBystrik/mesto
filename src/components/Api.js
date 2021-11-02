export default class Api {
  constructor(url) {
    this.url = url;
  }

  getUserInfo() {
    return fetch(this.url + "/users/me", {
      headers: {
        authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response is not OK with code ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCards() {
    return fetch(this.url + "/cards", {
      headers: {
        authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response is not OK with code ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateUserInfo(name, about) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.textContent,
        about: about.textContent,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response is not OK with code ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateCards(name, link) {
    return fetch(this.url + "/cards", {
      method: "POST",
      headers: {
        authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response is not OK with code ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  removeCard(cardId) {
    return fetch(this.url + `/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response is not OK with code ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateAvatar(avatar) {
    return fetch(this.url + `/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response is not OK with code ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  like(cardId) {
    return fetch(this.url + `/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response is not OK with code ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  likeDelete(cardId) {
    return fetch(this.url + `/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response is not OK with code ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
