import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../element/logo3.jpg";
import pdf from "../element/pdf.jpg";
import moment from "moment";

export default function History() {
  const [patients, setPatients] = useState([]);
  const [Load, setLoad] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") === null) {
      navigate("/", { replace: true });
      toast.info("Not Allowed To Access");
    } else {
      fetchData();
    }
  }, [navigate]);

  const openModal = (name, email, contact, patient_id) => {
    setShowModal(true);
    fetch(
      `https://arpanhospital.online/userdata_by_id.php?patient_id=${patient_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setAppointment(data.appointment.pdf_files);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching the appointment");
      });
  };

  const fetchData = async (searchTerm) => {
    try {
      setLoad(true);
      setPatients("");

      // Construct the request body as JSON
      const requestBody = {
        method: "POST",
        body: JSON.stringify({ search: searchTerm }), // Pass search term as JSON
      };

      // Make the fetch request with the appropriate URL and request body
      const response = await fetch(
        "https://arpanhospital.online/all_user.php",
        requestBody
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the response JSON
      const jsonData = await response.json();

      // Update the state with the fetched data
      setPatients(jsonData);
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading to false after request completion
      setLoad(false);
    }
  };

  const handleImageClick = (url) => {
    window.open(url, "_blank").focus();
  };

  const extractDate = (filename) => {
    const pattern = /\d{4}-\d{2}-\d{2}/;
    const match = filename.match(pattern);
    return match ? match[0] : null;
  };

  const openPdfInNewTab = (fileName) => {
    const pdfUrl = `https://arpanhospital.online/${fileName}`;
    window.open(pdfUrl, "_blank").focus();
  };

  const closeModal = () => {
    setShowModal(false);
    setAppointment("");
  };
  return (
    <>
      <div className="max-h-screen h-screen bg-slate-200 flex flex-col items-center">
        <div className="h-auto w-full sticky top-0 ">
          <Navbar onSearch={fetchData} />
        </div>
        <div className="h-full w-full px-4 overflow-auto">
          <div className="bg-white rounded-md w-full h-full overflow-auto shadow-md shadow-black">
            {Load ? (
              <>
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    className="h-16 rounded-lg animate-spin"
                    src={logo}
                    alt="Logo"
                  />
                </div>
              </>
            ) : (
              <>
                <table className="w-full h-auto  table-auto border-collapse border bg-cover font-serif">
                  <thead className="-">
                    <tr className="bg-cyan-950 ">
                      <th className="px-2 py-2 text-center text-xs font-large text-white uppercase tracking-wider">
                        NO
                      </th>
                      <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                        IMAGE
                      </th>
                      <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                        NAME
                      </th>
                      <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                        CONTACT
                      </th>
                      <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                        VIEW
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length > 0 ? (
                      patients.map((item, index) => (
                        <React.Fragment key={item.patient_id}>
                          <tr className="bg-white text-center">
                            <td className="px-2 py-2 text-center whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-2 py-1 items-center flex flex-row justify-center  uppercase whitespace-nowrap">
                              {item.image == null ? (
                                <>
                                  <span className="text-4xl font-bold bg-cyan-900 text-white w-16 h-16 rounded-full items-center text-center flex justify-center">
                                    {item.name.charAt(0)}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <img
                                    className="w-16 h-16 rounded-full object-cover cursor-pointer"
                                    src={`https://arpanhospital.online/${item.image}`}
                                    alt={item.name.charAt(0)}
                                    onClick={() => {
                                      handleImageClick(
                                        `https://arpanhospital.online/${item.image}`
                                      );
                                    }}
                                  />
                                </>
                              )}
                            </td>
                            <td className="px-2 py-2 text-center uppercase whitespace-nowrap">
                              {item.name}
                            </td>
                            <td className="px-2 py-2 text-center whitespace-nowrap font-sans ">
                              {item.contact}
                            </td>
                            <td className="px-4 py-2">
                              <button
                                className="bg-cyan-950 p-2 md:p-3 content-center cursor-pointer text-white rounded-md font-serif"
                                onClick={() =>
                                  openModal(
                                    item.name,
                                    item.email,
                                    item.contact,
                                    item.patient_id
                                  )
                                }
                              >
                                VIEW
                              </button>
                            </td>
                          </tr>
                          {index !== patients.length - 1 && (
                            <tr className="border-b">
                              <td colSpan="5" className="px-0 py-0"></td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="12"
                          className="px-4 py-2 text-center uppercase font-serif"
                        >
                          No patient found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
        {showModal && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70">
            <div className="w-3/4 h-3/4 bg-white p-4 rounded shadow-lg flex flex-col ">
              <div className="flex flex-row justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-4 font-serif text-bold text-red-700">
                    REPORT DETAILS
                  </h2>
                </div>
                <div>
                  <button
                    className="text-gray-400 hover:text-gray-700"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full h-full grid grid-flow-row grid-cols-4 rounded-sm bg-slate-200 overflow-auto">
                <div className="w-full flex flex-col gap-2 p-2 border-r-2 border-black">
                  <div className="w-full text-center bg-cyan-950 text-white p-2 rounded-md sticky top-0">
                    <h1>PHYSIOTHERAPY</h1>
                  </div>
                  <div className="h-full overflow-auto flex flex-col gap-2">
                    {appointment &&
                    appointment.pdf_file_1 &&
                    appointment.pdf_file_1.length > 0 ? (
                      appointment.pdf_file_1.map((fileName, index) => {
                        const extractedDate = extractDate(fileName);
                        return (
                          <div
                            className="w-full inline-flex gap-1 items-center justify-center border-2 rounded-md p-2 bg-white shadow-md font-sans font-bold text-center"
                            key={index}
                            onClick={() => openPdfInNewTab(fileName)}
                          >
                            <img
                              className="w-5 rounded-sm h-5"
                              src={pdf}
                              alt="PDF Icon"
                            />
                            <h1 className="cursor-pointer">
                              {extractedDate
                                ? moment(extractedDate).format("DD-MM-YYYY")
                                : "No date found"}
                            </h1>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center h-full font-serif">
                        NO REPORT FOUND
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2 p-2 border-r-2 border-black">
                  <div className="w-full text-center bg-cyan-950  text-white p-2 rounded-md sticky top-0">
                    <h1>FITNESS</h1>
                  </div>
                  <div className="h-full overflow-auto w-full flex flex-col gap-2 ">
                    {appointment && appointment?.pdf_file_2?.length > 0 ? (
                      appointment?.pdf_file_2.map((fileName, index) => {
                        const extractedDate = extractDate(fileName);
                        return (
                          <div
                            className="w-full inline-flex gap-1 items-center justify-center border-2 rounded-md p-2 bg-white shadow-md font-sans font-bold text-center"
                            key={index}
                            onClick={() => openPdfInNewTab(fileName)}
                          >
                            <img
                              className="w-5 rounded-sm h-5"
                              src={pdf}
                              alt=""
                              srcset=""
                            />
                            <h1 className="cursor-pointer">
                              {extractedDate
                                ? moment(extractedDate).format("DD-MM-YYYY")
                                : "No date found"}
                            </h1>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center h-full font-serif">
                        NO REPORT FOUND
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2 p-2 border-r-2 border-black">
                  <div className="w-full text-center bg-cyan-950  text-white p-2 rounded-md sticky top-0 ">
                    <h1>WEIGHT LOSS</h1>
                  </div>
                  <div className="h-full overflow-auto w-full flex flex-col gap-2 ">
                    {appointment && appointment?.pdf_file_3?.length > 0 ? (
                      appointment?.pdf_file_3.map((fileName, index) => {
                        const extractedDate = extractDate(fileName);
                        return (
                          <div
                            className="w-full inline-flex gap-1 items-center justify-center border-2 rounded-md p-2 bg-white shadow-md font-sans font-bold text-center"
                            key={index}
                            onClick={() => openPdfInNewTab(fileName)}
                          >
                            <img
                              className="w-5 rounded-sm h-5"
                              src={pdf}
                              alt=""
                              srcset=""
                            />
                            <h1 className="cursor-pointer">
                              {extractedDate
                                ? moment(extractedDate).format("DD-MM-YYYY")
                                : "No date found"}
                            </h1>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center h-full font-serif">
                        NO REPORT FOUND
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2 p-2">
                  <div className="w-full text-center bg-cyan-950  text-white p-2 rounded-md sticky top-0 ">
                    <h1>PAIN MANAGEMENT</h1>
                  </div>
                  <div className="h-full overflow-auto w-full flex flex-col gap-2 ">
                    {appointment && appointment?.pdf_file_4?.length > 0 ? (
                      appointment?.pdf_file_4.map((fileName, index) => {
                        const extractedDate = extractDate(fileName);
                        return (
                          <div
                            className="w-full inline-flex gap-1 items-center justify-center border-2 rounded-md p-2 bg-white shadow-md font-sans font-bold text-center"
                            key={index}
                            onClick={() => openPdfInNewTab(fileName)}
                          >
                            <img
                              className="w-5 rounded-sm h-5"
                              src={pdf}
                              alt=""
                              srcset=""
                            />
                            <h1 className="cursor-pointer">
                              {extractedDate
                                ? moment(extractedDate).format("DD-MM-YYYY")
                                : "No date found"}
                            </h1>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center h-full font-serif">
                        NO REPORT FOUND
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      <div className="bg-slate-200 flex flex-row font-serif font-thin items-center justify-center w-full p-3">
  <p>© 2024 . Arpan Advanced Physiotherapy & Fitness Center. Devloped By <Link to="https://codzcartinfotech.com/" className="text-blue-800">
    Codzcart Infotech
        </Link></p>
</div>
      </div>
    </>
  );
}
