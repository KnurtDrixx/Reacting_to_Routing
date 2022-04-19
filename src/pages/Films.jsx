import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Films = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [peopleFromFilms, setPeopleFromFilms] = useState([]);
  const [filmsFromPeople, setFilmsFromPeople] = useState([]);

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
    if (allPeople.length && allFilms.length) {
      const tempFilms = [];

      allFilms.forEach((film) => {
        const filmsPerson = [];
        film.people.forEach((person) => {
          const personID = person.slice(-36);
          allPeople.forEach((person) => {
            if (person.id === personID) {
              filmsPerson.push(person);
            }
          });
        });

        const tempFilm = {
          ...film,
          people: filmsPerson,
        };
        tempFilms.push(tempFilm);
        //console.log(tempFilm);
      });
      setFilmsFromPeople(tempFilms);
    }
  }, [allPeople, allFilms]);

  return (
    <div>
      <div>
        <h1>Studio Ghibli Films</h1>
        {filmsFromPeople.map((film) => (
          <div key={film.id}>
            <Link to={`/films/${film.id}`}>
              <p>{film.title}</p>
            </Link>
            <ul>
              {film.people.length > 0 ? (
                film.people.map((person) => (
                  <li key={film.id + "-" + person.id}>
                    <Link to={`/characters/${person.id}`}>{person.name}</Link>, age: {person.age}
                  </li>
                ))
              ) : (
                <p>No Characters Found</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Films;
