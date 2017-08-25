import React from 'react';
import ReactDOM from 'react-dom';
document.addEventListener('DOMContentLoaded', function(){
    class PicOfTheDay extends React.Component {
        constructor(props){
            super(props);
            this.state = {
              loading : true,
              title: '',
              explanation: '',
              date: '',
              copyright: '',
              img: '',
            }
        }

        componentDidMount() {
          fetch(`https://api.nasa.gov/planetary/apod?api_key=NMnY548zyrPfYSxvM1mATNzhwYbOqgEkFiwV422Z`)
          .then( r => r.json() )
          .then( ans => {
              console.log(ans);
              this.setState({
                title: ans.title,
                explanation: ans.explanation,
                date: ans.date,
                copyright: ans.copyright,
                img: ans.hdurl,
                loading : false,
              })
          });
        }

    render(){
    if (this.state.loading) {
        return  <div className="wait">
                    Please, wait a minute...
                </div>
    }
    return  <div>
              <h1>Astronomy Picture of the Day</h1>
              <p>{this.state.title}</p>
              <p>{this.state.date}</p>
              <div className="polaroid">
                <img src={this.state.img}></img>
                <div className="container">
                  <p>
                    {this.state.explanation}
                  </p>
                  <p>
                    Copyright: {this.state.copyright}
                  </p>
                </div>
              </div>
            </div>
    }
}



    class App extends React.Component{
        render(){
            return <PicOfTheDay/>
        }
    }

    ReactDOM.render(
        <App />,
        document.querySelector('#app')
    );
});
