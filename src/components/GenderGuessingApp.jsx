/* eslint-disable react/no-unknown-property */
import axios from "axios";
import { useState } from "react";
import "../style/GenderGuessingApp.css";
import GenderCard from "./GenderCard";
import Swal from "sweetalert2";

function GenderGuessingApp() {
  const [name, setName] = useState("");
  const [resultArray, setResultArray] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGuessGender = async (e) => {
    e.preventDefault();
    if (name.length > 0) {
      const names = name.split(",").map((item) => {
        return item.trim();
      });

      try {
        const URL = import.meta.env.VITE_API_URL;
        const results = await Promise.all(
          names.map(async (name) => {
            const response = await axios.get(`${URL}${name}`);
            return response.data;
          })
        );

        setResultArray(results);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error calling API",
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please input your name !",
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container">
      <h1>Gender Guessing ?</h1>
      <form onSubmit={handleGuessGender} className="input">
        <input
          type="text"
          placeholder="Guess the gender of your name"
          onChange={handleNameChange}
          className="textfield"
        />
        <button type="submit" className="btn fa-input">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Icon Frame">
              <path
                id="Vector (Stroke)"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 4.5C7.41015 4.5 4.5 7.41015 4.5 11C4.5 14.5899 7.41015 17.5 11 17.5C12.7953 17.5 14.4183 16.7741 15.5962 15.5962C16.7741 14.4183 17.5 12.7953 17.5 11C17.5 7.41015 14.5899 4.5 11 4.5ZM1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11C20.5 13.0814 19.8294 15.0079 18.6943 16.573L22.0607 19.9393C22.6464 20.5251 22.6464 21.4749 22.0607 22.0607C21.4749 22.6464 20.5251 22.6464 19.9393 22.0607L16.573 18.6943C15.0079 19.8294 13.0814 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11Z"
                fill="#78CBC9"
              />
            </g>
          </svg>
        </button>
      </form>
      <div className="enter-your-first-name-or-given-name-or-a-full-name">
        Enter your first name (or given name)
      </div>

      {resultArray.length > 0 && (
        <>
          {resultArray.map((result, index) => (
            <GenderCard key={index} result={result} />
          ))}
        </>
      )}
    </div>
  );
}

export default GenderGuessingApp;
