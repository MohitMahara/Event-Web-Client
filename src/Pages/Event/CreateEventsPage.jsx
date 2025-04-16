import React, { useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import slugify  from "slugify";
import {nanoid} from "nanoid";
import toast from "react-hot-toast";


export const CreateEventsPage = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("10:00");
    const [category, setCategory] = useState("");
    const [venue, setVenue] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [description, setDescription] = useState("");
    const [imgPreview , setImgPreview] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");


    const generateSlug= () => {
      const slug = slugify(title, {lower: true});
      const id = nanoid(6);
      return `${slug}-${id}`;
    };


    const handleSubmit = async() =>{
        e.preventDefault();
        try {

          const slug = generateSlug();
            
        } catch (error) {
          if (error.response) {
            const status = error.response.status;
            const msg = error.response.data?.msg || 'Something went wrong';
      
            if (status === 400 || status === 404) {
              toast.error(msg); 
            } else {
              toast.error('Unexpected error. Please try again.');
            }
          } else {
            toast.error('Network error. Please check your connection.');
          }
        }
    }

    const handleImgUpload = (e) =>{
        const img = e.target.files[0];

        if(img){
        setImage(img);
        const imgUrl = URL.createObjectURL(img);
        setImgPreview(imgUrl);  
        }
    }

  return (
    <>
      <Layout>
        
        <div className="max-w-4xl mx-auto mt-4 bg-white py-4 px-8">
  
          <h2 className="text-3xl font-semibold text-center my-6">
            Organize an Event
          </h2> 

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              placeholder="Event Name"
              value={title}
              onChange={(e) => { setTitle(e.target.value)}}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => { setDate(e.target.value)}}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => { setTime(e.target.value)}}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Cultural">Cultural</option>
              <option value="Educational">Educational</option>
              <option value="Gaming">Gaming</option>
              <option value="Sports">Sports</option>
              <option value="Others">Others</option>
            </select>

            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            <input
              type="text"
              name="organizer"
              placeholder="Organizer"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
              rows="4"
              required
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={handleImgUpload}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />
            {imgPreview && <>
               <div className="w-full h-90 mb-4">
                 <img src={imgPreview} alt="event img" className="w-full h-full" />
               </div>
            
            </>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
            >
              Create Event
            </button>
          </form>
          </div>
      </Layout>
    </>
  );
};
