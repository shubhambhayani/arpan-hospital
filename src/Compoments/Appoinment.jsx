import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import logo from "../element/logo3.jpg";
import { MdOutlineStar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Appoinment() {
  const [appointments, setAppointments] = useState([]);
  const [chartData, setChartData] = useState({});
  const [videos, setVideos] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [load1, setLoad1] = useState(false);
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages1, setSelectedImages_1] = useState([]);
  const [link, setLink] = useState("");
  const [event_name, setEvent_name] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      navigate("/", { replace: true });
      toast.info("Not Allowed To Access");
    } else {
      fetchRatings();
      fetchVideos();
      fetchEvent();
      fetchCarousel();
    }
  }, [navigate]);

  const fetchData = async () => {
    const formData = new FormData();
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);

    try {
      const response = await fetch(
        "https://arpanhospital.online/chart1.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setAppointments(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (appointments && appointments.length > 0) {
      const categories = [
        ...new Set(appointments.map((item) => item.category)),
      ];
      const genders = [...new Set(appointments.map((item) => item.gender))];
      const statuses = [...new Set(appointments.map((item) => item.status))];

      const groupedData = {};
      categories.forEach((category) => {
        groupedData[category] = {};
        genders.forEach((gender) => {
          groupedData[category][gender] = {};
          statuses.forEach((status) => {
            const appointment = appointments.find(
              (item) =>
                item.category === category &&
                item.gender === gender &&
                item.status === status
            );
            groupedData[category][gender][status] = appointment
              ? appointment.count
              : 0;
          });
        });
      });

      const datasets = [];
      genders.forEach((gender) => {
        statuses.forEach((status) => {
          const data = categories.map(
            (category) => groupedData[category][gender][status]
          );
          datasets.push({
            label: `Gender: ${gender}, Status: ${
              status === 0 ? "Not Visited" : "Visited"
            }`,
            data: data,
            backgroundColor:
              status === 0
                ? gender === "male"
                  ? "rgba(255, 0, 0, 0.5)"
                  : "rgba(255, 99, 132, 0.5)"
                : gender === "male"
                ? "rgba(0, 255, 0, 0.5)"
                : "rgba(54, 162, 235, 0.5)",
          });
        });
      });

      setChartData({
        labels: categories,
        datasets: datasets,
      });
    }
  }, [appointments]);

  const options = {
    animation: {
      duration: 3000,
      easing: "easeOutBounce",
      animateScale: true,
      animateRotate: true,
    },
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch(
        "https://arpanhospital.online/show_rating.php"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ratings");
      }
      const data = await response.json();
      setRatings(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  console.log(ratings);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://arpanhospital.online/delete_rating.php?id=${id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchRatings();
      }
    } catch (error) {
      console.error("Error deleting rating:", error.message);
      console.error(error.message);
    }
  };

  const handleDelete1 = async (id) => {
    try {
      const response = await fetch(
        `https://arpanhospital.online/delete_video.php?id=${id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchVideos();
      }
    } catch (error) {
      console.error("Error deleting rating:", error.message);
      console.error(error.message);
    }
  };

  const handleDelete2 = async (id) => {
    try {
      const response = await fetch(
        `https://arpanhospital.online/delete_event.php?id=${id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchEvent();
      }
    } catch (error) {
      console.error("Error deleting rating:", error.message);
      console.error(error.message);
    }
  };

  function filterUrl(url) {
    const baseUrl = url.split('&')[0];
    return baseUrl;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredLink = filterUrl(link);
    const formData = new FormData();
    formData.append("link",filteredLink);
    try {
      const response = await fetch(
        "https://arpanhospital.online/upload_video.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to insert video");
      }

      const data = await response.json();
      toast.success(data.message);
      setLink("");
      fetchVideos();
    } catch (error) {
      console.error("Error inserting video:", error.message);
      toast.error(error.message);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "https://arpanhospital.online/show_video.php"
      );
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        "https://arpanhospital.online/show_event.php"
      );
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleFileChange = (event) => {

    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagesArray.push({ url: e.target.result, file: files[i] });
        if (imagesArray.length === files.length) {
          setSelectedImages(imagesArray);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleSubmit1 = async (event) => {
    setLoad(true);
    event.preventDefault();

    const formData = new FormData();
    formData.append("event_name", event_name); // Assuming you have a state variable 'eventName' containing the event name
    selectedImages.forEach((image) => {
      formData.append("images[]", image.file); // Assuming 'selectedImages' is an array of objects containing both URL and file
    });
    try {
      const response = await fetch(
        "https://arpanhospital.online/upload_event_image.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      toast.success(data.message);
      setSelectedImages([]);
      setEvent_name("");
      event.target.reset();
      fetchEvent();
      setLoad(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchCarousel = async () => {
    try {
      const response = await fetch(
        "https://arpanhospital.online/show_carousel.php"
      );
      const data = await response.json();
      if (data && data.appointment && Array.isArray(data.appointment.photos)) {
        setSelectedImages_1(data.appointment.photos);
      } else {
        setSelectedImages_1([]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSubmit2 = async (event) => {
    setLoad1(true);
    event.preventDefault();

    const formDataObject = new FormData();
    selectedImages1.forEach((image, index) => {
      if (typeof image === "string") {
        formDataObject.append("images[]", image);
      } else {
        formDataObject.append("images[]", image.file);
      }
    });
    try {
      const response = await fetch(
        "https://arpanhospital.online/upload_carousel.php",
        {
          method: "POST",
          body: formDataObject,
        }
      );
      const data = await response.json();
      toast.success(data.message);
      setSelectedImages_1([]);
      event.target.reset();
      fetchCarousel();
      setLoad1(false);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };



  const handleFileChange_1 = (e) => {
    if (!e.target.files) {
      return; // Exit early if no files are selected
    }
    console.log(e.target.files);
    
  
    const files = Array.from(e.target.files);
  
    const newImages = files.map((file) => ({
      src: URL.createObjectURL(file),
      file,
    }));
    setSelectedImages_1((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage_1 = (index) => {
    console.log("prevImages before removal:", selectedImages1);
    setSelectedImages_1((prevImages) => {
      console.log("prevImages inside setter:", prevImages);
      return [
        ...prevImages.slice(0, index),
        ...prevImages.slice(index + 1),
      ];
    });
  };
  const handleImageClick = (url) => {
    window.open(url, "_blank").focus();
  };
  return (
    <>
      <div className="bg-slate-200 sticky top-0">
        <Navbar />
      </div>
      <div className="bg-slate-200 p-2 grid grid-flow-row grid-cols-2 gap-2 w-full lg:h-[450px] md:[900px] overflow-auto">
        <div className="bg-white md:col-span-2 lg:col-span-1 p-4 rounded-md ">
          <div className="grid grid-grid-row lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 items-center">
            <div>
              <input
                className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate}
                required
              />
            </div>
            <div>
              <input
                className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                required
              />
            </div>
            <div>
              <button
                className="px-2 py-2 bg-cyan-900 text-center text-white w-full uppercase font-serif shadow-md rounded-md"
                type="submit"
                onClick={fetchData}
              >
                Find
              </button>
            </div>
          </div>
          {chartData.labels && chartData.datasets ? (
            <div className="mt-10">
              <Bar data={chartData} options={options} />
            </div>
          ) : (
            <p className="w-full text-center font-serif mt-10">
              NOT TO DISPLAY
            </p>
          )}
        </div>
        <div className="bg-white md:col-span-2 lg:col-span-1 p-4 rounded-md  overflow-auto">
          <h1 className="text-cyan-900 font-serif">RATING</h1>
          <table className="w-full  border-collapse border  text-center">
                <thead>
                  <tr className="w-full bg-cyan-950 text-center text-xs font-large text-white ">
                    <th className="px-4 py-2 tracking-wider">NO</th>
                    <th  className="px-4 py-2 tracking-wider">NAME</th>
                    <th className="px-4 py-2 tracking-wider w-auto">STAR</th>
                    <th className="px-4 py-2 tracking-wider">DESCRIPTION</th>
                    <th className="px-4 py-2 tracking-wider">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.length > 0 ? (
                    ratings.map((rating, index) => (
                      <tr
                        className="font-serif uppercase text-xs font-bold"
                        key={index}
                      >
                        <td className="px-4 py-2 text-center">{index + 1}</td>
                        <td className="px-4 py-2 text-center">{rating.name}</td>
                        <td className="px-2 py-2 text-center w-auto">
                          {Array.from(
                            { length: Math.min(rating.stars, 5) },
                            (_, index) => (
                              <MdOutlineStar
                                className="inline-flex text-yellow-500"
                                key={index}
                              />
                            )
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {rating.description}
                        </td>
                        <td className="px-4 py-2 text-center flex justify-center items-center">
                          <MdDelete
                            className="font-bold text-xl text-red-600 cursor-pointer"
                            onClick={() => handleDelete(rating.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-2 text-center font-serif uppercase"
                      >
                        No ratings found
                      </td>
                    </tr>
                  )}
                </tbody>
          </table>
        </div>
      </div>
      <div className="bg-slate-200 px-2 grid grid-flow-row grid-cols-2 gap-2 w-full lg:h-[450px] md:[900px] overflow-auto">
        <div className=" md:col-span-2 lg:col-span-1 flex flex-col gap-2 bg-white p-2 rounded-md h-full w-full">
          <div className="border-2 border-dashed border-black p-2 rounded-md">
            <h1 className="text-cyan-900 font-serif">VIDEO UPLOAD</h1>
            <form onSubmit={handleSubmit}>
              <div className="inline-flex gap-2 items-center w-full">
                <div>
                  <FaYoutube className="text-red-600 w-12 h-12" />
                </div>
                <div className="w-full">
                  <textarea
                    className="w-full p-2 rounded-md text-cyan-950 font-medium shadow-md shadow-slate-950 text-sm font-serif uppercase h-10 bg-slate-200"
                    placeholder="PASTE A YOU TUBE VIDEO LINK"
                    id="link"
                    name="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex flex-row justify-end">
                <button
                  className="bg-cyan-950 text-white font-serif px-2 py-2 rounded-md"
                  type="submit"
                >
                  UPLOAD
                </button>
              </div>
            </form>
          </div>
          <div className="h-full w-full overflow-auto">
            <table className="w-full border-collapse border text-center">
              <thead>
                <tr className="w-full bg-cyan-950 text-center text-xs font-large text-white">
                  <th className="px-4 py-2 tracking-wider">NO</th>
                  <th className="px-4 py-2 tracking-wider">LINK</th>
                  <th className="px-4 py-2 tracking-wider">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {videos.length > 0 ? (
                  videos.map((video, index) => (
                    <tr
                      key={index}
                      className="font-serif uppercase text-xs font-bold"
                    >
                      <td className="px-4 py-2 text-center">{index + 1}</td>
                      <td className="px-4 py-2 text-center text-blue-800">
                        <Link
                          to={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {video.link}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <MdDelete
                          className="font-bold text-xl text-red-600 cursor-pointer"
                          onClick={() => handleDelete1(video.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-2 text-center font-serif uppercase"
                    >
                      No videos found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="  md:col-span-2 lg:col-span-1 flex flex-col gap-2  bg-white p-2 rounded-md h-full w-full">
          <div className="border-2 border-dashed border-black p-2 rounded-md h-[32%] overflow-auto">
            <h1 className="font-serif text-cyan-900 ">EVENT ADD</h1>
            {load ? (
              <>
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    className="animate-spin h-16"
                    src={logo}
                    alt=""
                    srcset=""
                  />
                </div>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit1} encType="multipart/form-data">
                  <div className="flex flex-row gap-2 w-full">
                    <div className="w-full">
                      <input
                        className="bg-slate-200 px-2 rounded-md py-2 text-center h-10  font-mono text-md uppercase w-full text-cyan-950"
                        type="text"
                        name="event_name"
                        id=""
                        placeholder="ENTER EVENT NAME"
                        value={event_name}
                        onChange={(e) => setEvent_name(e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full">
                      <input
                        className="w-full py-[5px] px-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        name="images[]"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                    <div className="">
                      <button
                        className="bg-cyan-950 text-white font-serif px-2 py-2 rounded-md"
                        type="submit"
                      >
                        UPLOAD
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
            <div className="grid grid-flow-row grid-cols-10 pt-1">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    margin: "5px",
                  }}
                >
                  <img
                   className="border-3 border-cyan-950 rounded-lg"
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "5px",
                    }}
                  />
                  <MdClose
                    style={{
                      position: "absolute",
                      top: "-5",
                      right: "-5",
                      cursor: "pointer",
                      background: "gray",
                      borderRadius: "50%",
                      padding: "3px",
                    }}
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="h-auto w-full overflow-auto">
            <table className="w-full border-collapse border text-center">
              <thead>
                <tr className="w-full bg-cyan-950 text-center text-xs font-large text-white">
                  <th className="px-4 py-2 tracking-wider">NO</th>
                  <th className="px-4 py-2 tracking-wider">EVENT_NAME</th>
                  <th className="px-4 py-2 tracking-wider">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <tr
                      key={index}
                      className="font-serif uppercase text-xs font-bold"
                    >
                      <td className="px-4 py-2 text-center">{index + 1}</td>
                      <td className="px-4 py-2 text-center text-blue-800">
                        {event.event_name}
                      </td>
                      <td className="px-4 py-2 text-center flex justify-center items-center">
                        <MdDelete
                          className="font-bold text-xl text-red-600 cursor-pointer"
                          onClick={() => handleDelete2(event.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-2 text-center font-serif uppercase"
                    >
                      No Event found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 px-2 grid grid-flow-row grid-cols-2 gap-2 pt-2 w-full lg:h-[450px] md:[900px] overflow-auto">
        <div className="col-span-2 flex flex-col gap-2 bg-white px-2 p-2 rounded-md h-full w-full">
          {load1?(<>
            <div className="w-full h-full flex justify-center items-center">
                  <img
                    className="animate-spin h-16"
                    src={logo}
                    alt=""
                    srcset=""
                  />
              </div>
          </>):(<>
          <div className="p-2 border-2 border-dashed rounded-md border-black h-full">
            <h1 className="text-center uppercase font-serif text-cyan-950">
              manage carousel
            </h1>
            <div className=" flex flex-col gap-2 w-full">
              <div className="text-left text-sm font-medium text-gray-500 uppercase  tracking-wider">
                <p>IMAGE</p>
              </div>
              <div className="pt-1">
                <form onSubmit={handleSubmit2} enctype="multipart/form-data">
                  <div className="flex flex-row gap-4 w-full">
                  <div>
                    <input
                      className="w-full py-[5px] px-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      name="images[]"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange_1}
                    />
                  </div>
                  <div>
                    <button  className="bg-cyan-950 text-white font-serif px-2 py-2 rounded-md" type="submit">UPLOAD</button>
                  </div>
                  </div>
                </form>
              </div>
              <div className="grid grid-flow-row grid-cols-8 w-full">
                {selectedImages1 && selectedImages1.length > 0 &&selectedImages1.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        margin: "5px",
                      }}
                    >
                      <img
                      className="border-3 border-cyan-950 rounded-lg"
                       src={image.src || `https://arpanhospital.online/${image}`}
                        alt={`Image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(typeof image === "string" ? `https://arpanhospital.online/${image}` : URL.createObjectURL(image.file))}
                      />
                      <MdClose
                        style={{
                          position: "absolute",
                          top: "-5",
                          right: "-5",
                          cursor: "pointer",
                          background: "gray",
                          borderRadius: "50%",
                          padding: "3px",
                        }}
                        onClick={() => handleRemoveImage_1(index)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          </>)}
        </div>
      </div>
      <div className="bg-slate-200 flex flex-row font-serif font-thin items-center justify-center w-full p-3">
  <p>© 2024 . Arpan Advanced Physiotherapy & Fitness Center. Devloped By <Link to="https://codzcartinfotech.com/" className="text-blue-800">
    Codzcart Infotech
        </Link></p>
</div>
    </>
  );
}
