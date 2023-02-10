import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

// axios allows us to make api request->we're going to make api reqeust to our own api =taht's why we're using axios

 
function App() {
  //we creating states, so we can get whatever we're writng
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');


  //with useEffect we can render our page whenever we click the submitbutton =submitreview
  useEffect(() => {
    //getting data
    Axios.get("http://localhost:3000/api/get").then((response)=> {
      setMovieList(response.data);
    })
  }, [])

 
  const submitReview = () =>  {
    //we're making post request on axios sending whatever information we have currently for our movie&review -> into our back-end
    //so now wenerver we adding smth into our DB we're also setting movieList with the same movielist that's gonna show on the fornend 
    Axios.post("http://localhost:3000/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
  
    setMovieList([
      ...movieReviewList, 
      {movieName: movieName, movieReview: review},
    ]);
    //whenever we make post request to this http://localhost:3000/api/insert  backend url, 
   //we're sending objest(movieName,movieObject) to DB, and we want to grab that in the back end
  };

  //delete movie by movie Name
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3000/api/delete/${movie}`);
  }


  //updateing data
  const updateReview = (movie) => {
    Axios.put("http://localhost:3000/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

   
  return (
    <div className="App">
      <h1>CRUD Application</h1>

      <div className='form'>
      <label>Movie Name:</label>
      <input type="text" name="movieName" onChange={(event) => {
        setMovieName(event.target.value);
      }}/>
      <label>Review:</label>
      <input type="text" name="review" onChange={(event) => {
        setReview(event.target.value);
      }}/>
      
      <button onClick={submitReview}>Submit</button>
      
      {movieReviewList.map((val)=> {
        return (
          <div className='card'> 
          <h1>{val.movieName}</h1>
          <p>{val.movieReview}</p>

          <button onClick={() => {
            deleteReview(val.movieName);
            }}>Delete</button>

          <input 
          type="text" 
          id="updateInput" 
          onChange={(event) => {
            setNewReview(event.target.value);
          }} />

          <button onClick={() => {
            updateReview(val.movieName);
            }}> Update</button>
          </div>
        ); 
        })};
      

      </div>
    </div>
  );
}

export default App;
