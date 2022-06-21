function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [color, setColor] = React.useState("#ffffff");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
      let randIndex = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randIndex]);
    }
    fetchData();
  }, []);

  const getNewQuote = () => {
    const colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857"
    ];

    let randIndex = Math.floor(Math.random() * quotes.length);
    let randColorIndex = Math.floor(Math.random() * colors.length);
    setRandomQuote(quotes[randIndex]);
    setColor(colors[randColorIndex]);
  };

  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="jumbotron">
          <div className="card" id="wrapper">
            <div className="card-header">Inspirational Quotes</div>
            <div className="card-body" id="quote-box">
              {randomQuote ? (
                <>
                  <div id="author">
                    <h5 className="card-title">
                      - {randomQuote.author || "No author"}
                    </h5>
                  </div>
                  <div id="text">
                    <p className="card-text">&quot;{randomQuote.text}&quot;</p>
                  </div>
                </>
              ) : (
                <h2>Loading</h2>
              )}

              <div className="row">
                <div id="new-quote">
                  <button
                    onClick={getNewQuote}
                    className="btn btn-primary ml-3"
                  >
                    New Quote
                  </button>
                  <a
                    id="tweet-quote"
                    href={
                      "https://twitter.com/intent/tweet?hashtags=tweet-quote&related=freecodecamp&text=" +
                      encodeURIComponent(
                        '"' + randomQuote.text + '" ' + randomQuote.author
                      )
                    }
                    target="_blank"
                    className="btn btn-warning"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    href={
                      "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                      encodeURIComponent(randomQuote.author) +
                      "&content=" +
                      encodeURIComponent(randomQuote.text) +
                      "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                    }
                    className="btn btn-danger"
                    target="_blank"
                  >
                    <i className="fa fa-tumblr"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {quotes.map(quote => <div>{quote.text} by {quote.author}</div>)} */}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
