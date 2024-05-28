import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "tailwindcss/tailwind.css";
import { FaUsers } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as chartjs } from "chart.js/auto";
import logo from "../element/logo3.jpg";
import { FaUserDoctor } from "react-icons/fa6";
import axios from "axios";
import moment from "moment";
import { MdClose } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import image4 from "../element/fitness.jpeg";
import physiotherapy from "../element/phy.jpeg";
import image2 from "../element/Weight Loss Icon.jpeg";
import pain_managment from "../element/pain.jpeg";
import jsPDF from 'jspdf';



export default function Dashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [count, setCounts] = useState([]);
  const [count1, setCounts1] = useState([]);
  const [Load, setLoad] = useState(false);
  const [Load1, setLoad1] = useState(false);
  const [Load2, setLoad2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [button, setButton] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(" ");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState({
    patient_id: "",
    appointment_id: "",
    name: "",
    age: "",
    gender: "",
    appointment_date:"",
    appointment_time:""
  });

  const images = {
    physiotherapy: physiotherapy,
    weight_loss: image2,
    pain_management: pain_managment,
    fitness: image4,
  };

  const getImageForCategory = (category) => {
    return images[category];
  };

  const [formData_1, setFormData_1] = useState({
    acidity: "",
    address: "",
    contact: "",
    cyc: "",
    cyc_how: "",
    cyc_when: "",
    d_time: "",
    d_what: "",
    dada: "",
    dada_how: "",
    dada_when: "",
    dia: "",
    dob: "",
    fact_loss: "",
    fact_loss_2: "",
    fitness: "",
    gender: "",
    health: "",
    blood: "",
    heart: "",
    kabajiyat: "",
    l_time: "",
    l_what: "",
    m_time: "",
    m_what: "",
    machine: "",
    machine_how: "",
    machine_when: "",
    name: "",
    o: "",
    o_how: "",
    o_time: "",
    o_what: "",
    o_when: "",
    occupation: "",
    other_p: "",
    other_p_value: "",
    phy: "",
    run: "",
    run_how: "",
    run_when: "",
    study: "",
    swe: "",
    swe_how: "",
    swe_when: "",
    thairoid: "",
    w_d_count: "",
    w_d_time: "",
    w_time: "",
    w_what: "",
    walk: "",
    walk_how: "",
    walk_when: "",
    weight__up: "",
    weight_down: "",
    work: "",
    work_how: "",
    work_when: "",
    yoga: "",
    yoga_how: "",
    yoga_when: "",
    dayabitis: "",
    remark: "",
  });

  const handleDivClick = (category) => {
    setSelectedDiv(category);
  };

  const openModal = (
    name,
    patient_id,
    appointment_id,
    category,
    age,
    gender,
    appointment_date,
    appointment_time
  ) => {
    setSelectedDiv(category);
    setSelectedPatientId({
      name,
      age,
      patient_id,
      appointment_id,
      gender,
      appointment_date,
      appointment_time,
    });
    setShowModal(true);
    fetchAppointment(patient_id);
  };

  useEffect(() => {
    if (selectedPatientId) {
      fetchAppointment(selectedPatientId.patient_id);
    }
  }, [selectedDiv]);

  const closeModal = () => {
    setShowModal(false);
    setSelectedDiv("");
    // setFormData_1(initialFormData)
    setLoad1(false);
    fetchData();
  };

  const generateChartData = () => {
    const labels = [];
    const chartData = [];

    // Calculate the total count of appointments for all categories
    let totalCount = 0;
    if (count.appointments_today) {
      Object.values(count.appointments_today).forEach((count) => {
        totalCount += count;
      });
    }

    // Iterate over the entries of count.appointments_today
    if (count.appointments_today) {
      Object.entries(count.appointments_today).forEach(([category, count]) => {
        // Calculate the percentage of appointments for the current category
        const percentage = (count / totalCount) * 100;

        // Push category names (labels) and percentages to the respective arrays
        labels.push(category);
        chartData.push(percentage.toFixed(2)); // Round percentage to 2 decimal places
      });
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "Percentage of Appointments",
          data: chartData,
          backgroundColor: [
            "#FF6384", // Physiotherapy
            "#36A2EB", // Weight Loss
            "#FFCE56", // General Checkup
            "#4BC0C0", // Fitness
          ],
          borderWidth: 1,
        },
      ],
    };
  };
  // Initialize data using the generated chart data
  const data = generateChartData();

  // Options for the chart
  const options = {
    animation: {
      duration: 3000,
      easing: "easeOutBounce",
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    type: "doughnut",
  };

  useEffect(() => {
    if (localStorage.getItem("role") === null) {
      navigate("/", { replace: true });
      toast.info("Not Allowed To Access");
    } else {
      fetchData();
      fetchData_1();
      fetchData_2();
    }
  }, [navigate]);

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
        "https://arpanhospital.online/all_patient.php",
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

  const fetchData_1 = async () => {
    try {
      setLoad2(true);
      // Make the fetch request with the appropriate URL and request body
      const response = await fetch(
        "https://arpanhospital.online/couting_patient.php"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the response JSON
      const jsonData = await response.json();
      // Update the state with the fetched data
      setCounts(jsonData);
      setLoad2(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData_2 = async () => {
    try {
      // Make the fetch request with the appropriate URL and request body
      const response = await fetch("https://arpanhospital.online/chart.php");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the response JSON
      const jsonData = await response.json();
      // Update the state with the fetched data
      setCounts1(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderChart = () => {
    const categories = [...new Set(count1.map((item) => item.category))];

    const genders = [...new Set(count1.map((item) => item.gender))];

    const chartData = {
      labels: categories,
      datasets: genders.map((gender) => ({
        label: gender,
        data: categories.map((category) => {
          const entry = count1.find(
            (item) => item.category === category && item.gender === gender
          );
          return entry ? entry.count : 0;
        }),
      })),
    };

    return chartData;
  };

  const data_1 = renderChart();

  const options_1 = {
    animation: {
      duration: 3000,
      easing: "easeOutBounce",
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1, // Start the y-axis scale from zero
      },
    },
    type: "bar",
  };

  const fetchAppointment = async (patientId) => {
    setButton(false);
    setLoad1(true);
    setSelectedImages([]);
    if (selectedDiv === "weight_loss") {
      try {
        const response = await axios.get(
          `https://arpanhospital.online/pain_by_id.php?patient_id=${patientId}`
        );
        const appointmentData = response.data.appointment;
        if (response?.data?.status === "error") {
          setButton(true);
          return;
        }
        // Set form data with fetched appointment data
        setFormData_1({
          acidity: appointmentData.acidity,
          address: appointmentData.address,
          contact: appointmentData.contact,
          blood: appointmentData.blood,
          cyc: appointmentData.cyc,
          cyc_how: appointmentData.cyc_how,
          cyc_when: appointmentData.cyc_when,
          d_time: appointmentData.d_time,
          d_what: appointmentData.d_what,
          dada: appointmentData.dada,
          dada_how: appointmentData.dada_how,
          dada_when: appointmentData.dada_when,
          dia: appointmentData.dia,
          dob: appointmentData.dob,
          fact_loss: appointmentData.fact_loss,
          fact_loss_2: appointmentData.fact_loss_2,
          fitness: appointmentData.fitness,
          gender: appointmentData.gender,
          health: appointmentData.health,
          heart: appointmentData.heart,
          kabajiyat: appointmentData.kabajiyat,
          l_time: appointmentData.l_time,
          l_what: appointmentData.l_what,
          m_time: appointmentData.m_time,
          m_what: appointmentData.m_what,
          machine: appointmentData.machine,
          machine_how: appointmentData.machine_how,
          machine_when: appointmentData.machine_when,
          name: appointmentData.name,
          o: appointmentData.o,
          o_how: appointmentData.o_how,
          o_time: appointmentData.o_time,
          o_what: appointmentData.o_what,
          o_when: appointmentData.o_when,
          occupation: appointmentData.occupation,
          other_p: appointmentData.other_p,
          other_p_value: appointmentData.other_p_value,
          phy: appointmentData.phy,
          run: appointmentData.run,
          run_how: appointmentData.run_how,
          run_when: appointmentData.run_when,
          study: appointmentData.study,
          swe: appointmentData.swe,
          swe_how: appointmentData.swe_how,
          swe_when: appointmentData.swe_when,
          thairoid: appointmentData.thairoid,
          w_d_count: appointmentData.w_d_count,
          w_d_time: appointmentData.w_d_time,
          w_time: appointmentData.w_time,
          w_what: appointmentData.w_what,
          walk: appointmentData.walk,
          walk_how: appointmentData.walk_how,
          walk_when: appointmentData.walk_when,
          weight__up: appointmentData.weight__up,
          weight_down: appointmentData.weight_down,
          work: appointmentData.work,
          work_how: appointmentData.work_how,
          work_when: appointmentData.work_when,
          yoga: appointmentData.yoga,
          yoga_how: appointmentData.yoga_how,
          yoga_when: appointmentData.yoga_when,
          name: appointmentData.name,
          dayabitis: appointmentData.dayabitis,
          remark: appointmentData.remark,
        });
        setSelectedImages(appointmentData?.photos);
        setLoad1(false);
        // Set updating flag to true
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoad1(false);
      }
      return;
    }
    if (selectedDiv === "physiotherapy") {
      try {
       
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoad1(false);
      }
    }
    if (selectedDiv === "pain_management") {
      try {
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoad1(false);
        return;
      }
    }
    if (selectedDiv === "fitness") {
      try {
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoad1(false);
        return;
      }
    }
  };

 
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoad1(true);
    const doc = new jsPDF();
    doc.text("Patient Report", doc.internal.pageSize.getWidth() / 2, 12, { align: 'center' });

    let y = 20; 

  function addText(text, x, y, fontStyle, fontSize) {
      doc.setFont(fontStyle);
      doc.setFontSize(fontSize);
      doc.text(text, x, y);
  }

  function addPageBorder() {
    doc.setDrawColor(0); // Border color (black)
    doc.setLineWidth(0.5); // Border line width
    doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10); // Add a border around the page
}

    const fields = [
      { label: 'Name', value: selectedPatientId.name, labelX: 10, labelY: y, valueX: 10, valueY: y+7},
      { label: 'Age', value: selectedPatientId.age, labelX:80, labelY: y , valueX: 80, valueY: y+7},
      { label: 'Gender', value: selectedPatientId.gender, labelX: 102, labelY: y, valueX: 102, valueY: y+7},
      { label: 'Contact', value: formData_1.contact,labelX: 138, labelY: y, valueX: 138, valueY: y+7},
      { label: 'Occupation', value: formData_1.occupation,labelX: 174, labelY: y, valueX: 174, valueY: y+7},
      { label: 'Address', value: formData_1.address,labelX: 10, labelY: y+15, valueX:10, valueY: y+22},
      { label: '1)Acidity', value: formData_1.acidity== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+35, valueX:55, valueY: y+35},
      { label: '2)Dayabitis', value: formData_1.dayabitis== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+42, valueX:55, valueY: y+42},
      { label: '3)Kabajiyat', value: formData_1.kabajiyat== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+49, valueX:55, valueY: y+49},
      { label: '4)Heart', value: formData_1.heart== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+56, valueX:55, valueY: y+56},
      { label: '5)Blood', value: formData_1.blood== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+63, valueX:55, valueY: y+63},
      { label: '6)Thairoid', value: formData_1.thairoid== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+70, valueX:55, valueY: y+77},
      { label: '7)Other_Problem', value: formData_1.other_p== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+77, valueX:55, valueY: y+77},
      { label: 'i)Problem', value: formData_1.other_p_value,labelX:65,labelY: y+77, valueX:95, valueY: y+77},
      { label: '1)Fact Loss', value: formData_1.fact_loss== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+90, valueX:80, valueY: y+90},
      { label: '2)Fact Loss 2', value: formData_1.fact_loss_2== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+97, valueX:80, valueY: y+97},
      { label: '3)Fitness', value: formData_1.fitness== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+104, valueX:80, valueY: y+104},
      { label: '4)Health', value: formData_1.health== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+111, valueX:80, valueY: y+111},
      { label: '5)Physique', value: formData_1.phy== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+118, valueX:80, valueY: y+118},
      { label: '6)Found Problem', value: formData_1.dia== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+125, valueX:80, valueY: y+125},
      { label: '7)Weight Gain', value: formData_1.weight__up== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+132, valueX:80, valueY: y+132},
      { label: '8)Weight loss', value: formData_1.weight_down== 1 ? 'Yes' : 'No',labelX: 10, labelY: y+139, valueX:80, valueY: y+139},
      { label: 'how many', value: formData_1.w_d_count,labelX: 90, labelY: y+139, valueX:117, valueY: y+139},
      { label: 'Time' ,value: formData_1.w_d_time,labelX: 170, labelY: y+139, valueX:185, valueY: y+139},
      { label: 'Diet' ,labelX: 10, labelY: y+152}, 
      { label: 'What', labelX: 50, labelY: y+152},   
      { label: 'Time',labelX: 160, labelY: y+152}, 
      { label: 'Breakfast',labelX: 10, labelY: y+160},
      {value: formData_1.m_what,valueX:50,valueY: y+160},
      {value: formData_1.m_time,valueX:160, valueY: y+160},
      { label: 'Lunch',labelX: 10, labelY: y+167},
      {value: formData_1.l_what,valueX:50,valueY: y+167},
      {value: formData_1.l_time,valueX:160, valueY: y+167},
      { label: 'Dinner',labelX: 10, labelY: y+174},
      {value: formData_1.d_what,valueX:50,valueY: y+174},
      {value: formData_1.d_time,valueX:160, valueY: y+174},
      { label: 'In beetween diet',labelX: 10, labelY: y+181},
      {value: formData_1.o_what,valueX:50,valueY: y+181},
      {value: formData_1.o_time,valueX:160, valueY: y+181},
      { label: 'Water',labelX: 10, labelY: y+188},
      {value: formData_1.w_what,valueX:50,valueY: y+188},
      {value: formData_1.w_time,valueX:160, valueY: y+188},
      { label: 'Activity',labelX: 10, labelY: y+201},
      { label: 'yes/no',labelX: 50, labelY: y+201},
      { label: 'how much',labelX: 100, labelY: y+201},
      { label: 'When',labelX: 170, labelY: y+201},
      { label: 'Cycleling',labelX: 10, labelY: y+208},
      { value: formData_1.cyc== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+208},
      { value: formData_1.cyc_how,valueX: 100, valueY: y+208},
      { value: formData_1.cyc_when,valueX: 170, valueY: y+208},
      { label: 'Walking',labelX: 10, labelY: y+215},
      { value: formData_1.walk== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+215},
      { value: formData_1.walk_how,valueX: 100, valueY: y+215},
      { value: formData_1.walk_when,valueX: 170, valueY: y+215},
      { label: 'Yoga',labelX: 10, labelY: y+222},
      { value: formData_1.yoga== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+222},
      { value: formData_1.yoga_how,valueX: 100, valueY: y+222},
      { value: formData_1.yoga_when,valueX: 170, valueY: y+222},
      { label: 'Swimming',labelX: 10, labelY: y+229},
      { value: formData_1.swe== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+229},
      { value: formData_1.swe_how,valueX: 100, valueY: y+229},
      { value: formData_1.swe_when,valueX: 170, valueY: y+229},
      { label: 'Running',labelX: 10, labelY: y+236},
      { value: formData_1.run== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+236},
      { value: formData_1.run_how,valueX: 100, valueY: y+236},
      { value: formData_1.run_when,valueX: 170, valueY: y+236},
      { label: 'Machine_Run',labelX: 10, labelY: y+241},
      { value: formData_1.machine== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+241},
      { value: formData_1.machine_how,valueX: 100, valueY: y+241},
      { value: formData_1.machine_when,valueX: 170, valueY: y+241},
      { label: 'Other',labelX: 10, labelY: y+248},
      { value: formData_1.o== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+248},
      { value: formData_1.o_how,valueX: 100, valueY: y+248},
      { value: formData_1.o_when,valueX: 170, valueY: y+248},
      { label: 'climb stairs',labelX: 10, labelY: y+255},
      { value: formData_1.dada== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+255},
      { value: formData_1.dada_how,valueX: 100, valueY: y+255},
      { value: formData_1.dada_when,valueX: 170, valueY: y+255},
      { label: 'Household work',labelX: 10, labelY: y+262},
      { value: formData_1.work== 1 ? 'Yes' : 'No',valueX: 50, valueY: y+262},
      { value: formData_1.work_how,valueX: 100, valueY: y+262},
      { value: formData_1.work_when,valueX: 170, valueY: y+262},
     
        // { label: 'Remark', value: formData_1.remark },
    ];

    fields.forEach(field => {
      addPageBorder();
      if (field.label !== undefined) { 
        doc.setTextColor(255, 0, 0);
        addText(`${field.label}:`, field.labelX, field.labelY,'italic', 16);
      }
        if (field.value !== undefined) { 
        doc.setTextColor(0);
        addText(field.value, field.valueX, field.valueY, 'normal', 14);
        }
    
  });
  const pdfBlob = doc.output('blob');

    if (selectedDiv == "weight_loss") {
      try {
        const formDataObject = new FormData();
        formDataObject.append("patient_id", selectedPatientId.patient_id);
        formDataObject.append("appointment_id",selectedPatientId.appointment_id);
        formDataObject.append("name", selectedPatientId.name);
        formDataObject.append("age", selectedPatientId.age);
        formDataObject.append("gender", selectedPatientId.gender);
        formDataObject.append("acidity", formData_1.acidity);
        formDataObject.append("contact", formData_1.contact);
        formDataObject.append("occupation", formData_1.occupation);
        formDataObject.append("address", formData_1.address);
        formDataObject.append("dayabitis", formData_1.dayabitis);
        formDataObject.append("cyc", formData_1.cyc);
        formDataObject.append("cyc_how", formData_1.cyc_how);
        formDataObject.append("cyc_when", formData_1.cyc_when);
        formDataObject.append("d_time", formData_1.d_time);
        formDataObject.append("d_what", formData_1.d_what);
        formDataObject.append("dada", formData_1.dada);
        formDataObject.append("dada_how", formData_1.dada_how);
        formDataObject.append("dada_when", formData_1.dada_when);
        formDataObject.append("dia", formData_1.dia);
        formDataObject.append("dob", formData_1.dob);
        formDataObject.append("fact_loss", formData_1.fact_loss);
        formDataObject.append("fact_loss_2", formData_1.fact_loss_2);
        formDataObject.append("fitness", formData_1.fitness);
        formDataObject.append("health", formData_1.health);
        formDataObject.append("blood", formData_1.blood);
        formDataObject.append("heart", formData_1.heart);
        formDataObject.append("kabajiyat", formData_1.kabajiyat);
        formDataObject.append("l_time", formData_1.l_time);
        formDataObject.append("l_what", formData_1.l_what);
        formDataObject.append("m_time", formData_1.m_time);
        formDataObject.append("m_what", formData_1.m_what);
        formDataObject.append("machine", formData_1.machine);
        formDataObject.append("machine_how", formData_1.machine_how);
        formDataObject.append("machine_when", formData_1.machine_when);
        formDataObject.append("o", formData_1.o);
        formDataObject.append("o_how", formData_1.o_how);
        formDataObject.append("o_time", formData_1.o_time);
        formDataObject.append("o_what", formData_1.o_what);
        formDataObject.append("o_when", formData_1.o_when);
        formDataObject.append("other_p", formData_1.other_p);
        formDataObject.append("other_p_value", formData_1.other_p_value);
        formDataObject.append("phy", formData_1.phy);
        formDataObject.append("run", formData_1.run);
        formDataObject.append("run_how", formData_1.run_how);
        formDataObject.append("run_when", formData_1.run_when);
        formDataObject.append("study", formData_1.study);
        formDataObject.append("swe", formData_1.swe);
        formDataObject.append("swe_how", formData_1.swe_how);
        formDataObject.append("swe_when", formData_1.swe_when);
        formDataObject.append("thairoid", formData_1.thairoid);
        formDataObject.append("w_d_count", formData_1.w_d_count);
        formDataObject.append("w_d_time", formData_1.w_d_time);
        formDataObject.append("w_time", formData_1.w_time);
        formDataObject.append("w_what", formData_1.w_what);
        formDataObject.append("walk", formData_1.walk);
        formDataObject.append("walk_how", formData_1.walk_how);
        formDataObject.append("walk_when", formData_1.walk_when);
        formDataObject.append("weight__up", formData_1.weight__up);
        formDataObject.append("weight_down", formData_1.weight_down);
        formDataObject.append("work", formData_1.work);
        formDataObject.append("work_how", formData_1.work_how);
        formDataObject.append("work_when", formData_1.work_when);
        formDataObject.append("yoga", formData_1.yoga);
        formDataObject.append("yoga_how", formData_1.yoga_how);
        formDataObject.append("yoga_when", formData_1.yoga_when);
        formDataObject.append("remark", formData_1.remark);
        formDataObject.append("report_pdf", pdfBlob,`${selectedPatientId.patient_id}_2.pdf`);
        selectedImages.forEach((image, index) => {
          if (typeof image === "string") {
            formDataObject.append("images[]", image);
          } else {
            formDataObject.append("images[]", image.file);
          }
        });
        const response = await axios.post(
          "https://arpanhospital.online/appointment_book_pain.php",
          formDataObject
        );
        setSelectedImages([]);
        // setSelectedPatientId(initialFormData);
        closeModal();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleInputChange_1 = (event) => {
    const target = event.target;
    const value =
      target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
    const name = target.name;

    setFormData_1({
      ...formData_1,
      [name]: value,
    });
  };

  // const handleInputChange_2 = (event) => {
  //   const target = event.target;
  //   const value =
  //     target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
  //   const name = target.name;

  //   setFormData_2({
  //     ...formData_2,
  //     [name]: value,
  //   });
  // };

  // const handleInputChange_3 = (event) => {
  //   const target = event.target;
  //   const value =
  //     target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
  //   const name = target.name;

  //   setFormData_3({
  //     ...formData_3,
  //     [name]: value,
  //   });
  // };

  const handleInputChange_w = (event) => {
    const { name, value } = event.target;

    setSelectedPatientId({
      ...selectedPatientId,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      src: URL.createObjectURL(file),
      file,
    }));

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => [
      ...prevImages.slice(0, index),
      ...prevImages.slice(index + 1),
    ]);
  };

  const handleImageClick = (url) => {
    window.open(url, "_blank").focus();
  };

  return (
    <>
      <div className="h-screen w-screen flex bg-slate-200 flex-col items-center gap-7 ">
        {Load2 ? (
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
            <div>
              <Navbar onSearch={fetchData} />
            </div>
            <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 w-full justify-between gap-4 items-center lg:grid-cols-5 p-3">
              <div className="bg-white w-full h-20 rounded-b-xl relative shadow-lg shadow-slate-950">
                <span className="text-white bg-red-600 rounded-md p-2 absolute top-0 left-0 transform translate-x-1/2 -translate-y-1/2">
                  <FaUsers className="w-6 h-6" />
                </span>
                <div className="flex flex-row justify-between w-full h-full p-2">
                  <div className="flex flex-col justify-end font-serif text-cyan-950">
                    TOTAL PATIENT
                  </div>

                  <div className="text-2xl w-1/5 h-full  border  border-black bg-cyan-950 text-white rounded-b-lg flex justify-center items-center">
                    {count?.total_patients}
                  </div>
                </div>
              </div>
              <div className="bg-white w-full h-20 rounded-b-xl relative shadow-lg shadow-slate-950">
                <span className="text-white bg-cyan-600 rounded-md p-2 absolute top-0 left-0 transform translate-x-1/2 -translate-y-1/2 ">
                  <FaUsers className="w-6 h-6" />
                </span>
                <div className="flex flex-row justify-between w-full h-full p-2">
                  <div className="flex flex-col justify-end font-serif text-cyan-950">
                    TOTAL APPOINMENTS
                  </div>
                  <div className="text-2xl w-1/5 border  border-black  bg-cyan-950 text-white rounded-b-lg h-full flex justify-center items-center">
                    {parseInt(count?.total_appointments_all)}
                  </div>
                </div>
              </div>
              <div className="bg-white w-full h-20 rounded-b-xl relative shadow-lg shadow-slate-950">
                <span className="text-white bg-green-600 rounded-md p-2 absolute top-0 left-0 transform translate-x-1/2 -translate-y-1/2 ">
                  <FaUsers className="w-6 h-6" />
                </span>
                <div className="flex flex-row justify-between w-full h-full p-2">
                  <div className="flex flex-col justify-end font-serif text-cyan-950">
                    TODAY APPOINMENTS
                  </div>

                  <div className="text-2xl w-1/5 border  border-black rounded-b-lg bg-cyan-950 text-white h-full flex justify-center items-center">
                    {parseInt(count?.total_appointments_today)}
                  </div>
                </div>
              </div>
              <div className=" bg-white w-full h-20 rounded-b-xl relative shadow-lg shadow-slate-950">
                <span className="text-white bg-slate-600 rounded-md p-2 absolute top-0 left-0 transform translate-x-1/2 -translate-y-1/2">
                  <FaUsers className="w-6 h-6" />
                </span>
                <div className="flex flex-row justify-between w-full h-full p-2">
                  <div className="flex flex-col justify-end font-serif text-cyan-950">
                    NEXT APPOINMENTS
                  </div>

                  <div className="text-2xl w-1/5 h-full  border  border-black bg-cyan-950 text-white rounded-b-lg flex justify-center items-center">
                    {count?.next_appointment}
                  </div>
                </div>
              </div>
              <div className="bg-white w-full h-20 rounded-b-xl relative shadow-lg shadow-slate-950">
                <span className="text-white bg-blue-600 rounded-md p-2 absolute top-0 left-0 transform translate-x-1/2 -translate-y-1/2 ">
                  <FaUsers className="w-6 h-6" />
                </span>
                <div className="md:col-span-2 flex flex-row gap-1 w-full h-full p-2 ">
                  <div className="grid grid-cols-4 gap-1 w-full pt-4">
                    {count.appointments_today &&
                      Object.entries(count.appointments_today).map(
                        ([category, count], index) => (
                          <div
                            key={index}
                            className="bg-cyan-950 p-1 text-white flex flex-col items-center justify-center gap-2 rounded-md text-center"
                          >
                            <img
                              src={getImageForCategory(category)}
                              className=" w-full h-9"
                            />
                            <p className="text-xl ">{count}</p>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full overflow-x-hidden">
              <div className="flex md:flex-col lg:flex-row gap-3 p-3  rounded-md">
                <div className="lg:w-1/4 md:w-full bg-white shadow-lg shadow-slate-900 rounded-md flex items-center justify-center  flex-col">
                  <div className="mb-4 w-full h-full">
                    <Doughnut
                      className="items-center flex flex-row"
                      data={data}
                      options={options}
                    />
                  </div>
                  <div className="w-full h-full">
                    <Bar
                      className="items-center flex flex-row"
                      data={data_1}
                      options={options_1}
                    />
                  </div>
                </div>
                <div className="md:w-full lg:w-3/4  lg:overflow-x-hidden  bg-white shadow-lg shadow-slate-900 rounded-lg overflow-auto">
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
                      <table className="w-full  table-auto border-collapse border bg-cover">
                        <thead>
                          <tr className="bg-cyan-950 ">
                            <th className="px-2 py-2 text-center text-xs font-large text-white uppercase tracking-wider">
                              NO
                            </th>
                            <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              NAME
                            </th>
                            <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              GENDER
                            </th>
                            <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              AGE
                            </th>
                            <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              DATE
                            </th>
                            <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              TIME
                            </th>
                            <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              CATEGORY
                            </th>
                            <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              STATUS
                            </th>
                            <th className="px-2 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              APPOINMENT
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
                                  <td className="px-2 py-2 text-center uppercase whitespace-nowrap">
                                    {item.name}
                                  </td>
                                  <td className="px-2 py-2 text-center uppercase whitespace-nowrap">
                                    {item.gender}
                                  </td>
                                  <td className="px-2 py-2 text-center whitespace-nowrap">
                                    {item.age}
                                  </td>
                                  <td className="px-2 py-2 text-center whitespace-nowrap font-mono">
                                    {moment(item.appointment_date).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td className="px-2 py-2 text-center whitespace-nowrap ">
                                    {item.appointment_time}
                                  </td>
                                  <td className="px-2 py-2 text-center uppercase whitespace-nowrap">
                                    {item.category}
                                  </td>
                                  <td className="px-2 py-2 whitespace-nowrap">
                                    {item.status == 1 ? (
                                      <div className="flex justify-center">
                                        <MdFactCheck className="text-green-800 text-2xl" />
                                      </div>
                                    ) : (
                                      <div className="flex justify-center">
                                        <FaWindowClose className="text-red-800 text-2xl" />
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-2">
                                    <button
                                      className="bg-cyan-950 p-2 md:p-3 content-center cursor-pointer text-white rounded-md font-serif"
                                      onClick={() =>
                                        openModal(
                                          item.name,
                                          item.patient_id,
                                          item.appointment_id,
                                          item.category,
                                          item.age,
                                          item.gender,
                                          item.appointment_date,
                                          item.appointment_time
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
                      {showModal && (
                        <div className="fixed top-0 left-0 w-screen h-screen  flex-row justify-center items-center  bg-white shadow-lg shadow-slate-950 rounded-lg p-6 ml-3 overflow-auto">
                          {Load1 ? (
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
                              <div className="flex flex-row justify-between">
                                <div>
                                  <h2 className="text-xl font-semibold mb-4 font-serif text-bold text-red-700">
                                    PATIENT DETAILS
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
                              <div className="flex flex-col gap-3 justify-between w-full">
                                <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4">
                                  <div className="flex flex-col gap-1">
                                    <div className="text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                      <p>NAME</p>
                                    </div>
                                    <div className="">
                                      <input
                                        className="bg-slate-200 px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                        type="text"
                                        name="name"
                                        id=""
                                        required
                                        onChange={handleInputChange_w}
                                        value={selectedPatientId.name}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                      <p>AGE</p>
                                    </div>
                                    <div className="">
                                      <input
                                        className="bg-slate-200 px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                        type="text"
                                        name="age"
                                        id=""
                                        required
                                        onChange={handleInputChange_w}
                                        value={selectedPatientId.age}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                      <p>GENDER</p>
                                    </div>
                                    <div className="border bg-slate-200 p-2 rounded-md shadow-lg shadow-slate-950 inline-flex gap-2 font-serif w-full justify-center items-center">
                                      <div className="">
                                        <label className="inline-block mr-2 text-cyan-950">
                                          Male
                                        </label>
                                      </div>
                                      <div>
                                        <input
                                          type="radio"
                                          name="gender"
                                          value="male"
                                          checked={
                                            selectedPatientId.gender === "male"
                                          }
                                          onChange={handleInputChange_w}
                                          className="mr-4"
                                        />
                                      </div>
                                      <div>
                                        <label className="inline-block mr-2 text-cyan-950">
                                          Female
                                        </label>
                                      </div>
                                      <div>
                                        <input
                                          type="radio"
                                          name="gender"
                                          value="female"
                                          checked={
                                            selectedPatientId.gender ===
                                            "female"
                                          }
                                          onChange={handleInputChange_w}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                      <p>CATEGORY</p>
                                    </div>
                                    <div className="">
                                      <input
                                        className="bg-slate-200   px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                        type="text"
                                        id=""
                                        required
                                        value={selectedDiv}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-flow-row sm:grid-cols-1 font-serif md:grid-cols-2 gap-3 lg:grid-cols-4">
                                  <div
                                    className={`rounded-md border-2  p-2 cursor-pointer  text-center w-full inline-flex items-center justify-center gap-2 ${
                                      selectedDiv === "physiotherapy"
                                        ? "bg-cyan-950 text-white"
                                        : "bg-white text-red-600"
                                    }`}
                                    onClick={() =>
                                      handleDivClick("physiotherapy")
                                    }
                                  >
                                    <FaUserDoctor className="text-md" />
                                    PHYSIOTHERAPY
                                  </div>
                                  <div
                                    className={`rounded-md border-2 p-2 cursor-pointer text-center w-full inline-flex items-center justify-center gap-2 ${
                                      selectedDiv === "fitness"
                                        ? "bg-cyan-950 text-white"
                                        : "bg-white text-red-600"
                                    }`}
                                    onClick={() => handleDivClick("fitness")}
                                  >
                                    <FaUserDoctor className="text-md" />
                                    FITNESS
                                  </div>
                                  <div
                                    className={`rounded-md border-2 p-2 cursor-pointer text-center w-full  inline-flex items-center justify-center gap-2 ${
                                      selectedDiv === "weight_loss"
                                        ? "bg-cyan-950 text-white"
                                        : "bg-white text-red-600"
                                    }`}
                                    onClick={() =>
                                      handleDivClick("weight_loss")
                                    }
                                  >
                                    <FaUserDoctor className="text-md" />
                                    WEIGHT LOSS
                                  </div>
                                  <div
                                    className={`rounded-md border-2 p-2 cursor-pointer text-center w-full inline-flex items-center justify-center gap-2 ${
                                      selectedDiv === "pain_management"
                                        ? "bg-cyan-950 text-white"
                                        : "bg-white text-red-600"
                                    }`}
                                    onClick={() =>
                                      handleDivClick("pain_management")
                                    }
                                  >
                                    <FaUserDoctor className="text-md" />
                                    PAIN_MANAGEMENT
                                  </div>
                                </div>
                                {selectedDiv === "physiotherapy" && (
                                <></> 
                                )}
                                {selectedDiv === "fitness" && (
                                  <></>
                                )}
                                {selectedDiv === "weight_loss" && (
                                   <div className="rounded-md flex flex-col gap-3 p-2 bg-slate-200 overflow-auto text-white">
                                   <h1 className="text-blue-800 font-serif text-xl">
                                     PERSONAL INFORMATION
                                   </h1>
                                   <form
                                     onSubmit={handleSubmit}
                                     enctype="multipart/form-data"
                                   >
                                     <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4">
                                       <div className="col-span-2 flex flex-row  gap-2">
                                         <div className="flex flex-col gap-2 w-full ">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>જન્મ તારીખ</p>
                                           </div>
                                           <div className="">
                                             <input
                                               className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950  font-mono text-md uppercase w-full text-cyan-950"
                                               type="date"
                                               name="dob"
                                               id=""
                                               required
                                               onChange={handleInputChange_1}
                                               value={formData_1.dob}
                                               max={
                                                 new Date()
                                                   .toISOString()
                                                   .split("T")[0]
                                               }
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full ">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>અભ્યાસ </p>
                                           </div>
                                           <div className="">
                                             <input
                                               className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950  font-mono text-md uppercase w-full text-cyan-950"
                                               type="text"
                                               name="study"
                                               placeholder="અભ્યાસ"
                                               required
                                               onChange={handleInputChange_1}
                                               value={formData_1.study}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full ">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>વ્યવસાય</p>
                                           </div>
                                           <div className="">
                                             <input
                                               className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                               type="text"
                                               name="occupation"
                                               placeholder="વ્યવસાય"
                                               required
                                               onChange={handleInputChange_1}
                                               value={formData_1.occupation}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full ">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>મોબાઈલ નં</p>
                                           </div>
                                           <div className="">
                                             <input
                                               className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                               type="tel"
                                               name="contact"
                                               placeholder="મોબાઈલ નં"
                                               required
                                               pattern="^\d+$"
                                               value={formData_1.contact}
                                               onChange={handleInputChange_1}
                                               minLength={10}
                                               maxLength={10}
                                             />
                                           </div>
                                         </div>
                                       </div>
                                       <div className="col-span-2  flex flex-col gap-2 ">
                                         <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider">
                                           <p>સરનામું</p>
                                         </div>
                                         <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="address"
                                             placeholder="સરનામું"
                                             required
                                             onChange={handleInputChange_1}
                                             value={formData_1.address}
                                           ></textarea>
                                         </div>
                                       </div>
                                     </div>
                                     <h1 className="text-blue-800 font-serif text-xl pt-5">
                                       PATIENT INFORMATION
                                     </h1>
                                     <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2  gap-2 ">
                                       <div className="flex flex-col gap-2">
                                         <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider">
                                           <p>* મેડીકલ હીસ્ટરી</p>
                                         </div>
                                         <div className="flex flex-col gap-2 items-center ">
                                           <div className="flex flex-row gap-2 w-full items-center justify-around">
                                             <div
                                               className="text-left text-sm font-extrabold text-red-500 uppercase w-full  tracking-wider "
                                               onClick={handleInputChange_1}
                                             >
                                               <p>(1) લોહીનું ઉંચુ દબાણ</p>
                                             </div>
                                             <div className="text-center w-full">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="blood"
                                                 id=""
                                                 checked={
                                                   formData_1.blood == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row gap-2 w-full items-center justify-evenly">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>(2) એસીડીટી</p>
                                             </div>
                                             <div className="w-full text-center">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="acidity"
                                                 id=""
                                                 checked={
                                                   formData_1.acidity == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row gap-2 items-center justify-around w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>(3) કબજીયાત</p>
                                             </div>
                                             <div className="w-full text-center">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="kabajiyat"
                                                 id=""
                                                 checked={
                                                   formData_1.kabajiyat == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row gap-2 items-center justify-around w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>(4) હૃદય રોગ</p>
                                             </div>
                                             <div className="w-full text-center">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="heart"
                                                 id=""
                                                 checked={
                                                   formData_1.heart == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row gap-2 items-center justify-around w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>(5) થાયરોઈડ</p>
                                             </div>
                                             <div className="w-full text-center">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="thairoid"
                                                 id=""
                                                 checked={
                                                   formData_1.thairoid == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row gap-2 items-center justify-around w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>(6) ડાયાબીટીસ</p>
                                             </div>
                                             <div className="w-full text-center">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="dayabitis"
                                                 id=""
                                                 checked={
                                                   formData_1.dayabitis == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row gap-2 items-center justify-evenly w-full">
                                             <div className="text-left w-full text-sm font-extrabold text-red-500 uppercase  tracking-wider">
                                               <p>(7) બીજી કોઈ તકલીફ</p>
                                             </div>
                                             <div className="w-full text-center">
                                               <input
                                                 className="h-4 w-4 "
                                                 type="checkbox"
                                                 name="other_p"
                                                 checked={
                                                   formData_1.other_p == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                           </div>
                                           {formData_1.other_p == 1 && (
                                             <div>
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="other_p_value"
                                                 value={
                                                   formData_1.other_p_value
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                           )}
                                         </div>
                                       </div>
                                       <div className="flex flex-col gap-2 w-full">
                                         <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                           <p>* તમારે શું કરવું છે ?</p>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center">
                                           <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                             <p>
                                               (1) તંદુરસ્તી સારી કરવી છે ?{" "}
                                             </p>
                                           </div>
                                           <div>
                                             <input
                                               className="h-4 w-4"
                                               type="checkbox"
                                               name="health"
                                               checked={
                                                 formData_1.health == 1
                                                   ? true
                                                   : false
                                               }
                                               onChange={handleInputChange_1}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center">
                                           <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                             <p>
                                               (2) શારીરિક ક્ષમતા વધારવી છે ?
                                             </p>
                                           </div>
                                           <div>
                                             <input
                                               className="h-4 w-4"
                                               type="checkbox"
                                               name="fitness"
                                               checked={
                                                 formData_1.fitness == 1
                                                   ? true
                                                   : false
                                               }
                                               onChange={handleInputChange_1}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center">
                                           <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                             <p>
                                               (3) શરીરનો દેખાવ સુધારવો છે ?
                                             </p>
                                           </div>
                                           <div>
                                             <input
                                               className="h-4 w-4"
                                               type="checkbox"
                                               name="phy"
                                               checked={
                                                 formData_1.phy == 1
                                                   ? true
                                                   : false
                                               }
                                               onChange={handleInputChange_1}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center">
                                           <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                             <p>
                                               (4) જો કોઈ બીમારી હોય તો તેને
                                               સારી કરવી છે ?
                                             </p>
                                           </div>
                                           <div>
                                             <input
                                               className="h-4 w-4"
                                               type="checkbox"
                                               name="dia"
                                               checked={
                                                 formData_1.dia == 1
                                                   ? true
                                                   : false
                                               }
                                               onChange={handleInputChange_1}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center">
                                           <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                             <p>(5) વજન વધારવું છે?</p>
                                           </div>
                                           <div>
                                             <input
                                               className="h-4 w-4"
                                               type="checkbox"
                                               name="weight__up"
                                               checked={
                                                 formData_1.weight__up == 1
                                                   ? true
                                                   : false
                                               }
                                               onChange={handleInputChange_1}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center">
                                           <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                             <p>(6) ચરબી ઘટાડવી છે?</p>
                                           </div>
                                           <div>
                                             <input
                                               className="h-4 w-4"
                                               type="checkbox"
                                               name="fact_loss"
                                               checked={
                                                 formData_1.fact_loss == 1
                                                   ? true
                                                   : false
                                               }
                                               onChange={handleInputChange_1}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center">
                                           <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                             <p>
                                               (7) પેટ પર ની ચરબી ઘટાડવી છે?
                                             </p>
                                           </div>
                                           <div>
                                             <input
                                               className="h-4 w-4"
                                               type="checkbox"
                                               name="fact_loss_2"
                                               checked={
                                                 formData_1.fact_loss_2 == 1
                                                   ? true
                                                   : false
                                               }
                                               onChange={handleInputChange_1}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center">
                                           <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                             <p>(8) વજન ઘટાડવું છે ? </p>
                                           </div>
                                           <div>
                                             <input
                                               className="h-4 w-4"
                                               type="checkbox"
                                               name="weight_down"
                                               checked={
                                                 formData_1.weight_down == 1
                                                   ? true
                                                   : false
                                               }
                                               onChange={handleInputChange_1}
                                             />
                                           </div>
                                         </div>
                                         <div className="flex flex-row gap-3 items-center w-full justify-center">
                                           {formData_1.weight_down == 1 && (
                                             <>
                                               <div>
                                                 <input
                                                   className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                   type="text"
                                                   name="w_d_count"
                                                   value={formData_1.w_d_count}
                                                   onChange={
                                                     handleInputChange_1
                                                   }
                                                   placeholder="કેટલું ઘટાડવું છે ?"
                                                   required
                                                 />
                                               </div>
                                               <div>
                                                 <input
                                                   className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                   type="text"
                                                   name="w_d_time"
                                                   value={formData_1.w_d_time}
                                                   placeholder="કેટલા સમયમાં ઘટાડવું છે ?"
                                                   onChange={
                                                     handleInputChange_1
                                                   }
                                                   required
                                                 />
                                               </div>
                                             </>
                                           )}
                                         </div>
                                       </div>
                                       <div className="flex flex-col gap-2  w-full">
                                         <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                           <p>* અત્યારની સ્થિતિ</p>
                                         </div>
                                         <div className="pl-2 w-full">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                             <p>(1) ખોરાક</p>
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>• સવારનો નાસ્તો</p>
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="m_time"
                                                 placeholder="ક્યારે ?"
                                                 value={formData_1.m_time}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-left overflow-auto placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="m_what"
                                                 placeholder="શું લો છો ?"
                                                 value={formData_1.m_what}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>• બપોરનું ભોજન</p>
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="l_time"
                                                 placeholder="ક્યારે ?"
                                                 value={formData_1.l_time}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-left overflow-auto placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="l_what"
                                                 placeholder="શું લો છો ?"
                                                 value={formData_1.l_what}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>• સાંજનું ભોજન</p>
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="d_time"
                                                 placeholder="ક્યારે ?"
                                                 value={formData_1.d_time}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-left overflow-auto placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="d_what"
                                                 placeholder="શું લો છો ?"
                                                 value={formData_1.d_what}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>
                                                 • ત્રણ ભોજનની વચ્ચે શું લો છો{" "}
                                               </p>
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="o_time"
                                                 placeholder="ક્યારે ?"
                                                 value={formData_1.o_time}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-left overflow-auto placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="o_what"
                                                 placeholder="શું લો છો ?"
                                                 value={formData_1.o_what}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                           </div>
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                             <p>(2) પાણી</p>
                                           </div>
                                           <div className="flex flex-row items-center gap-2 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                               <p>• પાણી</p>
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif placeholder:text-[11px]  text-md w-full text-cyan-950"
                                                 type="text"
                                                 name="w_time"
                                                 placeholder="કેટલા ગ્લાસ પાણી પીવો છો?"
                                                 value={formData_1.w_time}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-left  placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md placeholder:text-[11px]  w-full text-cyan-950"
                                                 type="text"
                                                 name="w_what"
                                                 placeholder="ક્યા સમયે કેટલા ગ્લાસ પાણી પીવો છો ?"
                                                 value={formData_1.w_what}
                                                 onChange={handleInputChange_1}
                                                 required
                                               />
                                             </div>
                                           </div>
                                         </div>
                                       </div>
                                       <div className="flex flex-col gap-2  w-full">
                                         <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                           <p>* કાર્યપ્રણાલી</p>
                                         </div>
                                         <div className="pl-2 w-full">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                             <p>(1) કસરત</p>
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                               <div>
                                                 <p>• ચાલવું</p>
                                               </div>
                                               <input
                                                 className="h-4 w-4 "
                                                 type="checkbox"
                                                 name="walk"
                                                 checked={
                                                   formData_1.walk == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                             {formData_1.walk == 1 && (
                                               <>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="walk_how"
                                                     placeholder="કેટલું ?"
                                                     value={
                                                       formData_1.walk_how
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="walk_when"
                                                     placeholder="ક્યા સમયે ?"
                                                     value={
                                                       formData_1.walk_when
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                               </>
                                             )}
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                               <div>
                                                 <p>• દોડવું</p>
                                               </div>
                                               <input
                                                 className="h-4 w-4 "
                                                 type="checkbox"
                                                 name="run"
                                                 checked={
                                                   formData_1.run == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                             {formData_1.run == 1 && (
                                               <>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="run_how"
                                                     placeholder="કેટલું ?"
                                                     value={formData_1.run_how}
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="run_when"
                                                     placeholder="ક્યા સમયે ?"
                                                     value={
                                                       formData_1.run_when
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                               </>
                                             )}
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                               <div>
                                                 <p>• યોગાસન</p>
                                               </div>
                                               <input
                                                 className="h-4 w-4 "
                                                 type="checkbox"
                                                 name="yoga"
                                                 checked={
                                                   formData_1.yoga == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                             {formData_1.yoga == 1 && (
                                               <>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="yoga_how"
                                                     placeholder="કેટલું ?"
                                                     value={
                                                       formData_1.yoga_how
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="yoga_when"
                                                     placeholder="ક્યા સમયે ?"
                                                     value={
                                                       formData_1.yoga_when
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                               </>
                                             )}
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                               <div>
                                                 <p>• સ્વીમીંગ</p>
                                               </div>
                                               <input
                                                 className="h-4 w-4 "
                                                 type="checkbox"
                                                 name="swe"
                                                 id=""
                                                 checked={
                                                   formData_1.swe == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                             {formData_1.swe == 1 && (
                                               <>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="swe_how"
                                                     placeholder="કેટલું ?"
                                                     value={formData_1.swe_how}
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="swe_when"
                                                     placeholder="ક્યા સમયે ?"
                                                     value={
                                                       formData_1.swe_when
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                               </>
                                             )}
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                               <div>
                                                 <p>• સાયકલીંગ</p>
                                               </div>
                                               <input
                                                 className="h-4 w-4 "
                                                 type="checkbox"
                                                 name="cyc"
                                                 checked={
                                                   formData_1.cyc == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                             {formData_1.cyc == 1 && (
                                               <>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="cyc_how"
                                                     placeholder="કેટલું ?"
                                                     value={formData_1.cyc_how}
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="cyc_when"
                                                     placeholder="ક્યા સમયે ?"
                                                     value={
                                                       formData_1.cyc_when
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                               </>
                                             )}
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                               <div>
                                                 <p>• મશીન પર ચાલવું</p>
                                               </div>
                                               <input
                                                 className="h-4 w-4 "
                                                 type="checkbox"
                                                 name="machine"
                                                 checked={
                                                   formData_1.machine == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                             {formData_1.machine == 1 && (
                                               <>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="machine_how"
                                                     placeholder="કેટલું ?"
                                                     value={
                                                       formData_1.machine_how
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="machine_when"
                                                     placeholder="ક્યા સમયે ?"
                                                     value={
                                                       formData_1.machine_when
                                                     }
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                               </>
                                             )}
                                           </div>
                                           <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                             <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                               <div>
                                                 <p>• અન્ય</p>
                                               </div>
                                               <input
                                                 className="h-4 w-4 "
                                                 type="checkbox"
                                                 name="o"
                                                 checked={
                                                   formData_1.o == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_1}
                                               />
                                             </div>
                                             {formData_1.o == 1 && (
                                               <>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="o_how"
                                                     placeholder="કેટલું ?"
                                                     value={formData_1.o_how}
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                                 <div className="w-full">
                                                   <input
                                                     className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                     type="text"
                                                     name="o_when"
                                                     placeholder="ક્યા સમયે ?"
                                                     value={formData_1.o_when}
                                                     onChange={
                                                       handleInputChange_1
                                                     }
                                                     required
                                                   />
                                                 </div>
                                               </>
                                             )}
                                           </div>

                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                             <p>(2) રૂટીન એકટીવિટી</p>
                                             <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                               <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                 <div>
                                                   <p>• દાદર ચડવું/ઉતરવું </p>
                                                 </div>
                                                 <input
                                                   className="h-4 w-4 "
                                                   type="checkbox"
                                                   name="dada"
                                                   checked={
                                                     formData_1.dada == 1
                                                       ? true
                                                       : false
                                                   }
                                                   onChange={
                                                     handleInputChange_1
                                                   }
                                                 />
                                               </div>
                                               {formData_1.dada == 1 && (
                                                 <>
                                                   <div className="w-full">
                                                     <input
                                                       className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                       type="text"
                                                       name="dada_how"
                                                       placeholder="કેટલું ?"
                                                       value={
                                                         formData_1.dada_how
                                                       }
                                                       onChange={
                                                         handleInputChange_1
                                                       }
                                                       required
                                                     />
                                                   </div>
                                                   <div className="w-full">
                                                     <input
                                                       className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                       type="text"
                                                       name="dada_when"
                                                       placeholder="ક્યા સમયે ?"
                                                       value={
                                                         formData_1.dada_when
                                                       }
                                                       onChange={
                                                         handleInputChange_1
                                                       }
                                                       required
                                                     />
                                                   </div>
                                                 </>
                                               )}
                                             </div>
                                             <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                               <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                 <div>
                                                   <p>• ઘર નું કામ</p>
                                                 </div>
                                                 <input
                                                   className="h-4 w-4 "
                                                   type="checkbox"
                                                   name="work"
                                                   checked={
                                                     formData_1.work == 1
                                                       ? true
                                                       : false
                                                   }
                                                   onChange={
                                                     handleInputChange_1
                                                   }
                                                 />
                                               </div>
                                               {formData_1.work == 1 && (
                                                 <>
                                                   <div className="w-full">
                                                     <input
                                                       className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                       type="text"
                                                       name="work_how"
                                                       placeholder="કેટલું ?"
                                                       value={
                                                         formData_1.work_how
                                                       }
                                                       onChange={
                                                         handleInputChange_1
                                                       }
                                                       required
                                                     />
                                                   </div>
                                                   <div className="w-full">
                                                     <input
                                                       className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                       type="text"
                                                       name="work_when"
                                                       placeholder="ક્યા સમયે ?"
                                                       value={
                                                         formData_1.work_when
                                                       }
                                                       onChange={
                                                         handleInputChange_1
                                                       }
                                                       required
                                                     />
                                                   </div>
                                                 </>
                                               )}
                                             </div>
                                           </div>
                                         </div>
                                       </div>
                                     </div>
                                     <div className="flex flex-col pt-3 gap-2 pb-1 w-full">
                                       <div className="text-left text-sm  text-gray-500 uppercase flex flex-col gap-3  justify-between  tracking-wider w-full ">
                                         <div>
                                           <p>Remark</p>
                                         </div>
                                         <div className="w-full">
                                         <textarea
                                           className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                           name="remark"
                                           placeholder="remark"
                                           required
                                           onChange={handleInputChange_1}
                                           value={formData_1.remark}
                                         ></textarea>
                                          </div>
                                       </div>
                                     </div>
                                     <div className=" flex flex-col gap-2 w-full">
                                       <div className="text-left text-sm font-medium text-gray-500 uppercase  tracking-wider">
                                         <p>IMAGE</p>
                                       </div>
                                       <div className="grid grid-flow-row grid-cols-10 pt-1">
                                         <input
                                           className="w-full"
                                           name="images[]"
                                           type="file"
                                           multiple
                                           accept="image/*"
                                           onChange={handleFileChange}
                                         />
                                         {selectedImages.map(
                                           (image, index) => (
                                             <div
                                               key={index}
                                               style={{
                                                 position: "relative",
                                                 display: "inline-block",
                                                 margin: "5px",
                                               }}
                                             >
                                               <img
                                                 src={
                                                   image.src ||
                                                   `https://arpanhospital.online/${image}`
                                                 }
                                                 alt={`Image ${index + 1}`}
                                                 style={{
                                                   width: "100%",
                                                   height: "100px",
                                                   marginRight: "5px",
                                                   cursor: "pointer",
                                                 }}
                                                 onClick={() =>
                                                   handleImageClick(
                                                     typeof image === "string"
                                                       ? `https://arpanhospital.online/${image}`
                                                       : URL.createObjectURL(
                                                           image.file
                                                         )
                                                   )
                                                 }
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
                                                 onClick={() =>
                                                   handleRemoveImage(index)
                                                 }
                                               />
                                             </div>
                                           )
                                         )}
                                       </div>
                                     </div>
                                     <div className="flex flex-row justify-end gap-3 font-serif uppercase mt-5">
                                       <div>
                                         <button
                                           className="bg-cyan-950 text-white py-2 px-3 rounded-md uppercase"
                                           type="submit"
                                         >
                                           {button ? "SUBMIT" : "UPDATE"}
                                         </button>
                                       </div>
                                       <div>
                                         <button
                                           className="bg-red-600 text-white py-2 px-3 rounded-md uppercase"
                                           type="reset"
                                         >
                                           reset
                                         </button>
                                       </div>
                                     </div>
                                   </form>
                                 </div>
                                )}
                                {selectedDiv === "pain_management" && (
                                  <></>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
