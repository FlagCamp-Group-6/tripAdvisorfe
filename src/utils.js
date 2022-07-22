const domain = "http://localhost:8080";

export const register = (credential, asHost) => {
    const registerUrl = `${domain}/register`;
    return fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to register");
      }
    });
  };

  export const login = (credential) =>{
    const loginUrl = `${domain}/authenticate`;
    return fetch(loginUrl,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credential)
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to log in");
        }
        return response.json();
    });
};

  export const logout = () => {
    const logoutUrl = `${domain}/logout`;
    return fetch(logoutUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error('Fail to log out');
      }
    })
  }
 
  export const search = (query) => {
    const authToken = localStorage.getItem("authToken");
    const searchPOIUrl = new URL(`${domain}/search/`);
    searchPOIUrl.searchParams.append("name", query.place_name);
    searchPOIUrl.searchParams.append("lat", 37);
    searchPOIUrl.searchParams.append("lon", -122);
   
    return fetch(searchPOIUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to search trip");
      }
      return response.json();
    });
  };

  export const getPOIbyCity = (city) => {
    const authToken = localStorage.getItem("authToken");
    const getPOIUrl = new URL(`${domain}/getpoi/${city}`);
   
    return fetch(getPOIUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get points of interest");
      }
      return response.json();
    });
  };

  export const loadTrip = () => {
    const authToken = localStorage.getItem("authToken");
    const listTripUrl = `${domain}/trips`;
    console.log("load trip");
    return fetch(listTripUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to load trip");
      }
   
      return response.json();
    });
  };

  export const deleteTrip = (tripId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteTripUrl = `${domain}/trips/${tripId}`;
    console.log("delete trip");
    return fetch(deleteTripUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to delete trip");
      }
    });
  };

  export const saveTrip = (data) => {
    const authToken = localStorage.getItem("authToken");
    const bookTripUrl = `${domain}/trips`;
    console.log("save trip");
    return fetch(bookTripUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to save trip");
      }
    });
  };

   
  