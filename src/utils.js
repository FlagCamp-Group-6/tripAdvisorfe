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
    const makeTripUrl = new URL(`${domain}/trip/add`);
    makeTripUrl.searchParams.append("name",date_time);
    makeTripUrl.searchParams.append("checkin",beg_date.format("YYYY-MM-DD"));
    makeTripUrl.searchParams.append("checkout",end_date.format("YYYY-MM-DD"));
    console.log(makeTripUrl);
    console.log("initialize trip");
    return fetch(makeTripUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to initialize trip");
      }   
    });
  };

  export const getNewestTripIDByUser = () => {
    const authToken = localStorage.getItem("authToken");
    const getTripUrl = `${domain}/trip/getUserNewest`;
    console.log("get newest trip id by user");
    console.log(getTripUrl);
    return fetch(getTripUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get user's newest trip id");
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
        throw Error("Fail to get trip by user");
      }   
      return response.json();
    });
  };

  export const getUpcomingTripByUser = () => {
    const authToken = localStorage.getItem("authToken");
    const getTripUrl = `${domain}/trip/getUpcoming`;
    console.log("get upcoming trip by user");
    console.log(getTripUrl);
    return fetch(getTripUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get upcoming trip by user");
      }   
      return response.json();
    });
  };

  export const getPastTripByUser = () => {
    const authToken = localStorage.getItem("authToken");
    const getTripUrl = `${domain}/trip/getPast`;
    console.log("get past trip by user");
    console.log(getTripUrl);
    return fetch(getTripUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get past trip by user");
      }   
      return response.json();
    });
  };

  export const getTripByID = (ID) => {
    const authToken = localStorage.getItem("authToken");
    const getTripUrl = new URL(`${domain}/trip/getById`);
    getTripUrl.searchParams.append("trip_id",ID);
    console.log("get trip by id");
    console.log(getTripUrl);
    return fetch(getTripUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get trip by id");
      }   
      return response.json();
    });
  };

  export const getPOIFromTrip = (ID) => {
    const authToken = localStorage.getItem("authToken");
    const getPOIUrl = new URL(`${domain}/trip/getAllPoiFromTrip`);
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

  export const getPlanFromTrip = (ID) => {
    const authToken = localStorage.getItem("authToken");
    const getPlanUrl = new URL(`${domain}/trip/getPlanFromTrip`);
    getPlanUrl.searchParams.append("trip_id",ID);
    console.log("get plan by trip id");
    console.log(getPlanUrl);
    return fetch(getPlanUrl, {
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
    const addPOIUrl = new URL(`${domain}/trip/addPoiToTrip`);
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
    });
  };

  export const delPOIFromTrip = (poi_id,trip_id) => {
    const authToken = localStorage.getItem("authToken");
    const delPOIUrl = new URL(`${domain}/trip/deletePoiFromTrip`);
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
        throw Error("Fail to delete POI");
      }   
    });
  };

  export const deleteTrip = (tripID) => {
    const authToken = localStorage.getItem("authToken");
    const delTripUrl = new URL(`${domain}/trip/delete`);
    delTripUrl.searchParams.append("trip_id",tripID);
    console.log("delete trip");
    console.log(delTripUrl);
    return fetch(delTripUrl, {
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

  export const saveTrip = (tripID,data) => {
    const authToken = localStorage.getItem("authToken");
    const saveTripUrl = new URL(`${domain}/trip/save`);
    saveTripUrl.searchParams.append("trip_id",tripID);
    saveTripUrl.searchParams.append("plan",data);
    console.log("save trip");
    console.log(saveTripUrl);
    return fetch(saveTripUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to save trip");
      }
    });
  };



