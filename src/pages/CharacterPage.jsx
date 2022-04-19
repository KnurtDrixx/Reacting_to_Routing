import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CharacterPage = () => {
  const { characterid } = useParams();
  const [person, setPerson] = useState(null);
  const [allFilms, setAllFilms] = useState([]);
  const [personWithFilm, setPersonWithFilm] = useState(null);

  useEffect(() => {
    const getPersonData = async () => {
      try {
        const response1 = await fetch("https://ghibliapi.herokuapp.com/films"); // this is the fetch
        const filmsData = await response1.json(); // parses the response as JSON data to produce a JS object

        const response2 = await fetch("https://ghibliapi.herokuapp.com/people/" + characterid); //! fetch allfilms and then grab characters from single film
        const peopleData = await response2.json();

        setAllFilms(filmsData);
        setPerson(peopleData);
      } catch (error) {
        console.log(error);
      }
    };
    getPersonData();
  }, [characterid]);

  useEffect(() => {
    if (person && allFilms.length) {
      const tempFilms = [];

      person.films.forEach((film) => {
        const filmID = film.slice(-36);
        allFilms.forEach((film) => {
          if (film.id === filmID) {
            tempFilms.push(film);
          }
        });
      });
      const tempPerson = {
        ...person,
        films: tempFilms,
      };
      setPersonWithFilm(tempPerson);
    }
  }, [person, allFilms]);

  if (!personWithFilm) {
    return <div>Character Loading</div>;
  }

  return (
    <div key={personWithFilm.id}>
      <p>{personWithFilm.name}</p>

      <ul>
        {personWithFilm.films.map((film) => (
          <li key={personWithFilm.id + "-" + film.id}>
            <Link to={`/films/${film.id}`}> {film.title}</Link>, released in {film.release_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterPage;
