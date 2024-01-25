import { useEffect, useState} from 'react';

const Other = () => {
  const [quote, setQuote] = useState('');

  const getRandomQuote = async () => {
    try {
      const response = await fetch(
        'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
      );
      const data = await response.json();

      const formattedQuote = `${data.quoteText} - ${data.quoteAuthor}`;
      setQuote(formattedQuote);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  useEffect(() => {
    getRandomQuote();
    // Load the weather widget script dynamically
    const script = document.createElement('script');
    script.id = 'weatherwidget-io-js';
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);

    return () => {
      // Cleanup: remove the script when the component unmounts
      const existingScript = document.getElementById('weatherwidget-io-js');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className='adiv menu'>
      <details open>
        <summary>Listen to Music</summary>
        <div className='music-player'>
          <iframe
            title='Spotify Embed: Recommendation Playlist '
            src={`https://open.spotify.com/embed/playlist/7tOI3aAf4aqFLcH1LZonEh?utm_source=generator&theme=0`}
            width='100%'
            height='100%'
            style={{ minHeight: '360px' }}
            frameBorder='0'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          />
        </div>
      </details>
      <details>
        <summary>Check the Weather</summary>
        <div className='weatherwidget-io'>
          <a
            className='weatherwidget-io'
            href='https://forecast7.com/en/33d45n112d07/phoenix/?unit=us'
            data-label_1='PHOENIX'
            data-label_2='WEATHER'
            data-theme='original'
          >
            PHOENIX WEATHER
          </a>
        </div>
      </details>
      <details>
        <summary>Inspirational Quote</summary>
        <div>
          <button className='btn btn-secondary' onClick={getRandomQuote}>
            Get Random Quote
          </button>
          <p id='random_quote' style={{ margin: '25px' }}>
            {quote}
          </p>
        </div>
      </details>
      <details>
        <summary>Make a To-DO List</summary>
        <div>
          Ipsa nesciunt ducimus, quo quae labore error exercitationem assumenda
          reiciendis.
        </div>
      </details>
    </div>
  );
};

export default Other;
