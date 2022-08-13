const domain = "http://localhost:8080";

export const register = (credential) => {
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
 
  export const searchPOI = (query) => {
    const authToken = localStorage.getItem("authToken");
    const searchPOIUrl = new URL(`${domain}/search`);
    searchPOIUrl.searchParams.append("name", query.place_name);
   
    return fetch(searchPOIUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to search POI");
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

  export const getTrip = (home,beg_date,end_date,selected) => {
    const authToken = localStorage.getItem("authToken");
    let sel = [];
    for (let i=0;i<selected.length;i++) {
      sel[i]=selected[i].id;
    }
    console.log(sel);
    const getTripUrl = new URL(`${domain}/trips/`);
    // getTripUrl.searchParams.append("home",home);
    getTripUrl.searchParams.append("lat", 34.098907);
    getTripUrl.searchParams.append("lon", -118.327759);
    getTripUrl.searchParams.append("start_date",beg_date.format("YYYY-MM-DD"));
    getTripUrl.searchParams.append("end_date",end_date.format("YYYY-MM-DD"));
    getTripUrl.searchParams.append("POIs",sel);
    console.log(getTripUrl);
    console.log("build trip");
    return fetch(getTripUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to build trip");
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

  export const deleteTrip = (tripID) => {
    const authToken = localStorage.getItem("authToken");
    const deleteTripUrl = `${domain}/trips/${tripID}`;
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

   
  