import axios from '../../server';
import { useState, useEffect } from 'react';
import './StatsBtn.css';

const ByLanguageBtn = () => {
  const [languageData, setLanguageData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [languageCounts, setLanguageCounts] = useState({});

  useEffect(() => {
    axios.get(`/api/playlists`)
      .then(res => {
        const uniqueLanguage = [...new Set(res.data[0].map(item => item.language))];
        setLanguageData(uniqueLanguage);
        setMusicData(res.data[0]);
        
        // Count the occurrences of each language
        const counts = res.data[0].reduce((acc, item) => {
          const lang = item.language || "Language undefined";
          acc[lang] = (acc[lang] || 0) + 1;
          return acc;
        }, {});
        setLanguageCounts(counts);
      })
      .catch(err => { 
        console.error(err);
      });
  }, []);

  const handleLanguageBtn = (language) => {
    let filteredByLanguage = [];
    setSelectedLanguage(language);

    if (language === "Language undefined") {
      filteredByLanguage = musicData.filter(item => !item.language);
    } else if (language !== "All languages") {
      filteredByLanguage = musicData.filter(item => item.language === language);
    }

    const soungCounts = filteredByLanguage.reduce((counts, song) => {
      const key = `${song.artist} - ${song.track}`;
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {});

    const uniqueSongs = Array.from(new Set(filteredByLanguage.map(song => `${song.artist} - ${song.track}`)));
    const filteredWithCounts = uniqueSongs.map(songKey => {
      const [artistName, songName] = songKey.split(' - ');
      return {
        artist: artistName,
        track: songName,
        Count: soungCounts[songKey]
      };
    });

    if (language === "All languages") {
      // Show each unique language along with its count
      const allLanguagesData = languageData.map(language => ({
        artist: "",
        track: language || "Language undefined",
        Count: languageCounts[language || "Language undefined"] || 0
      }));

      const sortedLanguagesData = allLanguagesData.sort((a, b) => b.Count - a.Count)
      setFilteredData(sortedLanguagesData);
    } else {
      setFilteredData(filteredWithCounts);
    }
  };

  return (
    <div className='languages-container'>
      <div className='languages-btn-container'>
        <button onClick={() => handleLanguageBtn("All languages")}>
          All languages
        </button>
        {languageData && languageData.map((language) => 
          <button key={language} onClick={() => handleLanguageBtn(language)}>
            {language || "Language undefined"}
          </button>
        )}
      </div>

      <div className='languages-btn-results'>
        <ul className="songs-list">
          {selectedLanguage && filteredData && filteredData.map(song => (
            <li key={song.id}>
              {song.artist ?  `${song.artist} - ${song.track}` : `${song.track}`} &nbsp; 
              
              {song.artist ? <span className='song-count'>
                {song.Count === 1 ? 'Appears 1 time' : `Appears ${song.Count} times`}
              </span> : <span className='song-count'>- {song.Count} songs</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ByLanguageBtn;
