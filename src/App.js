import React, { Component} from 'react'
import './App.css'
import MovieRow from './MovieRow'
import $ from 'jquery'

import * as _ from 'underscore'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // const IMAGELINK1 = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ypX47SBSThTbB40AIJ22eOUCpjU.jpg'
    // const IMAGELINK2 = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'
    // const movies = [
    //   { id: 0, poster_src: IMAGELINK1, title: 'Averagers 1', overview: 'overview 1' },
    //   { id: 1, poster_src: IMAGELINK2, title: 'Averages 2', overview: 'overview 2' }
    // ]

    // this.state = {
    //   rows: [
    //     <Fragment>
    //       <p key='1'>This is my row</p>
    //       <p key='2'>This is my row</p>
    //       <p key='3'>This is my row</p>
    //     </Fragment>
    //   ]
    // }

    // var movieRows = []
    // movies.forEach((movie) => {
    //   const movieRow = <MovieRow movie={movie} />
    //   movieRows.push(movieRow)
    // })
    // this.state = { rows: movieRows }
  }

  performSearch(searchKeyword) {
    console.log('Perform search using moviedb')
    const urlString = `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&api_key=76b1778009433967006205f7187a9ed6`
    // We call this a dictionary of options
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        // console.log('Fetched data successfully')
        // console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path
          // console.log(movie.poster_path);
          const movieRow = <MovieRow key={movie.id} movie={movie} />
          movieRows.push(movieRow)
        })

        this.setState({ rows: movieRows })

      },
      error: (xhr, status, err) => {
        console.err('Failed to fetch data')
      }
    })
  }

  render() {
    return (
      <div>

        <table className='titleBar'>
          <tbody>
            <tr>
              <td>
                <img width='50' src="green_app_icon.svg" alt="" />
              </td>
              <td width='8' />
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: '99%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }}
          placeholder='Enter Search Term'
          type="text"
          onChange={(event) => {
            if (event.target.value)
              this.performSearch(event.target.value)
          }}
        />

        {this.state.rows}

      </div >
    );
  }
}

export default App;
