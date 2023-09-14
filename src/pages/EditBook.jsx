import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const[publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
      setLoading(true);
      axios.get(`http://localhost:5000/api/${id}`)
      .then((response) => {
         setAuthor(response.data.author);
         setTitle(response.data.title);
         setPublishYear(response.data.publishYear);
         setLoading(false);
      })
      .catch((error) => {
         setLoading(false);
         alert("An error occured. please check the console")
         console.log(error.message);
      })
  }, [])
  const handleEditBook = () => {
     const data = {
        title,
        author,
        publishYear
     };
     setLoading(true);
     axios.put(`http://localhost:5000/api/${id}`, data)
     .then(() => {
        setLoading(false);
        alert('Book have been updated successfully');
        navigate('/');
     })
     .catch((error) => {
       setLoading(false);
       alert('An error occurred. Please check the console')
        console.log(error.message);
     })
  }
  return (

    <div className='p-4'>
        <BackButton />
        <h1 className="text-3xl my-4">Edit Book</h1>
        {
          loading ? <Spinner /> : ''
        }
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label htmlFor="" className="text-xl mr-4 text-gray-500">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label htmlFor="" className="text-xl mr-4 text-gray-500">Published Year</label>
                    <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <button className='p-2 bg-sky-300 m-8 text-white' onClick={handleEditBook}>Create Book</button>
        </div>
    </div>
  )
}

export default EditBook