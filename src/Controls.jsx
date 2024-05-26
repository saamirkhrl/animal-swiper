import React, { useState, useEffect } from 'react';
import './index.css';

function Controls() {
  const dogApiUrl = "https://dog.ceo/api/breeds/image/random";
  const catApiUrl = "https://api.thecatapi.com/v1/images/search";
  
  const [pictureUrl, setPictureUrl] = useState("");
  const [animalType, setAnimalType] = useState('both');
  const [nextPictureUrl, setNextPictureUrl] = useState("");
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    fetchImage().then(url => setPictureUrl(url));
  }, []);

  const fetchImage = () => {
    let apiUrl;
    if (animalType === 'dog') {
      apiUrl = dogApiUrl;
    } else if (animalType === 'cat') {
      apiUrl = catApiUrl;
    } else {
      apiUrl = Math.random() > 0.5 ? dogApiUrl : catApiUrl;
    }

    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => apiUrl === dogApiUrl ? data.message : data[0].url)
      .catch(error => console.error('Error fetching image:', error));
  };

  const next = () => {
    setAnimateOut(true);
    fetchImage().then(url => {
      setNextPictureUrl(url);
      setTimeout(() => {
        setPictureUrl(url);
        setNextPictureUrl("");
        setAnimateOut(false);
      }, 500);
    });
  };

  return (
    <div className="container">
      <h2 className="animal-tinder-name">Animal Tinder</h2>
      <div className="buttons">
        <button className="btn yes" onClick={next}>👍</button>
        <button className="btn no" onClick={next}>👎</button>
      </div>
      <div className="image-container">
        <img className={`picture ${animateOut ? 'animate-out' : ''}`} src={pictureUrl} alt="Animal" />
        {nextPictureUrl && <img className={`picture next ${!animateOut ? 'animate-in' : ''}`} src={nextPictureUrl} alt="Animal" />}
      </div>
      <div className="options">
        <label>
          <input type="radio" value="dog" checked={animalType === 'dog'} onChange={() => setAnimalType('dog')} />
          Dog
        </label>
        <label>
          <input type="radio" value="cat" checked={animalType === 'cat'} onChange={() => setAnimalType('cat')} />
          Cat
        </label>
        <label>
          <input type="radio" value="both" checked={animalType === 'both'} onChange={() => setAnimalType('both')} />
          Both
        </label>
        <h2>Made by Samir K</h2>
      </div>
    </div>
  );
}

export default Controls;
