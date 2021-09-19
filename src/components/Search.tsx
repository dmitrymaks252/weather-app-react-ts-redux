import React, { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlert } from "../store/actions/alertActions";
import { getWeather, setLoading } from "../store/actions/weatherActions";


type SearchProps = {
  title: string,
}

const Search: FC<SearchProps> = ({title}) => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === "") {
      return dispatch(setAlert("City is required!"));
    }

    dispatch(setLoading());
    dispatch(getWeather(city));
    setCity("");
  };
  return (
    <div className="hero is-black has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          <form className="py-5" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input has-text-centered mb-2"
              placeholder="Enter city name"
              style={{maxWidth: 300}}
              value={city}
              onChange={handleChange}
            />
            <button className="button is-link is-fullwidth" style={{maxWidth: 300, margin: "0 auto"}}>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;