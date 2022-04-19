import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const FilmPage = () => {
  const { filmid } = useParams();
  const [film, setFilm] = useState(null);
  const [people, setPeople] = useState([]);
  const [filmWithPeople, setFilmWithPeople] = useState(null);

  useEffect(() => {
    const getFilmData = async () => {
      const response1 = await fetch("https://ghibliapi.herokuapp.com/films/" + filmid); // this is the fetch
      const filmsData = await response1.json(); // parses the response as JSON data to produce a JS object

      const response2 = await fetch("https://ghibliapi.herokuapp.com/people"); //! fetch allfilms and then grab characters from single film
      const peopleData = await response2.json();

      setFilm(filmsData);
      setPeople(peopleData);
    };
    getFilmData();
  }, [filmid]);

  useEffect(() => {
    if (film && people.length) {
      const filmPeople = [];

      film.people.forEach((person) => {
        const personID = person.slice(-36);
        people.forEach((person) => {
          if (person.id === personID) {
            filmPeople.push(person);
          }
        });
      });
      const tempFilm = {
        ...film,
        people: filmPeople,
      };
      setFilmWithPeople(tempFilm);
    }
  }, [film, people]);

  if (!filmWithPeople) {
    return <h1>film id {filmid}</h1>;
  } else {
    return (
      <>
        <h1>{filmWithPeople.title}</h1>
        <div>
          {filmWithPeople.people.map((person) => (
            <div key={`personID:${person.id}`}>
              <Link to={`/characters/${person.id}`}>{person.name}</Link>
            </div>
          ))}
        </div>
      </>
    );
  }
};
export default FilmPage;
