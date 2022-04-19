import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [peopleFromFilms, setPeopleFromFilms] = useState([]);

  const getFilmData = async () => {
    try {
      // fetches data from the api
      const response1 = await fetch("https://ghibliapi.herokuapp.com/films"); // this is the fetch
      const filmsData = await response1.json(); // parses the response as JSON data to produce a JS object

      const response2 = await fetch("https://ghibliapi.herokuapp.com/people");
      const peopleData = await response2.json();

      //console.log(filmsData); // logs the people object
      setAllFilms(filmsData); // passes the people object to the people state, which is then sent to the People Component

      //console.log(peopleData);
      setAllPeople(peopleData);
    } catch (error) {
      console.log("womp womp"); // displays an error page if fetch is unsuccessful
    }
  };

  useEffect(() => {
    getFilmData();
  }, []);

  useEffect(() => {
    if (allFilms.length && allPeople.length) {
      const tempPeople = [];

      allPeople.forEach((person) => {
        const personFilms = [];
        person.films.forEach((film) => {
          const filmID = film.slice(-36);
          allFilms.forEach((film) => {
            if (film.id === filmID) {
              personFilms.push(film);
            }
          });
        });
        const tempPerson = {
          ...person,
          films: personFilms,
        };
        tempPeople.push(tempPerson);
        //console.log(tempPerson);
      });
      setPeopleFromFilms(tempPeople);
    }
  }, [allFilms, allPeople]);

  return (
    <div>
      <h1>Characters</h1>
      {peopleFromFilms.map((person) => (
        <div key={person.id}>
          <Link to={`/characters/${person.id}`}>
            <p>{person.name}</p>
          </Link>
          <ul>
            {person.films.map((film) => (
              <li key={person.id + "-" + film.id}>
                <Link to={`/films/${film.id}`}> {film.title}</Link>, released in {film.release_date}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Characters;
