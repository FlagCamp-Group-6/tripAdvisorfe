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
 
  export const getPOIbyID = (ID) => {
    const authToken = localStorage.getItem("authToken");
    const searchPOIUrl = new URL(`${domain}/poi/id`);
    searchPOIUrl.searchParams.append("poi_id", ID);
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

  export const getPOIByName = (query) => {
    const authToken = localStorage.getItem("authToken");
    const searchPOIUrl = new URL(`${domain}/poi/search`);
    searchPOIUrl.searchParams.append("search_box", query.location);
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

  export const getPOIByCity = (city) => {
    const authToken = localStorage.getItem("authToken");
    // const getPOIUrl = new URL(`${domain}/getpoi/${city}`);
    const getPOIUrl = new URL(`${domain}/poi/all`);
    console.log(getPOIUrl);
    return fetch(getPOIUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      console.log(response);
      if (response.status !== 200) {
        throw Error("Fail to get points of interest");
      }
      return response.json();
    });
  };

  export const initTrip = (beg_date,end_date,date_time) => {
    const authToken = localStorage.getItem("authToken");
    const getTripUrl = new URL(`${domain}/trip/add`);
    getTripUrl.searchParams.append("name",date_time);
    getTripUrl.searchParams.append("checkin",beg_date.format("YYYY-MM-DD"));
    getTripUrl.searchParams.append("checkout",end_date.format("YYYY-MM-DD"));
    console.log(getTripUrl);
    console.log("initialize trip");
    return fetch(getTripUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        // "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to initialize trip");
      }   
      console.log(response);
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
    const getTripUrl = new URL(`${domain}/trip/build`);
    // getTripUrl.searchParams.append("home",home);
    getTripUrl.searchParams.append("lat", 34.098907);
    getTripUrl.searchParams.append("lon", -118.327759);
    getTripUrl.searchParams.append("start_date",beg_date.format("YYYY-MM-DD"));
    getTripUrl.searchParams.append("end_date",end_date.format("YYYY-MM-DD"));
    getTripUrl.searchParams.append("POIs",sel);
    console.log(getTripUrl);
    console.log("build trip");
    return fetch(getTripUrl, {
      method: "POST",
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

  export const getTripByUser = () => {
    const authToken = localStorage.getItem("authToken");
    const getTripUrl = `${domain}/trip/getByUser`;
    console.log("get trip by user");
    console.log(getTripUrl);
    return fetch(getTripUrl, {
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

  export const getTripByID = (ID) => {
    const authToken = localStorage.getItem("authToken");
    const getTripUrl = `${domain}/trip/getById`;
    getTripUrl.searchParams.append("trip_id",ID);
    console.log("get trip by id");
    console.log(getTripUrl);
    return fetch(getTripUrl, {
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

  export const getPOIFromTrip = (ID) => {
    const authToken = localStorage.getItem("authToken");
    const getPOIUrl = `${domain}/trip/getAllPoiFromTrip`;
    getPOIUrl.searchParams.append("trip_id",ID);
    console.log("get pois by trip id");
    console.log(getPOIUrl);
    return fetch(getPOIUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to load POIs");
      }   
      return response.json();
    });
  };

  export const addPOIToTrip = (poi_id,trip_id) => {
    const authToken = localStorage.getItem("authToken");
    const addPOIUrl = `${domain}/trip/getPoiToTrip`;
    addPOIUrl.searchParams.append("poi_id",poi_id);
    addPOIUrl.searchParams.append("trip_id",trip_id);
    console.log("add poi to trip");
    console.log(addPOIUrl);
    return fetch(addPOIUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to add POI");
      }   
      return response.json();
    });
  };

  export const delPOIFromTrip = (poi_id,trip_id) => {
    const authToken = localStorage.getItem("authToken");
    const delPOIUrl = `${domain}/trip/deletePoiFromTrip`;
    delPOIUrl.searchParams.append("poi_id",poi_id);
    delPOIUrl.searchParams.append("trip_id",trip_id);
    console.log("delete poi from trip");
    console.log(delPOIUrl);
    return fetch(delPOIUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to del POI");
      }   
      return response.json();
    });
  };

  export const deleteTrip = (tripID) => {
    const authToken = localStorage.getItem("authToken");
    const deleteTripUrl = `${domain}/trip/delete`;
    deleteTripUrl.searchParams.append("trip_id",tripID);
    console.log("delete trip");
    console.log(deleteTripUrl);
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
    const saveTripUrl = `${domain}/trip/add`;
    console.log("save trip");
    console.log(saveTripUrl);
    return fetch(saveTripUrl, {
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

   