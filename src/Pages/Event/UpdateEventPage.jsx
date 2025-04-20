import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export const UpdateEventsPage = () => {

    const {eventslug} = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [category, setCategory] = useState("");
    const [venue, setVenue] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [description, setDescription] = useState("");
    const [imgPreview , setImgPreview] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState(null);
    
 

    const getEventDetail = async() =>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/events/get-event/${eventslug}`);
            if(res.data.success){
                setEvent(res.data.event);
                const evt = res.data.event;
                setTitle(evt?.title);
                setDate(new Date(evt?.date).toISOString().split("T")[0]);
                setTime(evt?.time);
                setCategory(evt?.category);
                setVenue(evt?.venue);
                setOrganizer(evt?.organizer);
                setDescription(evt?.description);
                setContact(evt?.contact);
                setImgPreview(evt?.image);
            }
            else{
                toast.error(res.data.msg);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getEventDetail();
    },[])


    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {

          const formData = new FormData(); 

          formData.append("title", title);
          formData.append("date", date);
          formData.append("time", time);
          formData.append("category", category);
          formData.append("venue", venue);
          formData.append("organizer", organizer);
          formData.append("description", description);
          if(image != null) formData.append("image", image);
          formData.append("contact", contact);


          const res = await axios.put(`${import.meta.env.VITE_SERVER_API}/api/v1/events/update-event/${event?._id}`, formData);

          if(res.data.success){
            toast.success(res.data.msg);
            navigate("/");
          }
          else{
            toast.error(res.data.msg);
          }

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

    const handleFileUpload = (e) =>{
        const fileInput = e.target.files[0];
        const fileURL = URL.createObjectURL(fileInput);
        setImgPreview(fileURL);
        setImage(fileInput);
    }

  return (
    <>
      <Layout>
        
        <div className="max-w-4xl mx-auto mt-4 bg-white py-4 px-8">
  
          <h2 className="text-3xl font-semibold text-center my-6">
            Update Event
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
              className="w-full p-2 border border-gray-400 rounded"
              onChange={handleFileUpload}
            />
            {imgPreview && <>
               <div className="w-full h-90 mb-4">
                 <img src={imgPreview} alt="event img" className="w-full h-full" />
               </div>
            
            </>}

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500">
              Save Changes
            </button>
          </form>
          </div>
      </Layout>
    </>
  );
};
