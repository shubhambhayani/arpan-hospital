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
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from "react-router-dom";
import pdf from "../element/pdf.jpg";

const initialFormData = {
  name: '',
  age: '',
  gender: '',
  occupation: '',
  address: '',
  domSide: "",
  chfCmp: '',
  hyperTense: 0,
  diabetes: 0,
  thyroid: 0,
  asthama: 0,
  others: 0,
  other_p_value: '',
  other_p_value_2: '',
  pastSurg: '',
  presentSurg: '',
  siteLoca: '',
  side: '',
  dull: 0,
  cramp: 0,
  sharpShoot: 0,
  burn: 0,
  throb: 0,
  numb: 0,
  tingling: 0,
  freqNature: '',
  duration: 'acute',
  painAgrFact: '',
  painRelFact: '',
  intensity: '',
  observation: '',
  tend: 0,
  crepitus: 0,
  scar: 'heal',
  swelling: 0,
  palpOthers: 0,
  examination: '',
  investRadioFinding: '',
  medDiagno: '',
  phyDiagno: '',
  ObjTreatment: '',
  remark: '',
  typeother:'',
  other_p_value_3:'',
  dob:'',
  study: ""
};

const initialFormData_1 = {
  acidity: "",
  address: "",
  cyc: "",
  d_time: "",
  d_what: "",
  dada: "",
  dia: "",
  dob: "",
  fact_loss: "",
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
  name: "",
  o: "",
  o_time: "",
  o_what: "",
  occupation: "",
  other_p_value: "",
  phy: "",
  run: "",
  study: "",
  swe: "",
  thairoid: "",
  w_time: "",
  w_what: "",
  walk: "",
  weight__up: "",
  weight_down: "",
  work: "",
  yoga: "",
  dayabitis: "",
  remark: "",
  other_p:"",
  other_p_1:""
};

const initialFormData_2 = {
  name: '',
  age: '',
  gender: '',
  occupation: '',
  address: '',
  domSide: '',
  chfCmp: '',
  hyperTense: 0,
  diabetes: 0,
  thyroid: 0,
  asthama: 0,
  others: 0,
  other_p_value: '',
  other_p_value_2: '',
  pastSurg: '',
  presentSurg: '',
  siteLoca: '',
  side: '',
  dull: 0,
  cramp: 0,
  sharpShoot: 0,
  burn: 0,
  throb: 0,
  numb: 0,
  tingling: 0,
  freqNature: '',
  duration: 'acute',
  painAgrFact: '',
  painRelFact: '',
  intensity: '',
  observation: '',
  tend: 0,
  crepitus: 0,
  scar: 'heal',
  swelling: 0,
  palpOthers: 0,
  examination: '',
  investRadioFinding: '',
  medDiagno: '',
  phyDiagno: '',
  ObjTreatment: '',
  remark: '',
  typeother:'',
  other_p_value_3:'',
  dob:'',
  study: "",
};

const initialFormData_3 = {
  name: '',
  age: '',
  gender: '',
  occupation: '',
  address: '',
  domSide: '',
  chfCmp: '',
  hyperTense: 0,
  diabetes: 0,
  thyroid: 0,
  asthama: 0,
  others: 0,
  other_p_value: '',
  other_p_value_2: '',
  pastSurg: '',
  presentSurg: '',
  siteLoca: '',
  side: '',
  dull: 0,
  cramp: 0,
  sharpShoot: 0,
  burn: 0,
  throb: 0,
  numb: 0,
  tingling: 0,
  freqNature: '',
  duration: 'acute',
  painAgrFact: '',
  painRelFact: '',
  intensity: '',
  observation: '',
  tend: 0,
  crepitus: 0,
  scar: 'heal',
  swelling: 0,
  palpOthers: 0,
  examination: '',
  investRadioFinding: '',
  medDiagno: '',
  phyDiagno: '',
  ObjTreatment: '',
  remark: '',
  typeother:'',
  other_p_value_3:'',
  dob:'',
  study: ""
};
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
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState({
    patient_id: "",
    appointment_id: "",
    name: "",
    age: "",
    gender: "",
    contact:"",
    appointment_date: "",
    appointment_time: "",
  });
  const [buttonEnabled, setButtonEnabled] = useState(false);
  
  const images = {
    physiotherapy: physiotherapy,
    weight_loss: image2,
    pain_management: pain_managment,
    fitness: image4,
  };

  const getImageForCategory = (category) => {
    const formattedCategory = category.toLowerCase().replace(' ', '_');
    return images[formattedCategory];
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formData_1, setFormData_1] = useState(initialFormData_1);
  const [formData_2, setFormData_2] = useState(initialFormData_2);
  const [formData_3, setFormData_3] = useState(initialFormData_3);

  const handleDivClick = (category) => {
    setSelectedDiv(category);
  };
  useEffect(() => {
  if(formData.scar == "")
    {
      setFormData({ scar: 'heal' });
    }
    if(formData_2.scar == "")
      {
        setFormData_2({ scar: 'heal' });
      }
      if(formData_3.scar == "")
        {
          setFormData_3({ scar: 'heal' });
        }
        if(formData_3.duration == "")
          {
            setFormData_3({ duration: 'acute' });
          }
          if(formData_2.duration == "")
            {
              setFormData_2({ duration: 'acute' });
            }
            if(formData.duration == "")
              {
                setFormData({ duration: 'acute' });
              }
  }, [selectedDiv])

  const openModal = (
    name,
    patient_id,
    appointment_id,
    category,
    age,
    gender,
    contact,
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
      contact,
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
    setButtonEnabled(false);
    setPdfFiles([]);
    setSelectedImages([]);
  setFormData(initialFormData);
  setFormData_1(initialFormData_1);
  setFormData_2(initialFormData_2);
  setFormData_3(initialFormData_3);
    setLoad1(false);
    fetchData();
  };

  const generateChartData = () => {
    const labels = [];
    const chartData = [];

    let totalCount = 0;
    if (count.appointments_today) {
      Object.values(count.appointments_today).forEach((count) => {
        totalCount += count;
      });
    }

    if (count.appointments_today) {
      Object.entries(count.appointments_today).forEach(([category, count]) => {
        const percentage = (count / totalCount) * 100;
        labels.push(category);
        chartData.push(percentage.toFixed(2));
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
    setPdfFiles([]);
    setButtonEnabled(false);
    if (selectedDiv === "weight loss") {
      try {
        const response = await axios.get(
          `https://arpanhospital.online/appoi_by_id.php?patient_id=${patientId}`
        );
        const appointmentData = response.data.appointment;
        if (response?.data?.status === "error") {
          setButton(true);
          return;
        }
        setFormData_1({
          acidity: appointmentData.acidity,
          address: appointmentData.address,
          blood: appointmentData.blood,
          cyc: appointmentData.cyc,
          d_time: appointmentData.d_time,
          d_what: appointmentData.d_what,
          dada: appointmentData.dada,
          dia: appointmentData.dia,
          dob: appointmentData.dob,
          fact_loss: appointmentData.fact_loss,
          other_p: appointmentData.other_p,
          other_p_1: appointmentData.other_p_1,
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
          name: appointmentData.name,
          o: appointmentData.o,
          o_time: appointmentData.o_time,
          o_what: appointmentData.o_what,
          occupation: appointmentData.occupation,
          other_p_value: appointmentData.other_p_value,
          phy: appointmentData.phy,
          run: appointmentData.run,
          study: appointmentData.study,
          swe: appointmentData.swe,
          thairoid: appointmentData.thairoid,
          w_time: appointmentData.w_time,
          w_what: appointmentData.w_what,
          walk: appointmentData.walk,
          walk_how: appointmentData.walk_how,
          walk_when: appointmentData.walk_when,
          weight__up: appointmentData.weight__up,
          weight_down: appointmentData.weight_down,
          work: appointmentData.work,
          yoga: appointmentData.yoga,
          name: appointmentData.name,
          dayabitis: appointmentData.dayabitis,
          remark: appointmentData.remark,
        });
        setSelectedImages(appointmentData?.photos);
        setPdfFiles(appointmentData?.pdf_files);
        setLoad1(false);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoad1(false);
      }
      return;
    }
    if (selectedDiv === "physiotherapy") {
      try {
        const response = await axios.get(
          `https://arpanhospital.online/py_by_id.php?patient_id=${patientId}`
        );
        const appointmentData = response.data.appointment;
        if (response?.data?.status === "error") {
          setButton(true);
          return;
        }
        setFormData({
          occupation: appointmentData.occupation,
          address: appointmentData.address,
          study: appointmentData.study,
          domSide: appointmentData.domSide,
          chfCmp: appointmentData.chfCmp,
          hyperTense: appointmentData.hyperTense,
          diabetes: appointmentData.diabetes,
          thyroid: appointmentData.thyroid,
          asthama: appointmentData.asthama,
          others: appointmentData.others,
          other_p_value: appointmentData.other_p_value,
          other_p_value_2: appointmentData.other_p_value_2,
          pastSurg: appointmentData.pastSurg,
          presentSurg: appointmentData.presentSurg,
          siteLoca: appointmentData.siteLoca,
          side: appointmentData.side,
          dull: appointmentData.dull,
          cramp: appointmentData.cramp,
          sharpShoot: appointmentData.sharpShoot,
          burn: appointmentData.burn,
          throb: appointmentData.throb,
          numb: appointmentData.numb,
          dob:appointmentData.dob,
          tingling: appointmentData.tingling,
          freqNature: appointmentData.freqNature,
          duration: appointmentData.duration,
          painAgrFact: appointmentData.painAgrFact,
          painRelFact: appointmentData.painRelFact,
          intensity: appointmentData.intensity,
          observation: appointmentData.observation,
          tend: appointmentData.tend,
          crepitus: appointmentData.crepitus,
          scar: appointmentData.scar,
          swelling: appointmentData.swelling,
          palpOthers: appointmentData.palpOthers,
          examination: appointmentData.examination,
          investRadioFinding: appointmentData.investRadioFinding,
          medDiagno: appointmentData.medDiagno,
          phyDiagno: appointmentData.phyDiagno,
          ObjTreatment: appointmentData.ObjTreatment,
          remark: appointmentData.remark,
          typeother:appointmentData.typeother,
          other_p_value_3:appointmentData.other_p_value_3
        });
        setSelectedImages(appointmentData?.photos);
        setPdfFiles(appointmentData?.pdf_files);
        setLoad1(false);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoad1(false);
      }
      return
    }
    if (selectedDiv === "pain management") {
      try {
        const response = await axios.get(
          `https://arpanhospital.online/pain_by_id.php?patient_id=${patientId}`
        );
        const appointmentData = response.data.appointment;
        if (response?.data?.status === "error") {
          setButton(true);
          return;
        }
        setFormData_2({
          name: appointmentData.name,
          age: appointmentData.age,
          gender: appointmentData.gender,
          occupation: appointmentData.occupation,
          study: appointmentData.study,
          address: appointmentData.address,
          domSide: appointmentData.domSide,
          chfCmp: appointmentData.chfCmp,
          hyperTense: appointmentData.hyperTense,
          typeother:appointmentData.typeother,
          other_p_value_3:appointmentData.other_p_value_3,
          diabetes: appointmentData.diabetes,
          thyroid: appointmentData.thyroid,
          asthama: appointmentData.asthama,
          others: appointmentData.others,
          other_p_value: appointmentData.other_p_value,
          other_p_value_2: appointmentData.other_p_value_2,
          pastSurg: appointmentData.pastSurg,
          presentSurg: appointmentData.presentSurg,
          siteLoca: appointmentData.siteLoca,
          side: appointmentData.side,
          dull: appointmentData.dull,
          cramp: appointmentData.cramp,
          sharpShoot: appointmentData.sharpShoot,
          burn: appointmentData.burn,
          throb: appointmentData.throb,
          numb: appointmentData.numb,
          dob:appointmentData.dob,
          tingling: appointmentData.tingling,
          freqNature: appointmentData.freqNature,
          duration: appointmentData.duration,
          painAgrFact: appointmentData.painAgrFact,
          painRelFact: appointmentData.painRelFact,
          intensity: appointmentData.intensity,
          observation: appointmentData.observation,
          tend: appointmentData.tend,
          crepitus: appointmentData.crepitus,
          scar: appointmentData.scar,
          swelling: appointmentData.swelling,
          palpOthers: appointmentData.palpOthers,
          examination: appointmentData.examination,
          investRadioFinding: appointmentData.investRadioFinding,
          medDiagno: appointmentData.medDiagno,
          phyDiagno: appointmentData.phyDiagno,
          ObjTreatment: appointmentData.ObjTreatment,
          remark: appointmentData.remark
        });
        setSelectedImages(appointmentData?.photos);
        setPdfFiles(appointmentData?.pdf_files);
        setLoad1(false);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoad1(false);
        return;
      }
    }
    if (selectedDiv === "fitness") {
      try {
        const response = await axios.get(
          `https://arpanhospital.online/fitness_by_id.php?patient_id=${patientId}`
        );
        const appointmentData = response.data.appointment;
        if (response?.data?.status === "error") {
          setButton(true);
          return;
        }
        setFormData_3({
          name: appointmentData.name,
          age: appointmentData.age,
          gender: appointmentData.gender,
          occupation: appointmentData.occupation,
          study: appointmentData.study,
          address: appointmentData.address,
          domSide: appointmentData.domSide,
          chfCmp: appointmentData.chfCmp,
          hyperTense: appointmentData.hyperTense,
          diabetes: appointmentData.diabetes,
          thyroid: appointmentData.thyroid,
          asthama: appointmentData.asthama,
          others: appointmentData.others,
          other_p_value: appointmentData.other_p_value,
          other_p_value_2: appointmentData.other_p_value_2,
          pastSurg: appointmentData.pastSurg,
          presentSurg: appointmentData.presentSurg,
          siteLoca: appointmentData.siteLoca,
          side: appointmentData.side,
          dull: appointmentData.dull,
          cramp: appointmentData.cramp,
          sharpShoot: appointmentData.sharpShoot,
          burn: appointmentData.burn,
          throb: appointmentData.throb,
          numb: appointmentData.numb,
          tingling: appointmentData.tingling,
          freqNature: appointmentData.freqNature,
          duration: appointmentData.duration,
          painAgrFact: appointmentData.painAgrFact,
          painRelFact: appointmentData.painRelFact,
          intensity: appointmentData.intensity,
          observation: appointmentData.observation,
          tend: appointmentData.tend,
          dob:appointmentData.dob,
          crepitus: appointmentData.crepitus,
          scar: appointmentData.scar,
          swelling: appointmentData.swelling,
          palpOthers: appointmentData.palpOthers,
          examination: appointmentData.examination,
          investRadioFinding: appointmentData.investRadioFinding,
          medDiagno: appointmentData.medDiagno,
          phyDiagno: appointmentData.phyDiagno,
          ObjTreatment: appointmentData.ObjTreatment,
          remark: appointmentData.remark,
          typeother:appointmentData.typeother,
          other_p_value_3:appointmentData.other_p_value_3
        });
        setSelectedImages(appointmentData?.photos);
        setPdfFiles(appointmentData?.pdf_files);
        setLoad1(false);
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
    if (selectedDiv == "weight loss") {
      try {
        const doc = new jsPDF();
        doc.setFontSize(13);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        const addPageBorder = () => {
            doc.rect(5, 5, pageWidth - 10, pageHeight - 10, 'S');
        };
        
        doc.setFontSize(15);
        doc.setTextColor(127, 29, 29);
        doc.text("ARPAN ADVANCED PHYSIOTHERAPY & FITNESS CENTER", pageWidth / 2, 12, { align: "center" });
        doc.setFontSize(13);
        doc.setTextColor(22, 78, 99);
        doc.text("WEIGHT LOSS", pageWidth / 2, 22, { align: "center" });
        
        const fields = [
            { label: "Appointment Date", value: moment(selectedPatientId.appointment_date).format("DD/MM/YYYY") },
            { label: "Remarks", value: formData_1.remark },
            { label: "Name", value: selectedPatientId.name },
            { label: "Age", value: selectedPatientId.age },
            { label: "Dob", value: moment(formData_1.dob).format("DD/MM/YYYY") },
            { label: "Contact", value: selectedPatientId.contact },
            { label: "Education", value: formData_1.study },
            { label: "Occupation", value: formData_1.occupation },
            { label: "Address", value: formData_1.address },
            { title: "MEDICAL HISTORY", colSpan: 2 },
            { label: "1) Hypertension", value: formData_1.blood == 1 ? "Yes" : "No" },
            { label: "2) Asthma", value: formData_1.acidity == 1 ? "Yes" : "No" },
            { label: "3) Diabetes", value: formData_1.kabajiyat == 1 ? "Yes" : "No" },
            { label: "4) Heart Disease", value: formData_1.heart == 1 ? "Yes" : "No" },
            { label: "5) Thyroid", value: formData_1.thairoid == 1 ? "Yes" : "No" },
            { label: "6) Other History", value: formData_1.other_p_value !== "" ? formData_1.other_p_value : " --- " },
            { label: "7) Past History", value: formData_1.dayabitis !== "" ? formData_1.dayabitis : " --- " },
            { title: "NEED", colSpan: 2 },
            { label: "1) Health", value: formData_1.health == 1 ? "Yes" : "No" },
            { label: "2) Fitness", value: formData_1.fitness == 1 ? "Yes" : "No" },
            { label: "3) Physique", value: formData_1.thyroid == 1 ? "Yes" : "No" },
            { label: "4) Weight Loss", value: formData_1.weight_down == 1 ? "Yes" : "No" },
            { label: "5) Fat Loss", value: formData_1.fact_loss == 1 ? "Yes" : "No" },
            { label: "6) Weight Gain", value: formData_1.weight__up == 1 ? "Yes" : "No" },
            { label: "7) Other Need", value: formData_1.dia !== "" ? formData_1.dia : " --- " },
            { title: "EXTRA ACTIVITIES", colSpan: 2 },
            { label: "1) Walking", value: formData_1.walk == 1 ? "Yes" : "No" },
            { label: "2) Running", value: formData_1.run == 1 ? "Yes" : "No" },
            { label: "3) Yoga", value: formData_1.yoga == 1 ? "Yes" : "No" },
            { label: "4) Swimming", value: formData_1.swe == 1 ? "Yes" : "No" },
            { label: "5) Cycling", value: formData_1.cyc == 1 ? "Yes" : "No" },
            { label: "6) Aerobics", value: formData_1.machine == 1 ? "Yes" : "No" },
            { label: "7) Gym/Treadmill", value: formData_1.o == 1 ? "Yes" : "No" },
            { label: "8) Other Extra Activities", value: formData_1.other_p !== "" ? formData_1.other_p : " --- " },
            { title: "ROUTINE ACTIVITIES", colSpan: 2 },
            { label: "1) Stair Climbing", value: formData_1.dada == 1 ? "Yes" : "No" },
            { label: "2) Household Work", value: formData_1.work == 1 ? "Yes" : "No" },
            { label: "3) Other Routine Activities", value: formData_1.other_p_1 !== "" ? formData_1.other_p_1 : " --- " },
        ];
        
        const tableRows = [];
        fields.forEach(field => {
            if (field.title) {
                const row = [{ content: field.title, colSpan: field.colSpan || 2, styles: { fontStyle: 'bold', fontSize: 14, textColor: [50, 50, 255], halign: 'center' } }];
                tableRows.push(row);
            } else {
                const row = [field.label, field.value];
                tableRows.push(row);
            }
        });
        
        addPageBorder(); 
        
        doc.autoTable({
            head: [],
            body: tableRows,
            startY: 25,
            theme: 'grid',
            styles: { overflow: 'linebreak', cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 50, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99] },
                1: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0] },
            },
            didDrawPage: addPageBorder  // Ensure the border is added to each page
        });
        
        const foodData = [
            { food: "Breakfast", time: formData_1.m_time, content: formData_1.m_what },
            { food: "Lunch", time: formData_1.l_time, content: formData_1.l_what },
            { food: "Dinner", time: formData_1.d_time, content: formData_1.d_what },
            { food: "In Between Diet", time: formData_1.o_time, content: formData_1.o_what },
        ];
        
        const foodTableRows = [];
        foodData.forEach(item => {
            foodTableRows.push([item.food, item.time, item.content]);
        });
        
        const newTableTitleY = doc.autoTable.previous.finalY + 6;
        doc.setFontSize(14);
        doc.setTextColor(50, 50, 255);
        doc.setFont('helvetica', 'bold');
        doc.text("DIET HISTORY", pageWidth / 2, newTableTitleY, { align: "center" });
        
        doc.autoTable({
            head: [[{ content: 'Food', styles: { halign: 'center' } }, { content: 'Time', styles: { halign: 'center' } }, { content: 'Content', styles: { halign: 'center' } }]],
            body: foodTableRows,
            startY: newTableTitleY + 3, // Start after the previous table
            theme: 'grid',
            styles: { overflow: 'linebreak', cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 50, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99], halign: 'center' },
                1: { cellWidth: 50, fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0], halign: 'center' },
                2: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0], halign: 'center' },
            },
            didDrawPage: addPageBorder  // Ensure the border is added to each page
        });
        
        const newTableTitleY_1 = doc.autoTable.previous.finalY + 3;
        doc.autoTable({
            head: [[{ content: 'Water', styles: { halign: 'center' } }, { content: 'How many glasses/day?', styles: { halign: 'center' } }, { content: 'At what time?', styles: { halign: 'center' } }]],
            body: [["Water", formData_1.w_time, formData_1.w_what]],
            startY: newTableTitleY_1,
            theme: 'grid',
            styles: { overflow: 'linebreak', cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 20, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99], halign: 'center' },
                1: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0], halign: 'center' },
                2: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0], halign: 'center' },
            },
            didDrawPage: addPageBorder  // Ensure the border is added to each page
        });



const pdfData = doc.output('arraybuffer'); // Get PDF data as array buffer
const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
      
        const formDataObject = new FormData();
        formDataObject.append("patient_id", selectedPatientId.patient_id);
        formDataObject.append(
          "appointment_id",
          selectedPatientId.appointment_id
        );
        formDataObject.append("name", selectedPatientId.name);
        formDataObject.append("age", selectedPatientId.age);
        formDataObject.append("gender", selectedPatientId.gender);
        formDataObject.append("acidity", formData_1.acidity);
        formDataObject.append("contact", selectedPatientId.contact);
        formDataObject.append("occupation", formData_1.occupation);
        formDataObject.append("address", formData_1.address);
        formDataObject.append("dayabitis", formData_1.dayabitis);
        formDataObject.append("cyc", formData_1.cyc);
       
        formDataObject.append("d_time", formData_1.d_time);
        formDataObject.append("d_what", formData_1.d_what);
        formDataObject.append("dada", formData_1.dada);
       
        formDataObject.append("dia", formData_1.dia);
        formDataObject.append("dob", formData_1.dob);
        formDataObject.append("fact_loss", formData_1.fact_loss);
        formDataObject.append("other_p", formData_1.other_p);
        formDataObject.append("other_p_1", formData_1.other_p_1);
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
     
        formDataObject.append("o", formData_1.o);
   
        formDataObject.append("o_time", formData_1.o_time);
        formDataObject.append("o_what", formData_1.o_what);

        formDataObject.append("other_p_value", formData_1.other_p_value);
        formDataObject.append("phy", formData_1.phy);
        formDataObject.append("run", formData_1.run);
      
        formDataObject.append("study", formData_1.study);
        formDataObject.append("swe", formData_1.swe);
    
        formDataObject.append("thairoid", formData_1.thairoid);
       
        formDataObject.append("w_time", formData_1.w_time);
        formDataObject.append("w_what", formData_1.w_what);
        formDataObject.append("walk", formData_1.walk);
       
        formDataObject.append("weight__up", formData_1.weight__up);
        formDataObject.append("weight_down", formData_1.weight_down);
        formDataObject.append("work", formData_1.work);
        formDataObject.append("yoga", formData_1.yoga);
        formDataObject.append("remark", formData_1.remark);
        formDataObject.append(
          "report_pdf",
          pdfBlob,
          `${selectedPatientId.patient_id}_3.pdf`
        );
        selectedImages.forEach((image, index) => {
          if (typeof image === "string") {
            formDataObject.append("images[]", image);
          } else {
            formDataObject.append("images[]", image.file);
          }
        });
        const response = await axios.post(
          "https://arpanhospital.online/appointment_book.php",
          formDataObject
        );
        closeModal();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
    else if (selectedDiv == "physiotherapy") {
      try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const addPageBorder = () => {
          doc.rect(5, 5, pageWidth - 10, pageHeight - 10, 'S');
      };
        doc.setFontSize(15);
        doc.setTextColor(0,0,0);
        doc.text("ARPAN ADVANCED PHYSIOTHERAPY & FITNESS CENTER", pageWidth / 2, 12, { align: "center" });
        doc.setFontSize(13);
        doc.setTextColor(127, 29, 29);
        doc.text("PHYSIOTHERAPY", pageWidth / 2, 18, { align: "center" });
        doc.setFontSize(12);
        doc.setTextColor(255, 0, 0);
        doc.text("(A) SUBJECTIVE ASSESSMENT ", pageWidth / 2, 24, { align: "center" });
        
        const fields = [
          { label: "Appointment Date", value: moment(selectedPatientId.appointment_date).format("DD/MM/YYYY") },
          { label: "Remarks", value: formData.remark !== "" ? `${formData.remark}` : " --- "},
          { label: "Name", value: selectedPatientId.name },
          { label: "Age", value: selectedPatientId.age },
          { label: "Dob", value:formData.dob !== "" ? moment(formData.dob).format("DD/MM/YYYY") : " --- "},
          { label: "Gender", value: selectedPatientId.gender },
          { label: "Contact", value: selectedPatientId.contact },
          { label: "Education", value: formData.study },
          { label: "Occupation", value: formData.occupation },
          { label: "Address", value: formData.address },
          { label: "Dominant Side", value: formData.domSide },
          { label: "Chief Complain", value: formData.chfCmp },
          { title: " ", colSpan: 2 },
          { label: "MEDICAL HISTORY", value: '---' },
          { label: "1) Hypertension", value: formData.hyperTense == 1 ? "Yes" : "No" },
          { label: "2) Diabetes", value: formData.diabetes == 1 ? "Yes" : "No" },
          { label: "3) Thyroid", value: formData.thyroid == 1 ? "Yes" : "No" },
          { label: "4) Asthma", value: formData.asthama == 1 ? "Yes" : "No" },
          { label: "5) Other History", value: formData.other_p_value !== "" ? formData.other_p_value : " --- " },
          { title: " ", colSpan: 2 },
          { label: "PAST SURGICAL HISTORY", value: formData.pastSurg !== "" ? formData.pastSurg : " --- " },
          { label: "PRESENT SURGICAL HISTORY", value: formData.presentSurg !== "" ? formData.presentSurg : " --- " },
          { title: "PAIN EVALUATION", colSpan: 2 },
          { label: "Site/Location", value: formData.siteLoca !== "" ? formData.siteLoca : " --- " },
          { label: "Side", value: formData.side !== "" ? formData.side : " --- " },
          { label: "TYPE", value: '---' },
          { label: "1)Duallaching", value: formData.dull == 1 ? "Yes" : "No"},
          { label: "2)Cramping", value: formData.cramp == 1 ? "Yes" : "No"},
          { label: "3)Sharp Shooting", value: formData.sharpShoot == 1 ? "Yes" : "No"},
          { label: "4)Burning ", value: formData.burn == 1 ? "Yes" : "No"},
          { label: "5)Throbbing", value: formData.throb == 1 ? "Yes" : "No"},
          { label: "6)Numbness", value: formData.numb == 1 ? "Yes" : "No"},
          { label: "7)Tingling", value: formData.tingling == 1 ? "Yes" : "No"},
          { label: "8)Others Type", value:formData. other_p_value_3 !== "" ? formData.other_p_value_3 : " --- " },
          { label: "Frequency/Nature", value: formData.freqNature !== "" ? formData.freqNature : " --- " },
          { label: "Duration", value: formData.duration !== "" ? formData.duration : " --- " },
          { label: "Pain Aggravating Factor", value: formData.painAgrFact !== "" ? formData.painAgrFact : " --- " },
          { label: "Pain Relieving Factor", value: formData.painRelFact !== "" ? formData.painRelFact : " --- " },
          { label: "Intensity:(nprs)", value: formData.intensity !== "" ? formData.intensity : " --- " },
        { title: "***", colSpan: 2 },
        { label: "OBSERVATION", value: formData.observation !== "" ? `${formData.observation}` : " --- "},
        { label: "PALPATION", value: '---' },
        { label: "1)Tenderness", value: formData.tend == 1 ? "Yes" : "No"},
        { label: "2)Crepitus", value: formData.crepitus == 1 ? "Yes" : "No"},
        { label: " 3)Scar", value: formData.scar !== "" ? formData.scar : " --- "},
        { label: "4)Swelling ", value: formData.swelling == 1 ? "Yes" : "No" },
        { label: "5)other Palpation", value: formData.other_p_value_2 !== "" ? `${formData.other_p_value_2}` : " --- "},
        { title: " ", colSpan: 2 },
        { label: "EXAMINATION", value: formData.examination !== "" ? `${formData.examination}` : " --- "},
        { label: "INVESTIGATION/RADIOLOGICAL FINDINGS", value: formData.investRadioFinding !== "" ? `${formData.investRadioFinding}` : " --- "},
        { label: "MEDICAL DIAGNOSIS", value: formData.medDiagno !== "" ? `${formData.medDiagno}` : " --- "},
        { label: "PHYSIOTHERAPY DIAGNOSIS", value: formData.phyDiagno !== "" ? `${formData.phyDiagno}` : " --- "},
        { label: "TREATMENT", value: formData.ObjTreatment !== "" ? `${formData.ObjTreatment}` : " --- " },
        ];
        
        const tableRowsFirstPage = [];
        const tableRowsSecondPage = [];
        let isSecondPage = false;
        
        fields.forEach(field => {
            if (field.title) {
                const row = [{ content: field.title, colSpan: field.colSpan || 2, styles: { fontStyle: 'bold', fontSize: 14, textColor: field.styles?.textColor || [50, 50, 255], halign: 'center' } }];
                if (isSecondPage) {
                    tableRowsSecondPage.push(row);
                } else {
                    tableRowsFirstPage.push(row);
                }
            } else if (field.label) {
                const row = [field.label, field.value];
                if (isSecondPage) {
                    tableRowsSecondPage.push(row);
                } else {
                    tableRowsFirstPage.push(row);
                }
            }
            if (field.title == "***") {
                isSecondPage = true;
            }
        });
        
        // Add border to the first page
        addPageBorder();
        
        // Add the content for the first page
        doc.autoTable({
            head: [],
            body: tableRowsFirstPage,
            startY: 27,
            theme: 'grid',
            styles: { overflow: 'linebreak', cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 50, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99] },
                1: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0] }
            },
            didDrawPage: addPageBorder
        });
        
        doc.addPage();
        addPageBorder();
        doc.setTextColor(255, 0, 0);
        doc.text("(B) OBJECTIVE ASSESSMENT ", pageWidth / 2, 10, { align: "center" });
        // Add the content for the second page
        doc.autoTable({
            head: [],
            body: tableRowsSecondPage,
            startY: 15,
            theme: 'grid',
            styles: { overflow: 'linebreak', cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 50, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99] },
                1: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0] }
            },
            didDrawPage: addPageBorder
        });
        
        const pdfData = doc.output('arraybuffer'); // Get PDF data as array buffer
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

        const formDataObject = new FormData();
        formDataObject.append("patient_id", selectedPatientId.patient_id);
        formDataObject.append(
          "appointment_id",
          selectedPatientId.appointment_id
        );
        formDataObject.append("name", selectedPatientId.name);
        formDataObject.append("age", selectedPatientId.age);
        formDataObject.append("gender", selectedPatientId.gender);
        formDataObject.append("study", formData.study);
        formDataObject.append("dob", formData.dob);
        formDataObject.append("occupation", formData.occupation);
        formDataObject.append("address", formData.address);
        formDataObject.append("domSide", formData.domSide);
        formDataObject.append("chfCmp", formData.chfCmp);
        formDataObject.append("hyperTense", formData.hyperTense);
        formDataObject.append("diabetes", formData.diabetes);
        formDataObject.append("thyroid", formData.thyroid);
        formDataObject.append("asthama", formData.asthama);
        formDataObject.append("others", formData.others);
        formDataObject.append("contact", selectedPatientId.contact);
        formDataObject.append("other_p_value", formData.other_p_value);
        formDataObject.append("other_p_value_2", formData.other_p_value_2);
        formDataObject.append("other_p_value_3", formData.other_p_value_3);
        formDataObject.append("typeother", formData.typeother);
        formDataObject.append("pastSurg", formData.pastSurg);
        formDataObject.append("presentSurg", formData.presentSurg);
        formDataObject.append("siteLoca", formData.siteLoca);
        formDataObject.append("side", formData.side);
        formDataObject.append("dull", formData.dull);
        formDataObject.append("cramp", formData.cramp);
        formDataObject.append("sharpShoot", formData.sharpShoot);
        formDataObject.append("burn", formData.burn);
        formDataObject.append("throb", formData.throb);
        formDataObject.append("numb", formData.numb);
        formDataObject.append("tingling", formData.tingling);
        formDataObject.append("freqNature", formData.freqNature);
        formDataObject.append("duration", formData.duration);
        formDataObject.append("painAgrFact", formData.painAgrFact);
        formDataObject.append("painRelFact", formData.painRelFact);
        formDataObject.append("intensity", formData.intensity);
        formDataObject.append("observation", formData.observation);
        formDataObject.append("tend", formData.tend);
        formDataObject.append("crepitus", formData.crepitus);
        formDataObject.append("scar", formData.scar);
        formDataObject.append("swelling", formData.swelling);
        formDataObject.append("palpOthers", formData.palpOthers);
        formDataObject.append("examination", formData.examination);
        formDataObject.append("investRadioFinding", formData.investRadioFinding);
        formDataObject.append("medDiagno", formData.medDiagno);
        formDataObject.append("phyDiagno", formData.phyDiagno);
        formDataObject.append("ObjTreatment", formData.ObjTreatment);
        formDataObject.append("remark", formData.remark);
        formDataObject.append(
          "report_pdf",
          pdfBlob,
          `${selectedPatientId.patient_id}_1.pdf`
        );
        selectedImages.forEach((image, index) => {
          if (typeof image === "string") {
            formDataObject.append("images[]", image);
          } else {
            formDataObject.append("images[]", image.file);
          }
        });
        const response = await axios.post(
          "https://arpanhospital.online/appointment_book_py.php",
          formDataObject
        );
        closeModal();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
    else if (selectedDiv == "pain management") {
      try {  
        const doc = new jsPDF();
        doc.setFontSize(13);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const addPageBorder = () => {
          doc.rect(5, 5, pageWidth - 10, pageHeight - 10, 'S');
      };
      doc.setFontSize(15);
      doc.setTextColor(0,0,0);
      doc.text("ARPAN ADVANCED PHYSIOTHERAPY & FITNESS CENTER", pageWidth / 2, 12, { align: "center" });
       doc.setFontSize(13);
      doc.setTextColor(127, 29, 29);
      doc.text("PAIN MANAGEMENT", pageWidth / 2, 18, { align: "center" });
        doc.setFontSize(12);
      doc.setTextColor(255, 0, 0);
      doc.text("(A) SUBJECTIVE ASSESSMENT ", pageWidth / 2, 24, { align: "center" });
        
        const fields = [
          { label: "Appointment Date", value: moment(selectedPatientId.appointment_date).format("DD/MM/YYYY") },
          { label: "Remarks", value: formData_2.remark !== "" ? `${formData_2.remark}` : " --- "},
          { label: "Name", value: selectedPatientId.name },
          { label: "Age", value: selectedPatientId.age },
          { label: "Dob", value:formData_3.dob !== "" ? moment(formData_2.dob).format("DD/MM/YYYY") : " --- "},
          { label: "Gender", value: selectedPatientId.gender },
          { label: "Contact", value: selectedPatientId.contact },
          { label: "Education", value: formData_2.study },
          { label: "Occupation", value: formData_2.occupation },
          { label: "Address", value: formData_2.address },
          { label: "Dominant Side", value: formData_2.domSide },
          { label: "Chief Complain", value: formData_2.chfCmp },
          { title: " ", colSpan: 2 },
          { label: "MEDICAL HISTORY", value: '---' },
          { label: "1) Hypertension", value: formData_2.hyperTense == 1 ? "Yes" : "No" },
          { label: "2) Diabetes", value: formData_2.diabetes == 1 ? "Yes" : "No" },
          { label: "3) Thyroid", value: formData_2.thyroid == 1 ? "Yes" : "No" },
          { label: "4) Asthma", value: formData_2.asthama == 1 ? "Yes" : "No" },
          { label: "5) Other History", value: formData_2.other_p_value !== "" ? formData_2.other_p_value : " --- " },
          { title: " ", colSpan: 2 },
          { label: "PAST SURGICAL HISTORY", value: formData_2.pastSurg !== "" ? formData_2.pastSurg : " --- " },
          { label: "PRESENT SURGICAL HISTORY", value: formData_2.presentSurg !== "" ? formData_2.presentSurg : " --- " },
          { title: "PAIN EVALUATION", colSpan: 2 },
          { label: "Site/Location", value: formData_2.siteLoca !== "" ? formData_2.siteLoca : " --- " },
          { label: "Side", value: formData_2.side !== "" ? formData_2.side : " --- " },
          { label: "TYPE", value: '---' },
          { label: "1)Duallaching", value: formData_2.dull == 1 ? "Yes" : "No"},
          { label: "2)Cramping", value: formData_2.cramp == 1 ? "Yes" : "No"},
          { label: "3)Sharp Shooting", value: formData_2.sharpShoot == 1 ? "Yes" : "No"},
          { label: "4)Burning ", value: formData_2.burn == 1 ? "Yes" : "No"},
          { label: "5)Throbbing", value: formData_2.throb == 1 ? "Yes" : "No"},
          { label: "6)Numbness", value: formData_2.numb == 1 ? "Yes" : "No"},
          { label: "7)Tingling", value: formData_2.tingling == 1 ? "Yes" : "No"},
          { label: "8)Others Type", value:formData_2. other_p_value_3 !== "" ? formData_2.other_p_value_3 : " --- " },
          { label: "Frequency/Nature", value: formData_2.freqNature !== "" ? formData_2.freqNature : " --- " },
          { label: "Duration", value: formData_2.duration !== "" ? formData_2.duration : " --- " },
          { label: "Pain Aggravating Factor", value: formData_2.painAgrFact !== "" ? formData_2.painAgrFact : " --- " },
          { label: "Pain Relieving Factor", value: formData_2.painRelFact !== "" ? formData_2.painRelFact : " --- " },
          { label: "Intensity:(nprs)", value: formData_2.intensity !== "" ? formData_2.intensity : " --- " },
        { title: "***", colSpan: 2 },
        { label: "OBSERVATION", value: formData_2.observation !== "" ? `${formData_2.observation}` : " --- "},
        { label: "PALPATION", value: '---' },
        { label: "1)Tenderness", value: formData_2.tend == 1 ? "Yes" : "No"},
        { label: "2)Crepitus", value: formData_2.crepitus == 1 ? "Yes" : "No"},
        { label: " 3)Scar", value: formData_2.scar !== "" ? formData_2.scar : " --- "},
        { label: "4)Swelling ", value: formData_2.swelling == 1 ? "Yes" : "No" },
        { label: "5)other Palpation", value: formData_2.other_p_value_2 !== "" ? `${formData_2.other_p_value_2}` : " --- "},
        { title: " ", colSpan: 2 },
        { label: "EXAMINATION", value: formData_2.examination !== "" ? `${formData_2.examination}` : " --- "},
        { label: "INVESTIGATION/RADIOLOGICAL FINDINGS", value: formData_2.investRadioFinding !== "" ? `${formData_2.investRadioFinding}` : " --- "},
        { label: "MEDICAL DIAGNOSIS", value: formData_2.medDiagno !== "" ? `${formData_2.medDiagno}` : " --- "},
        { label: "PHYSIOTHERAPY DIAGNOSIS", value: formData_2.phyDiagno !== "" ? `${formData_2.phyDiagno}` : " --- "},
        { label: "TREATMENT", value: formData_2.ObjTreatment !== "" ? `${formData_2.ObjTreatment}` : " --- " },
        ];

        const tableRowsFirstPage = [];
        const tableRowsSecondPage = [];
        let isSecondPage = false;
        
        fields.forEach(field => {
            if (field.title) {
                const row = [{ content: field.title, colSpan: field.colSpan || 2, styles: { fontStyle: 'bold', fontSize: 14, textColor: field.styles?.textColor || [50, 50, 255], halign: 'center' } }];
                if (isSecondPage) {
                    tableRowsSecondPage.push(row);
                } else {
                    tableRowsFirstPage.push(row);
                }
            } else if (field.label) {
                const row = [field.label, field.value];
                if (isSecondPage) {
                    tableRowsSecondPage.push(row);
                } else {
                    tableRowsFirstPage.push(row);
                }
            }
            if (field.title == "***") {
                isSecondPage = true;
            }
        });
        
        // Add border to the first page
        addPageBorder(); 
        
        // Add the content for the first page
        doc.autoTable({
            head: [],
            body: tableRowsFirstPage,
            startY: 27,
            theme: 'grid',
            styles: { overflow: 'linebreak', cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 50, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99] },
                1: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0] }
            },
            didDrawPage: addPageBorder
        });
        
        doc.addPage();
        doc.rect(5, 5, pageWidth - 10, pageHeight - 10, 'S');
        doc.setTextColor(255, 0, 0);
        doc.text("(B) OBJECTIVE ASSESSMENT ", pageWidth / 2, 10, { align: "center" });
        // Add the content for the second page
        doc.autoTable({
            head: [],
            body: tableRowsSecondPage,
            startY: 15,
            theme: 'grid',
            styles: { overflow: 'linebreak', cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 50, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99] },
                1: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0] }
            },
            didDrawPage: addPageBorder
        });
        
        const pdfData = doc.output('arraybuffer'); // Get PDF data as array buffer
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

        const formDataObject = new FormData();
        formDataObject.append("patient_id", selectedPatientId.patient_id);
        formDataObject.append(
          "appointment_id",
          selectedPatientId.appointment_id
        );
        formDataObject.append("name", selectedPatientId.name);
        formDataObject.append("age", selectedPatientId.age);
        formDataObject.append("gender", selectedPatientId.gender);
        formDataObject.append("study", formData_2.study);
        formDataObject.append("dob", formData_2.dob);
        formDataObject.append("contact", selectedPatientId.contact);
        formDataObject.append("occupation", formData_2.occupation);
        formDataObject.append("address", formData_2.address);
        formDataObject.append("domSide", formData_2.domSide);
        formDataObject.append("chfCmp", formData_2.chfCmp);
        formDataObject.append("hyperTense", formData_2.hyperTense);
        formDataObject.append("diabetes", formData_2.diabetes);
        formDataObject.append("thyroid", formData_2.thyroid);
        formDataObject.append("asthama", formData_2.asthama);
        formDataObject.append("others", formData_2.others);
        formDataObject.append("other_p_value", formData_2.other_p_value);
        formDataObject.append("other_p_value_2", formData_2.other_p_value_2);
        formDataObject.append("pastSurg", formData_2.pastSurg);
        formDataObject.append("presentSurg", formData_2.presentSurg);
        formDataObject.append("siteLoca", formData_2.siteLoca);
        formDataObject.append("side", formData_2.side);
        formDataObject.append("dull", formData_2.dull);
        formDataObject.append("cramp", formData_2.cramp);
        formDataObject.append("sharpShoot", formData_2.sharpShoot);
        formDataObject.append("burn", formData_2.burn);
        formDataObject.append("throb", formData_2.throb);
        formDataObject.append("numb", formData_2.numb);
        formDataObject.append("tingling", formData_2.tingling);
        formDataObject.append("freqNature", formData_2.freqNature);
        formDataObject.append("duration", formData_2.duration);
        formDataObject.append("other_p_value_3", formData_2.other_p_value_3);
        formDataObject.append("typeother", formData_2.typeother);
        formDataObject.append("painAgrFact", formData_2.painAgrFact);
        formDataObject.append("painRelFact", formData_2.painRelFact);
        formDataObject.append("intensity", formData_2.intensity);
        formDataObject.append("observation", formData_2.observation);
        formDataObject.append("tend", formData_2.tend);
        formDataObject.append("crepitus", formData_2.crepitus);
        formDataObject.append("scar", formData_2.scar);
        formDataObject.append("swelling", formData_2.swelling);
        formDataObject.append("palpOthers", formData_2.palpOthers);
        formDataObject.append("examination", formData_2.examination);
        formDataObject.append("investRadioFinding", formData_2.investRadioFinding);
        formDataObject.append("medDiagno", formData_2.medDiagno);
        formDataObject.append("phyDiagno", formData_2.phyDiagno);
        formDataObject.append("ObjTreatment", formData_2.ObjTreatment);
        formDataObject.append("remark", formData_2.remark);
        formDataObject.append(
          "report_pdf",
          pdfBlob,
          `${selectedPatientId.patient_id}_4.pdf`
        );
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
        closeModal();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
    else {
      try {
const doc = new jsPDF();
doc.setFontSize(13);
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const addPageBorder = () => {
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10, 'S');
};
doc.setFontSize(15);
doc.setTextColor(0,0,0);
doc.text("ARPAN ADVANCED PHYSIOTHERAPY & FITNESS CENTER", pageWidth / 2, 12, { align: "center" });
 doc.setFontSize(13);
doc.setTextColor(127, 29, 29);
doc.text("FITNESS", pageWidth / 2, 18, { align: "center" });
  doc.setFontSize(12);
doc.setTextColor(255, 0, 0);
doc.text("(A) SUBJECTIVE ASSESSMENT ", pageWidth / 2, 24, { align: "center" });

const fields = [
    { label: "Appointment Date", value: moment(selectedPatientId.appointment_date).format("DD/MM/YYYY") },
    { label: "Remarks", value: formData_3.remark !== "" ? `${formData_3.remark}` : " --- "},
    { label: "Name", value: selectedPatientId.name },
    { label: "Age", value: selectedPatientId.age },
    { label: "Dob", value:formData_3.dob !== "" ? moment(formData_3.dob).format("DD/MM/YYYY") : " --- "},
    { label: "Gender", value: selectedPatientId.gender },
    { label: "Contact", value: selectedPatientId.contact },
    { label: "Occupation", value: formData_3.occupation },
    { label: "Education", value: formData_3.study },
    { label: "Address", value: formData_3.address },
    { label: "Dominant Side", value: formData_3.domSide },
    { label: "Chief Complain", value: formData_3.chfCmp },
    { title: " ", colSpan: 2 },
    { label: "MEDICAL HISTROY", value: '---' },
    { label: "1) Hypertension", value: formData_3.hyperTense == 1 ? "Yes" : "No" },
    { label: "2) Diabetes", value: formData_3.diabetes == 1 ? "Yes" : "No" },
    { label: "3) Thyroid", value: formData_3.thyroid == 1 ? "Yes" : "No" },
    { label: "4) Asthma", value: formData_3.asthama == 1 ? "Yes" : "No" },
    { label: "5) Other History", value: formData_3.other_p_value !== "" ? formData_3.other_p_value : " --- " },
    { title: " ", colSpan: 2 },
    { label: "PAST SURGICAL HISTORY", value: formData_3.pastSurg !== "" ? formData_3.pastSurg : " --- " },
    { label: "PRESENT SURGICAL HISTORY", value: formData_3.presentSurg !== "" ? formData_3.presentSurg : " --- " },
    { title: "PAIN EVALUATION", colSpan: 2 },
    { label: "Site/Location", value: formData_3.siteLoca !== "" ? formData_3.siteLoca : " --- " },
    { label: "Side", value: formData_3.side !== "" ? formData_3.side : " --- " },
    { label: "TYPE", value: '---' },
    { label: "1)Duallaching", value: formData_3.dull == 1 ? "Yes" : "No"},
    { label: "2)Cramping", value: formData_3.cramp == 1 ? "Yes" : "No"},
    { label: "3)Sharp Shooting", value: formData_3.sharpShoot == 1 ? "Yes" : "No"},
    { label: "4)Burning ", value: formData_3.burn == 1 ? "Yes" : "No"},
    { label: "5)Throbbing", value: formData_3.throb == 1 ? "Yes" : "No"},
    { label: "6)Numbness", value: formData_3.numb == 1 ? "Yes" : "No"},
    { label: "7)Tingling", value: formData_3.tingling == 1 ? "Yes" : "No"},
    { label: "8)Others Type", value:formData_3. other_p_value_3 !== "" ? formData_3.other_p_value_3 : " --- " },
    { label: "Frequency/Nature", value: formData_3.freqNature !== "" ? formData_3.freqNature : " --- " },
    { label: "Duration", value: formData_3.duration !== "" ? formData_3.duration : " --- " },
    { label: "Pain Aggravating Factor", value: formData_3.painAgrFact !== "" ? formData_3.painAgrFact : " --- " },
    { label: "Pain Relieving Factor", value: formData_3.painRelFact !== "" ? formData_3.painRelFact : " --- " },
    { label: "Intensity:(nprs)", value: formData_3.intensity !== "" ? formData_3.intensity : " --- " },
  { title: "***", colSpan: 2 },
  { label: "OBSERVATION", value: formData_3.observation !== "" ? `${formData_3.observation}` : " --- "},
  { label: "PALPATION", value: '---' },
  { label: "1)Tenderness", value: formData_3.tend == 1 ? "Yes" : "No"},
  { label: "2)Crepitus", value: formData_3.crepitus == 1 ? "Yes" : "No"},
  { label: " 3)Scar", value: formData_3.scar !== "" ? formData_3.scar : " --- "},
  { label: "4)Swelling ", value: formData_3.swelling == 1 ? "Yes" : "No" },
  { label: "5)other Palpation", value: formData_3.other_p_value_2 !== "" ? `${formData_3.other_p_value_2}` : " --- "},
  { title: " ", colSpan: 2 },
  { label: "EXAMINATION", value: formData_3.examination !== "" ? `${formData_3.examination}` : " --- "},
  { label: "INVESTIGATION/RADIOLOGICAL FINDINGS", value: formData_3.investRadioFinding !== "" ? `${formData_3.investRadioFinding}` : " --- "},
  { label: "MEDICAL DIAGNOSIS", value: formData_3.medDiagno !== "" ? `${formData_3.medDiagno}` : " --- "},
  { label: "PHYSIOTHERAPY DIAGNOSIS", value: formData_3.phyDiagno !== "" ? `${formData_3.phyDiagno}` : " --- "},
  { label: "TREATMENT", value: formData_3.ObjTreatment !== "" ? `${formData_3.ObjTreatment}` : " --- " },
];

const tableRowsFirstPage = [];
const tableRowsSecondPage = [];
let isSecondPage = false;

fields.forEach(field => {
    if (field.title) {
        const row = [{ content: field.title, colSpan: field.colSpan || 2, styles: { fontStyle: 'bold', fontSize: 14, textColor: field.styles?.textColor || [50, 50, 255], halign: 'center' } }];
        if (isSecondPage) {
            tableRowsSecondPage.push(row);
        } else {
            tableRowsFirstPage.push(row);
        }
    } else if (field.label) {
        const row = [field.label, field.value];
        if (isSecondPage) {
            tableRowsSecondPage.push(row);
        } else {
            tableRowsFirstPage.push(row);
        }
    }
    if (field.title == "***") {
        isSecondPage = true;
    }
});

// Add border to the first page
addPageBorder();

// Add the content for the first page
doc.autoTable({
    head: [],
    body: tableRowsFirstPage,
    startY: 27,
    theme: 'grid',
    styles: { overflow: 'linebreak', cellPadding: 2 },
    columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99] },
        1: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0] }
    },
    didDrawPage: addPageBorder
});

doc.addPage();
doc.rect(5, 5, pageWidth - 10, pageHeight - 10, 'S');
doc.setTextColor(255, 0, 0);
doc.text("(B) OBJECTIVE ASSESSMENT ", pageWidth / 2, 10, { align: "center" });
// Add the content for the second page
doc.autoTable({
    head: [],
    body: tableRowsSecondPage,
    startY: 15,
    theme: 'grid',
    styles: { overflow: 'linebreak', cellPadding: 2 },
    columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold', fontSize: 13, textColor: [22, 78, 99] },
        1: { cellWidth: 'auto', fontStyle: 'normal', fontSize: 13, textColor: [0, 0, 0] }
    },
    didDrawPage: addPageBorder
});
const pdfData = doc.output('arraybuffer'); // Get PDF data as array buffer
const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const formDataObject = new FormData();
        formDataObject.append("patient_id", selectedPatientId.patient_id);
        formDataObject.append(
          "appointment_id",
          selectedPatientId.appointment_id
        );
        formDataObject.append("name", selectedPatientId.name);
        formDataObject.append("age", selectedPatientId.age);
        formDataObject.append("gender", selectedPatientId.gender);
        formDataObject.append("study", formData_3.study);
        formDataObject.append("occupation", formData_3.occupation);
        formDataObject.append("address", formData_3.address);
        formDataObject.append("domSide", formData_3.domSide);
        formDataObject.append("chfCmp", formData_3.chfCmp);
        formDataObject.append("hyperTense", formData_3.hyperTense);
        formDataObject.append("diabetes", formData_3.diabetes);
        formDataObject.append("thyroid", formData_3.thyroid);
        formDataObject.append("asthama", formData_3.asthama);
        formDataObject.append("others", formData_3.others);
        formDataObject.append("dob", formData_3.dob);
        formDataObject.append("other_p_value", formData_3.other_p_value);
        formDataObject.append("other_p_value_2", formData_3.other_p_value_2);
        formDataObject.append("other_p_value_3", formData_3.other_p_value_3);
        formDataObject.append("typeother", formData_3.typeother);
        formDataObject.append("pastSurg", formData_3.pastSurg);
        formDataObject.append("contact", selectedPatientId.contact);
        formDataObject.append("presentSurg", formData_3.presentSurg);
        formDataObject.append("siteLoca", formData_3.siteLoca);
        formDataObject.append("side", formData_3.side);
        formDataObject.append("dull", formData_3.dull);
        formDataObject.append("cramp", formData_3.cramp);
        formDataObject.append("sharpShoot", formData_3.sharpShoot);
        formDataObject.append("burn", formData_3.burn);
        formDataObject.append("throb", formData_3.throb);
        formDataObject.append("numb", formData_3.numb);
        formDataObject.append("tingling", formData_3.tingling);
        formDataObject.append("freqNature", formData_3.freqNature);
        formDataObject.append("duration", formData_3.duration);
        formDataObject.append("painAgrFact", formData_3.painAgrFact);
        formDataObject.append("painRelFact", formData_3.painRelFact);
        formDataObject.append("intensity", formData_3.intensity);
        formDataObject.append("observation", formData_3.observation);
        formDataObject.append("tend", formData_3.tend);
        formDataObject.append("crepitus", formData_3.crepitus);
        formDataObject.append("scar", formData_3.scar);
        formDataObject.append("swelling", formData_3.swelling);
        formDataObject.append("palpOthers", formData_3.palpOthers);
        formDataObject.append("examination", formData_3.examination);
        formDataObject.append("investRadioFinding", formData_3.investRadioFinding);
        formDataObject.append("medDiagno", formData_3.medDiagno);
        formDataObject.append("phyDiagno", formData_3.phyDiagno);
        formDataObject.append("ObjTreatment", formData_3.ObjTreatment);
        formDataObject.append("remark", formData_3.remark);
        formDataObject.append(
          "report_pdf",
          pdfBlob,
          `${selectedPatientId.patient_id}_2.pdf`
        );
        selectedImages.forEach((image, index) => {
          if (typeof image === "string") {
            formDataObject.append("images[]", image);
          } else {
            formDataObject.append("images[]", image.file);
          }
        });
        const response = await axios.post(
          "https://arpanhospital.online/appointment_book_fitness.php",
          formDataObject
        );
        closeModal();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const value =
      target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleInputChange_2 = (event) => {
    const target = event.target;
    const value =
      target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
    const name = target.name;

    setFormData_2({
      ...formData_2,
      [name]: value,
    });
  };

  const handleInputChange_3 = (event) => {
    const target = event.target;
    const value =
      target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
    const name = target.name;

    setFormData_3({
      ...formData_3,
      [name]: value,
    });
  };

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
  const openPdfInNewTab = (fileName) => {
    const pdfUrl = `https://arpanhospital.online/${fileName}`;
    window.open(pdfUrl, "_blank").focus();
  };

  const handleCheckboxChange = (event) => {
    setButtonEnabled(event.target.checked);
  };
  const extractDate = (filename) => {
    const pattern = /\d{4}-\d{2}-\d{2}/;
    const match = filename.match(pattern);
    return match ? match[0] : null;
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
            <div className="w-full">
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
                <h1 className="font-serif text-cyan-900">TODAY APPOINMENT DATA</h1>
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
                            <th className="px-1 py-2 text-center text-xs font-large text-white uppercase tracking-wider">
                              NO
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              NAME
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              CONTACT
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              GENDER
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              AGE
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              DATE
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              TIME
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              CATEGORY
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              STATUS
                            </th>
                            <th className="px-1 py-2 text-center text-xs font-latge text-white  uppercase tracking-wider">
                              APPOINMENT
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {patients.length > 0 ? (
                            patients.map((item, index) => (
                              <React.Fragment key={item.patient_id}>
                                <tr className="bg-white text-center">
                                  <td className="px-1 py-2 text-center whitespace-nowrap">
                                    {index + 1}
                                  </td>
                                  <td className="px-1 py-2 text-center uppercase whitespace-nowrap">
                                    {item.name}
                                  </td>
                                  <td className="px-1 py-2 text-center uppercase whitespace-nowrap">
                                    {item.contact}
                                  </td>
                                  <td className="px-1 py-2 text-center uppercase whitespace-nowrap">
                                    {item.gender}
                                  </td>
                                  <td className="px-1 py-2 text-center whitespace-nowrap">
                                    {item.age}
                                  </td>
                                  <td className="px-1 py-2 text-center whitespace-nowrap font-mono">
                                    {moment(item.appointment_date).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td className="px-1 py-2 text-center whitespace-nowrap ">
                                    {item.appointment_time}
                                  </td>
                                  <td className="px-1 py-2 text-center uppercase whitespace-nowrap">
                                    {item.category}
                                  </td>
                                  <td className="px-1 py-2 whitespace-nowrap">
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
                                  <td className="px-3 py-2">
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
                                          item.contact,
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
                                        value={selectedDiv==="pain management"?'pain management':selectedDiv}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-flow-row sm:grid-cols-1 font-serif md:grid-cols-2 gap-3 lg:grid-cols-4">
                                  <div
                                    className={`rounded-md border-2  p-2 cursor-pointer  text-center w-full inline-flex items-center justify-center gap-2 ${selectedDiv === "physiotherapy"
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
                                    className={`rounded-md border-2 p-2 cursor-pointer text-center w-full inline-flex items-center justify-center gap-2 ${selectedDiv === "fitness"
                                        ? "bg-cyan-950 text-white"
                                        : "bg-white text-red-600"
                                      }`}
                                    onClick={() => handleDivClick("fitness")}
                                  >
                                    <FaUserDoctor className="text-md" />
                                    FITNESS
                                  </div>
                                  <div
                                    className={`rounded-md border-2 p-2 cursor-pointer text-center w-full  inline-flex items-center justify-center gap-2 ${selectedDiv === "weight loss"
                                        ? "bg-cyan-950 text-white"
                                        : "bg-white text-red-600"
                                      }`}
                                    onClick={() =>
                                      handleDivClick("weight loss")
                                    }
                                  >
                                    <FaUserDoctor className="text-md" />
                                    WEIGHT LOSS
                                  </div>
                                  <div
                                    className={`rounded-md border-2 p-2 cursor-pointer text-center w-full inline-flex items-center justify-center gap-2 ${selectedDiv === "pain management"
                                        ? "bg-cyan-950 text-white"
                                        : "bg-white text-red-600"
                                      }`}
                                    onClick={() =>
                                      handleDivClick("pain management")
                                    }
                                  >
                                    <FaUserDoctor className="text-md" />
                                    PAIN MANAGEMENT
                                  </div>
                                </div>
                                {selectedDiv === "physiotherapy" && (
                                  <div className="rounded-md flex flex-col gap-3 p-2 bg-slate-200 overflow-auto text-white">
                                    
                                    <form onSubmit={handleSubmit}
                                      enctype="multipart/form-data">
                                      <h1 className="text-blue-800 font-serif uppercase text-xl pb-3">
                                        (A) Subjective Assessment
                                      </h1>
                                      <div className="grid grid-flow-row md:grid-cols-1 lg:grid-cols-5 w-full gap-2">
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>DOB</p>
                                            </div>
                                            <div className="">
                                            <input
                                              type="date"
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="dob"
                                              
                                              onChange={handleInputChange}
                                              value={formData.dob}
                                              max={
                                                new Date()
                                                  .toISOString()
                                                  .split("T")[0]
                                              }
                                            />
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>EDUCATION</p>
                                            </div>
                                            <div className="">
                                            <input
                                              type="text"
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="study"
                                              placeholder="Education"
                                              onChange={handleInputChange}
                                              value={formData.study}
                                            />
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>Phone Number</p>
                                          </div>
                                          <div className="">
                                          <input
                                            type="tel"
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-sans uppercase h-10"
                                            name="contact"
                                            readOnly
                                            value={selectedPatientId.contact}
                                            maxLength={10}
                                            minLength={10}
                                            placeholder="phone number"
                                            pattern="^\d+$"
                                          />
                                        </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>Ocuupation</p>
                                            </div>
                                            <div className="">
                                            <input
                                              type="text"
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="occupation"
                                              placeholder="Occupation"
                                              
                                              onChange={handleInputChange}
                                              value={formData.occupation}
                                            />
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>Address</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="address"
                                              placeholder="Address"
                                              
                                              onChange={handleInputChange}
                                              value={formData.address}
                                            ></textarea>
                                          </div>
                                          </div>
                                      </div>
                                     
                                      <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2  gap-2 w-full pt-2">
                                      <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>Chief Complain</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="chfCmp"
                                              placeholder="Chief Complain"
                                              
                                              onChange={handleInputChange}
                                              value={formData.chfCmp}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>Dominant Side</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="domSide"
                                              placeholder="Dominant Side"
                                              
                                              onChange={handleInputChange}
                                              value={formData.domSide}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="col-span-2 flex flex-col w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>medical history</p>
                                            </div>
                                            <div className="flex flex-row w-full justify-between">
                                              <div className=" inline-flex gap-2 items-center text-center w-full">
                                                <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="hyperTense"
                                                  id=""
                                                  checked={
                                                    formData.hyperTense == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">Hypertension</label>
                                              </div>
                                              <div className=" inline-flex gap-2 items-center text-center w-full">
                                                <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="diabetes"
                                                  id=""
                                                  checked={
                                                    formData.diabetes == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">diabetes</label>
                                              </div>
                                              <div className=" inline-flex gap-2 items-center text-center w-full">
                                                <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="thyroid"
                                                  id=""
                                                  checked={
                                                    formData.thyroid == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">thyroid</label>
                                              </div>
                                              <div className=" inline-flex gap-2 items-center text-center w-full">
                                                <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="asthama"
                                                  id=""
                                                  checked={
                                                    formData.asthama == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">asthma</label>
                                              </div>
                                              <div className=" inline-flex gap-2 items-center text-center w-full">
                                                <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="others"
                                                  id=""
                                                  checked={
                                                    formData.others == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">others</label>
                                              </div>
                                              {formData.others == 1 && (
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="other_p_value"
                                                  value={
                                                    formData.other_p_value
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                              </div>
                                            )}
                                              
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left font-serif  text-red-600 uppercase tracking-wider">
                                              <p>past surgical history</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="pastSurg"
                                              placeholder="past surgical history"
                                              
                                              onChange={handleInputChange}
                                              value={formData.pastSurg}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left  font-serif text-red-600 uppercase tracking-wider">
                                              <p>present Surgical history</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="presentSurg"
                                              placeholder="present surgial history"
                                              
                                              onChange={handleInputChange}
                                              value={formData.presentSurg}
                                            ></textarea>
                                          </div>
                                          </div>
                                           <div className="text-left col-span-2 font-serif text-red-600 uppercase tracking-wider">
                                            <p>PAIN EVALUATION</p>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>site/Location</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="siteLoca"
                                              placeholder="Enter Site/Location"
                                              
                                              onChange={handleInputChange}
                                              value={formData.siteLoca}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>side</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="side"
                                              placeholder="Enter a Side"
                                              
                                              onChange={handleInputChange}
                                              value={formData.side}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="col-span-2 flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>type</p>
                                            </div>
                                            <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  w-full">
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="dull"
                                                  id=""
                                                  checked={
                                                    formData.dull == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">dullaching</label>
                                                </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="cramp"
                                                  id=""
                                                  checked={
                                                    formData.cramp == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">cramping</label>
                                                </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="sharpShoot"
                                                  id=""
                                                  checked={
                                                    formData.sharpShoot == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">Sharp shooting</label>
                                                </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="burn"
                                                  id=""
                                                  checked={
                                                    formData.burn == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">burning</label>
                                                </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="throb"
                                                  id=""
                                                  checked={
                                                    formData.throb == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">throbbing</label>
                                                </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="numb"
                                                  id=""
                                                  checked={
                                                    formData.numb == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">numbness</label>
                                                </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="tingling"
                                                  id=""
                                                  checked={
                                                    formData.tingling == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">tingling</label>
                                                </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="typeother"
                                                  id=""
                                                  checked={
                                                    formData.typeother == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">others</label>
                                                </div>
                                                {formData.typeother == 1 && (
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="other_p_value_3"
                                                  value={
                                                    formData.other_p_value_3
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                              </div>
                                            )}
                                            </div>
                                            
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>frequency/nature</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="freqNature"
                                              placeholder="frequency/nature"
                                              
                                              onChange={handleInputChange}
                                              value={formData.freqNature}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>Duration</p>
                                            </div>
                                            <div className="">
                                              <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="duration" id="" onChange={handleInputChange} value={formData.duration} required>
                                                <option value="acute" selected={formData.duration==="acute"}>acute</option>
                                                <option value="subacute" selected={formData.duration==="subacute"}>subacute</option>
                                                <option value="chrowic"selected={formData.duration==="chrowic"}>chronic</option>
                                              </select>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>pain aggravating factor</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="painAgrFact"
                                              placeholder="pain aggravating factor"
                                              
                                              onChange={handleInputChange}
                                              value={formData.painAgrFact}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>pain relieving factor</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="painRelFact"
                                              placeholder="pain relieving factor"
                                              
                                              onChange={handleInputChange}
                                              value={formData.painRelFact}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="col-span-2 flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>intensity:(nprs)=Numerical Pain Rating Scale</p>
                                            </div>
                                            <div className="w-full">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="intensity"
                                              placeholder="intensity:(nprs)=Numerical Pain Rating Scale"
                                              onChange={handleInputChange}
                                              value={formData.intensity}
                                            ></textarea>
                                          </div>
                                          </div>
                                         
                                          <h1 className="text-blue-800 font-serif uppercase text-xl pt-3">
                                     (B) Objective Assessment
                                      </h1>
                                          <div className="col-span-2 flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>observation</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="observation"
                                              placeholder="observation"
                                              
                                              onChange={handleInputChange}
                                              value={formData.observation}
                                            ></textarea>
                                          </div>
                                          </div>
                                         
                                          <div className="col-span-2 flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>PALPATION</p>
                                            </div>
                                            <div className="grid grid-flow-row gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  w-full">
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="tend"
                                                  id=""
                                                  checked={
                                                    formData.tend == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">tenderness</label>
                                                </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="crepitus"
                                                  id=""
                                                  checked={
                                                    formData.crepitus == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">crepitus</label>
                                                </div>
                                            <div className="flex flex-row items-center gap-2">
                                              <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                                  <p>Scar</p>
                                              </div>
                                              <div className="">
                                                <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="scar" id="" onChange={handleInputChange} value={formData.scar} required>
                                                <option value="heal" selected={formData.scar==="heal"}>heal</option>
                                                <option value="nonheal" selected={formData.scar==="nonheal"}>nonheal</option>
                                              </select>
                                            </div>
                                            </div>
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="swelling"
                                                  id=""
                                                  checked={
                                                    formData.swelling == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">swelling</label>
                                                </div>
                                               
                                                <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                  <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="palpOthers"
                                                  id=""
                                                  checked={
                                                    formData.palpOthers == 1
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">Others</label>
                                                </div>
                                                {formData.palpOthers == 1 && (
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="other_p_value_2"
                                                  value={
                                                    formData.other_p_value_2
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                              </div>
                                            )}
                                               
                                               
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>examination</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="examination"
                                              placeholder="examination"
                                              
                                              onChange={handleInputChange}
                                              value={formData.examination}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>investigation/radiological findings</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="investRadioFinding"
                                              placeholder="investigation/radiological findings"
                                              
                                              onChange={handleInputChange}
                                              value={formData.investRadioFinding}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>medical diagnosis</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="medDiagno"
                                              placeholder="medical diagnosis"
                                              
                                              onChange={handleInputChange}
                                              value={formData.medDiagno}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>physiotherapy diagnosis</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="phyDiagno"
                                              placeholder="physiotherapy diagnosis"
                                              
                                              onChange={handleInputChange}
                                              value={formData.phyDiagno}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>treatment</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="ObjTreatment"
                                              placeholder="Treatment"
                                              
                                              onChange={handleInputChange}
                                              value={formData.ObjTreatment}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>remarks</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="remark"
                                              placeholder="remarks"
                                              
                                              onChange={handleInputChange}
                                              value={formData.remark}
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
                                          {selectedImages&& selectedImages.length>0&& selectedImages.map(
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
                                      <div className="grid grid-flow-row w-full md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-5 rounded-lg pt-5">
                                    {pdfFiles && pdfFiles.length > 0 && pdfFiles.map((fileName, index) => {
        const extractedDate = extractDate(fileName);
        return (
          <div className="w-full inline-flex gap-1 items-center border-2 rounded-md p-2 bg-cyan-900 font-sans font-bold text-center" key={index} onClick={() => openPdfInNewTab(fileName)}>
            <img className="w-5 rounded-sm h-5" src={pdf} alt="" srcset="" />
            <h1 className="cursor-pointer ">
              {extractedDate ? moment(extractedDate).format('DD-MM-YYYY') : "No date found"}
            </h1>
          </div>
        );
      })}
                                    </div>
                                      <div className="flex flex-row justify-between gap-3 font-serif uppercase mt-5">
                                        <div>
                                          <input
                                            type="checkbox"
                                            id="confirmCheckbox"
                                            checked={buttonEnabled}
                                            onChange={handleCheckboxChange}
                                          />
                                          <label htmlFor="confirmCheckbox" className="text-red-800 font-serif">
                                            Confirm Upload Report
                                          </label>
                                        </div>
                                        <div>
                                          <button
                                            className={`bg-cyan-950 text-white py-2 px-3 rounded-md uppercase ${buttonEnabled === false ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            type="submit"
                                            disabled={buttonEnabled === false}
                                          >
                                            {button ? "SUBMIT" : "UPDATE"}
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                )}
                                {selectedDiv === "fitness" && (
                                   <div className="rounded-md flex flex-col gap-3 p-2 bg-slate-200 overflow-auto text-white">
                                  
                                   <form
                                     onSubmit={handleSubmit}
                                     enctype="multipart/form-data">
                                       <h1 className="text-blue-800 font-serif uppercase text-xl pb-3">
                                        (A) Subjective Assessment
                                      </h1>
                                     <div className="grid grid-flow-row md:grid-cols-1 lg:grid-cols-5 w-full gap-2">
                                     <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>DOB</p>
                                           </div>
                                           <div className="">
                                           <input
                                             type="date"
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="dob"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.dob}
                                             max={
                                               new Date()
                                                 .toISOString()
                                                 .split("T")[0]
                                             }
                                           />
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>EDUCATION</p>
                                            </div>
                                            <div className="">
                                            <input
                                              type="text"
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="study"
                                              placeholder="EDUCATION"
                                              onChange={handleInputChange_3}
                                              value={formData_3.study}
                                            />
                                          </div>
                                          </div>
                                         <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>Phone Number</p>
                                          </div>
                                          <div className="">
                                          <input
                                            type="tel"
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-sans uppercase h-10"
                                            name="contact"
                                            readOnly
                                            value={selectedPatientId.contact}
                                            maxLength={10}
                                            minLength={10}
                                            placeholder="phone number"
                                            pattern="^\d+$"
                                          />
                                        </div>
                                        </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>Ocuupation</p>
                                           </div>
                                           <div className="">
                                           <input
                                             type="text"
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="occupation"
                                             placeholder="Occupation"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.occupation}
                                           />
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>Address</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="address"
                                             placeholder="Address"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.address}
                                           ></textarea>
                                         </div>
                                         </div>
                                     </div>
                                    
                                     <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2  gap-2 w-full pt-2">
                                     <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>Chief Complain</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="chfCmp"
                                             placeholder="Chief Complain"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.chfCmp}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>Dominant Side</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="domSide"
                                             placeholder="Dominant Side"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.domSide}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="col-span-2 flex flex-col w-full">
                                           <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                             <p>medical history</p>
                                           </div>
                                           <div className="flex flex-row w-full justify-between">
                                             <div className=" inline-flex gap-2 items-center text-center w-full">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="hyperTense"
                                                 id=""
                                                 checked={
                                                   formData_3.hyperTense == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">Hypertension</label>
                                             </div>
                                             <div className=" inline-flex gap-2 items-center text-center w-full">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="diabetes"
                                                 id=""
                                                 checked={
                                                   formData_3.diabetes == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">diabetes</label>
                                             </div>
                                             <div className=" inline-flex gap-2 items-center text-center w-full">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="thyroid"
                                                 id=""
                                                 checked={
                                                   formData_3.thyroid == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">thyroid</label>
                                             </div>
                                             <div className=" inline-flex gap-2 items-center text-center w-full">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="asthama"
                                                 id=""
                                                 checked={
                                                   formData_3.asthama == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">asthma</label>
                                             </div>
                                             <div className=" inline-flex gap-2 items-center text-center w-full">
                                               <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="others"
                                                 id=""
                                                 checked={
                                                   formData_3.others == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">others</label>
                                             </div>
                                             {formData_3.others == 1 && (
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="other_p_value"
                                                 value={
                                                   formData_3.other_p_value
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                             </div>
                                           )}
                                             
                                           </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left font-serif  text-red-600 uppercase tracking-wider">
                                             <p>past surgical history</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="pastSurg"
                                             placeholder="past surgical history"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.pastSurg}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left  font-serif text-red-600 uppercase tracking-wider">
                                             <p>present Surgical history</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="presentSurg"
                                             placeholder="present surgial history"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.presentSurg}
                                           ></textarea>
                                         </div>
                                         </div>
                                          <div className="text-left col-span-2  font-serif  text-red-600 uppercase tracking-wider">
                                            <p>PAIN EVALUATION</p>
                                          </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>site/Location</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="siteLoca"
                                             placeholder="Enter Site/Location"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.siteLoca}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>side</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="side"
                                             placeholder="Enter a Side"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.side}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="col-span-2 flex flex-col gap-2 w-full">
                                         <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>type</p>
                                           </div>
                                           <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  w-full">
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="dull"
                                                 id=""
                                                 checked={
                                                   formData_3.dull == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">DULLachING</label>
                                               </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="cramp"
                                                 id=""
                                                 checked={
                                                   formData_3.cramp == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">cramping</label>
                                               </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="sharpShoot"
                                                 id=""
                                                 checked={
                                                   formData_3.sharpShoot == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">Sharp shooting</label>
                                               </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="burn"
                                                 id=""
                                                 checked={
                                                   formData_3.burn == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">burning</label>
                                               </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="throb"
                                                 id=""
                                                 checked={
                                                   formData_3.throb == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">throbbing</label>
                                               </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="numb"
                                                 id=""
                                                 checked={
                                                   formData_3.numb == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">numbness</label>
                                               </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="tingling"
                                                 id=""
                                                 checked={
                                                   formData_3.tingling == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">tingling</label>
                                               </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="typeother"
                                                 id=""
                                                 checked={
                                                   formData_3.typeother == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">others</label>
                                               </div>
                                               {formData_3.typeother == 1 && (
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="other_p_value_3"
                                                 value={
                                                   formData_3.other_p_value_3
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                             </div>
                                           )}
                                           </div>
                                           
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>frequency/nature</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="freqNature"
                                             placeholder="frequency/nature"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.freqNature}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>Duration</p>
                                           </div>
                                           <div className="">
                                           <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="duration" id="" onChange={handleInputChange_3} value={formData_3.duration} required>
                                                <option value="acute" selected={formData_3.duration==="acute"}>acute</option>
                                                <option value="subacute" selected={formData_3.duration==="subacute"}>subacute</option>
                                                <option value="chrowic"selected={formData_3.duration==="chrowic"}>chronic</option>
                                              </select>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>pain aggravating factor</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="painAgrFact"
                                             placeholder="pain aggravating factor"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.painAgrFact}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>pain relieving factor</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="painRelFact"
                                             placeholder="pain relieving factor"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.painRelFact}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="col-span-2 flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>intensity:(nprs)=Numerical Pain Rating Scale</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="intensity"
                                             placeholder="intensity:(nprs)=Numerical Pain Rating Scale"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.intensity}
                                           ></textarea>
                                         </div>
                                         </div>
                                         
                                         <h1 className="text-blue-800 font-serif uppercase text-xl pt-3">
                                     (B) Objective Assessment
                                      </h1>
                                         <div className="col-span-2 flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>observation</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="observation"
                                             placeholder="observation"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.observation}
                                           ></textarea>
                                         </div>
                                         </div>
                                        
                                         <div className="col-span-2 flex flex-col gap-2 w-full">
                                         <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>PALPATION</p>
                                           </div>
                                           <div className="grid grid-flow-row gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full">
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="tend"
                                                 id=""
                                                 checked={
                                                   formData_3.tend == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">tenderness</label>
                                               </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="crepitus"
                                                 id=""
                                                 checked={
                                                   formData_3.crepitus == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">crepitus</label>
                                               </div>
                                               <div className="flex flex-row items-center gap-2">
                                              <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                                  <p>Scar</p>
                                              </div>
                                              <div className="">
                                                <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="scar" id="" onChange={handleInputChange_3} value={formData_3.scar} required>
                                                <option value="heal" selected={formData_3.scar==="heal"}>heal</option>
                                                <option value="nonheal" selected={formData_3.scar==="nonheal"}>nonheal</option>
                                              </select>
                                            </div>
                                            </div>
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="swelling"
                                                 id=""
                                                 checked={
                                                   formData_3.swelling == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">swelling</label>
                                               </div>
                                             
                                               <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                 <input
                                                 className="h-4 w-4"
                                                 type="checkbox"
                                                 name="palpOthers"
                                                 id=""
                                                 checked={
                                                   formData_3.palpOthers == 1
                                                     ? true
                                                     : false
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">Others</label>
                                               </div>
                                               {formData_3.palpOthers == 1 && (
                                             <div className="w-full">
                                               <input
                                                 className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                 type="text"
                                                 name="other_p_value_2"
                                                 value={
                                                   formData_3.other_p_value_2
                                                 }
                                                 onChange={handleInputChange_3}
                                               />
                                             </div>
                                           )} 
                                           </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>examination</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="examination"
                                             placeholder="examination"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.examination}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>investigation/radiological findings</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="investRadioFinding"
                                             placeholder="investigation/radiological findings"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.investRadioFinding}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>medical diagnosis</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="medDiagno"
                                             placeholder="medical diagnosis"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.medDiagno}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>physiotherapy diagnosis</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="phyDiagno"
                                             placeholder="physiotherapy diagnosis"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.phyDiagno}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>treatment</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="ObjTreatment"
                                             placeholder="Treatment"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.ObjTreatment}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>remarks</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="remark"
                                             placeholder="remarks"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.remark}
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
                                         {selectedImages&& selectedImages.length>0&& selectedImages.map(
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
                                     <div className="grid grid-flow-row w-full md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-5 rounded-lg pt-5">
                                    {pdfFiles && pdfFiles.length > 0 && pdfFiles.map((fileName, index) => {
        const extractedDate = extractDate(fileName);
        return (
          <div className="w-full inline-flex gap-1 items-center border-2 rounded-md p-2 bg-cyan-900 font-sans font-bold text-center" key={index} onClick={() => openPdfInNewTab(fileName)}>
            <img className="w-5 rounded-sm h-5" src={pdf} alt="" srcset="" />
            <h1 className="cursor-pointer ">
              {extractedDate ? moment(extractedDate).format('DD-MM-YYYY') : "No date found"}
            </h1>
          </div>
        );
      })}
                                    </div>
                                     <div className="flex flex-row justify-between gap-3 font-serif uppercase mt-5">
                                       <div>
                                         <input
                                           type="checkbox"
                                           id="confirmCheckbox"
                                           checked={buttonEnabled}
                                           onChange={handleCheckboxChange}
                                         />
                                         <label htmlFor="confirmCheckbox" className="text-red-800 font-serif">
                                           Confirm Upload Report
                                         </label>
                                       </div>
                                       <div>
                                         <button
                                           className={`bg-cyan-950 text-white py-2 px-3 rounded-md uppercase ${buttonEnabled === false ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                                           type="submit"
                                           disabled={buttonEnabled === false}
                                         >
                                           {button ? "SUBMIT" : "UPDATE"}
                                         </button>
                                       </div>
                                     </div>
                                   </form>
                                   </div>
                                   
                                )}
                                {selectedDiv === "weight loss" && (
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
                                              <p>DOB</p>
                                            </div>
                                            <div className="">
                                              <input
                                                className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950  font-mono text-md uppercase w-full text-cyan-950"
                                                type="date"
                                                name="dob"
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
                                              <p>EDUCATION</p>
                                            </div>
                                            <div className="">
                                              <input
                                                className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950  font-mono text-md uppercase w-full text-cyan-950"
                                                type="text"
                                                name="study"
                                                placeholder="education"
                                                onChange={handleInputChange_1}
                                                value={formData_1.study}
                                              />
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full ">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>Occupation</p>
                                            </div>
                                            <div className="">
                                              <input
                                                className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                type="text"
                                                name="occupation"
                                                placeholder="Occupation"
                                                onChange={handleInputChange_1}
                                                value={formData_1.occupation}
                                              />
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full ">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>Phone Number</p>
                                            </div>
                                            <div className="">
                                              <input
                                                className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                type="tel"
                                                name="contact"
                                                placeholder="phone number"
                                                pattern="^\d+$"
                                                value={selectedPatientId.contact}
                                                readOnly
                                                minLength={10}
                                                maxLength={10}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-span-2  flex flex-col gap-2 ">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider">
                                            <p>address</p>
                                          </div>
                                          <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="address"
                                              placeholder="address"
                                              onChange={handleInputChange_1}
                                              value={formData_1.address}
                                            ></textarea>
                                          </div>
                                        </div>
                                      </div>
                                     
                                      <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 pt-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider">
                                            <p>* Medical History  </p>
                                          </div>
                                          <div className="flex flex-col gap-2 items-center ">
                                            <div className="flex flex-row gap-2 w-full items-center justify-around">
                                              <div
                                                className="text-left text-sm font-extrabold text-red-500 uppercase w-full  tracking-wider "
                                              >
                                                <p>(1) hypertension</p>
                                              </div>
                                              <div className="text-end w-full">
                                                <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="blood"
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
                                                <p>(2) Asthma</p>
                                              </div>
                                              <div className="w-full text-end">
                                                <input
                                                  className="h-4 w-4"
                                                  type="checkbox"
                                                  name="acidity"
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
                                                <p>(3) Diabetes</p>
                                              </div>
                                              <div className="w-full text-end">
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
                                                <p>(4) heart disease</p>
                                              </div>
                                              <div className="w-full text-end">
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
                                            <div className="flex flex-row gap-2 items-center justify-between  w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                                <p>(5) thyroid</p>
                                              </div>
                                              <div className="w-full text-end">
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
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div className="flex flex-row gap-2 w-full">
                                              <div className="w-full">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="dayabitis"
                                              placeholder="Enter past  History"
                                              onChange={handleInputChange_1}
                                              value={formData_1.dayabitis}
                                            ></textarea>
                                            </div>
                                            <div className="w-full">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="other_p_value"
                                              placeholder="Enter  Other  History"
                                              onChange={handleInputChange_1}
                                              value={formData_1.other_p_value}
                                            ></textarea>
                                            </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                            <p>* need</p>
                                          </div>
                                          <div className="flex flex-row gap-3 items-center">
                                            <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                              <p>
                                                (1) Health
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
                                                (2) fitness
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
                                                (3) physique
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
                                              <p>(4) weight loss </p>
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
                                          <div className="flex flex-row gap-3 items-center">
                                            <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                              <p>(5) fat loss</p>
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
                                              <p>(6) weight Gain</p>
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
                                         
                                          <div className="w-full">
                                          <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="dia"
                                              placeholder="enter a other need"
                                              onChange={handleInputChange_1}
                                              value={formData_1.dia}
                                            ></textarea>
                                          </div>
                                        </div>
                                        <div className="flex flex-col gap-2  w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                            <p>* Diet History</p>
                                          </div>
                                          <div className="pl-2 w-full">
                                            <div className="flex flex-row item-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider w-full">
                                                <p>(1) Food</p>
                                              </div>
                                              <div className="text-center text-sm font-extrabold text-gray-500 uppercase  tracking-wider w-full ">
                                                <p>TIME</p>
                                              </div>
                                              <div className="text-center text-sm font-extrabold text-gray-500 uppercase  tracking-wider w-full ">
                                                <p>CONTENT</p>
                                              </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                                <p>• breakfast</p>
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="m_time"
                                                  placeholder="time"
                                                  value={formData_1.m_time}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-left overflow-auto placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="m_what"
                                                  placeholder="content"
                                                  value={formData_1.m_what}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                                <p>• lunch</p>
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="l_time"
                                                  placeholder="time"
                                                  value={formData_1.l_time}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-left overflow-auto placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="l_what"
                                                  placeholder="content"
                                                  value={formData_1.l_what}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                                <p>• dinner</p>
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="d_time"
                                                  placeholder="time"
                                                  value={formData_1.d_time}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-left overflow-auto placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="d_what"
                                                  placeholder="content"
                                                  value={formData_1.d_what}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                                <p>
                                                  • in between diet
                                                </p>
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="o_time"
                                                  placeholder="time"
                                                  value={formData_1.o_time}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-left overflow-auto placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md uppercase w-full text-cyan-950"
                                                  type="text"
                                                  name="o_what"
                                                  placeholder="content"
                                                  value={formData_1.o_what}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                            </div>
                                            <div className="flex flex-row item-center gap-2 pb-1 pt-2 w-full">
                                              <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider w-full">
                                                <p>(2) Water</p>
                                              </div>
                                              <div className="text-center text-sm font-extrabold text-gray-500  tracking-wider w-full ">
                                                <p>how many glasses/day ?</p>
                                              </div>
                                              <div className="text-center text-sm font-extrabold text-gray-500  tracking-wider w-full ">
                                                <p>at what time?</p>
                                              </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-2 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase  tracking-wider w-full">
                                                <p>• water</p>
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-serif   text-md w-full text-cyan-950"
                                                  type="text"
                                                  name="w_time"
                                                  placeholder="how many glasses/day ?"
                                                  value={formData_1.w_time}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                              <div className="w-full">
                                                <input
                                                  className="bg-white px-2 rounded-md py-2 text-left  placeholder:text-center shadow-lg h-10 shadow-slate-950 font-serif text-md   w-full text-cyan-950"
                                                  type="text"
                                                  name="w_what"
                                                  placeholder="at what time?"
                                                  value={formData_1.w_what}
                                                  onChange={handleInputChange_1}
                                                  
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex flex-col gap-2  w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                            <p>* Activities</p>
                                          </div>
                                          <div className="pl-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                              <p>(1) Extra Activities</p>
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                <div>
                                                  <p>• Walking</p>
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
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                <div>
                                                  <p>• running</p>
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

                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                <div>
                                                  <p>• yoga</p>
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
                                              
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                <div>
                                                  <p>• swimming</p>
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
                                              
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                <div>
                                                  <p>• Cycling</p>
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
                                          
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                <div>
                                                  <p>• Aerobics</p>
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
                                            
                                            </div>
                                            <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                              <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                <div>
                                                  <p>• gym/treadmill</p>
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
                                            </div>
                                            <div className="w-full">
                                          <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="other_p"
                                              placeholder="enter a Extra Activities"
                                              onChange={handleInputChange_1}
                                              value={formData_1.other_p}
                                            ></textarea>
                                          </div>
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                              <p>(2) routine activities</p>
                                              <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                                <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                  <div>
                                                    <p>• stair climbing </p>
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
                                               
                                              </div>
                                              <div className="flex flex-row items-center gap-2 pb-1 w-full">
                                                <div className="text-left text-sm font-extrabold text-red-500 uppercase flex flex-row items-center justify-between  tracking-wider w-full ">
                                                  <div>
                                                    <p>• household work</p>
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
                                               
                                              </div>
                                              <div className="w-full">
                                          <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="other_p_1"
                                              placeholder="enter a other routine Activities"
                                              onChange={handleInputChange_1}
                                              value={formData_1.other_p_1}
                                            ></textarea>
                                          </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex flex-col pt-3 gap-2 pb-1 w-full">
                                        <div className="text-left text-sm font-extrabold text-gray-500 uppercase flex flex-col gap-3  justify-between  tracking-wider w-full ">
                                          <div>
                                            <p>Remarks</p>
                                          </div>
                                          <div className="w-full">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="remark"
                                              placeholder="remarks"
                                              
                                              onChange={handleInputChange_1}
                                              value={formData_1.remark}
                                            ></textarea>
                                          </div>
                                        </div>
                                      </div>
                                      <div className=" flex flex-col gap-2 w-full">
                                        <div className="text-left text-sm font-extrbold font-medium text-gray-500 uppercase  tracking-wider">
                                          <p>* IMAGE</p>
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
                                          {selectedImages&& selectedImages.length>0&&selectedImages.map(
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
                                      <div className="grid grid-flow-row w-full md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-5 rounded-lg pt-5">
                                    {pdfFiles && pdfFiles.length > 0 && pdfFiles.map((fileName, index) => {
        const extractedDate = extractDate(fileName);
        return (
          <div className="w-full inline-flex gap-1 items-center border-2 rounded-md p-2 bg-cyan-900 font-sans font-bold text-center" key={index} onClick={() => openPdfInNewTab(fileName)}>
            <img className="w-5 rounded-sm h-5" src={pdf} alt="" srcset="" />
            <h1 className="cursor-pointer ">
              {extractedDate ? moment(extractedDate).format('DD-MM-YYYY') : "No date found"}
            </h1>
          </div>
        );
      })}
                                    </div>
                                      <div className="flex flex-row justify-between gap-3 font-serif uppercase mt-5">
                                        <div>
                                          <input
                                            type="checkbox"
                                            id="confirmCheckbox"
                                            checked={buttonEnabled}
                                            onChange={handleCheckboxChange}
                                          />
                                          <label htmlFor="confirmCheckbox" className="text-red-800 font-serif">
                                            Confirm Upload Report
                                          </label>
                                        </div>
                                        <div>
                                          <button
                                            className={`bg-cyan-950 text-white py-2 px-3 rounded-md uppercase ${buttonEnabled === false ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                                            type="submit"
                                            disabled={buttonEnabled === false}
                                          >
                                            {button ? "SUBMIT" : "UPDATE"}
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                )}
                                {selectedDiv === "pain management" && (
                                  <div className="rounded-md flex flex-col gap-3 p-2 bg-slate-200 overflow-auto text-white">
                                
                                  <form
                                    onSubmit={handleSubmit}
                                    enctype="multipart/form-data">
                                       <h1 className="text-blue-800 font-serif uppercase text-xl pb-3">
                                        (A) Subjective Assessment
                                      </h1>
                                    <div className="grid grid-flow-row md:grid-cols-1 lg:grid-cols-5 w-full gap-2">
                                    <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>DOB</p>
                                          </div>
                                          <div className="">
                                          <input
                                            type="date"
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="dob"
                                            onChange={handleInputChange_2}
                                            value={formData_2.dob}
                                            max={
                                              new Date()
                                                .toISOString()
                                                .split("T")[0]
                                            }
                                          />
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                              <p>EDUCATION</p>
                                            </div>
                                            <div className="">
                                            <input
                                              type="text"
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="study"
                                              placeholder="education"
                                              onChange={handleInputChange_2}
                                              value={formData_2.study}
                                            />
                                          </div>
                                          </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>Phone Number</p>
                                          </div>
                                          <div className="">
                                          <input
                                            type="tel"
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-sans uppercase h-10"
                                            name="contact"
                                            readOnly
                                            value={selectedPatientId.contact}
                                            maxLength={10}
                                            minLength={10}
                                            placeholder="phone number"
                                            pattern="^\d+$"
                                          />
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>Ocuupation</p>
                                          </div>
                                          <div className="">
                                          <input
                                            type="text"
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="occupation"
                                            placeholder="Occupation"
                                            onChange={handleInputChange_2}
                                            value={formData_2.occupation}
                                          />
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>Address</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="address"
                                            placeholder="Address"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.address}
                                          ></textarea>
                                        </div>
                                        </div>
                                    </div>
                                
                                    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2  gap-2 w-full pt-2">
                                    <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>Chief Complain</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="chfCmp"
                                            placeholder="Chief Complain"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.chfCmp}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>Dominant Side</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="domSide"
                                            placeholder="Dominant Side"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.domSide}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="col-span-2 flex flex-col w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>medical history</p>
                                          </div>
                                          <div className="flex flex-row w-full justify-between">
                                            <div className=" inline-flex gap-2 items-center text-center w-full">
                                              <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="hyperTense"
                                                id=""
                                                checked={
                                                  formData_2.hyperTense == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">Hypertension</label>
                                            </div>
                                            <div className=" inline-flex gap-2 items-center text-center w-full">
                                              <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="diabetes"
                                                id=""
                                                checked={
                                                  formData_2.diabetes == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">diabetes</label>
                                            </div>
                                            <div className=" inline-flex gap-2 items-center text-center w-full">
                                              <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="thyroid"
                                                id=""
                                                checked={
                                                  formData_2.thyroid == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">thyroid</label>
                                            </div>
                                            <div className=" inline-flex gap-2 items-center text-center w-full">
                                              <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="asthama"
                                                id=""
                                                checked={
                                                  formData_2.asthama == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">asthma</label>
                                            </div>
                                            <div className=" inline-flex gap-2 items-center text-center w-full">
                                              <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="others"
                                                id=""
                                                checked={
                                                  formData_2.others == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">others</label>
                                            </div>
                                            {formData_2.others == 1 && (
                                            <div className="w-full">
                                              <input
                                                className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                type="text"
                                                name="other_p_value"
                                                value={
                                                  formData_2.other_p_value
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                            </div>
                                          )}
                                            
                                          </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left font-serif  text-red-600 uppercase tracking-wider">
                                            <p>past surgical history</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="pastSurg"
                                            placeholder="past surgical history"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.pastSurg}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left  font-serif text-red-600 uppercase tracking-wider">
                                            <p>present Surgical history</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="presentSurg"
                                            placeholder="present surgial history"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.presentSurg}
                                          ></textarea>
                                        </div>
                                        </div>
                                         <div className="text-left col-span-2 font-serif  text-red-600 uppercase tracking-wider">
                                            <p>PAIN EVALUATION</p>
                                          </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>site/Location</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="siteLoca"
                                            placeholder="Enter Site/Location"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.siteLoca}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>side</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="side"
                                            placeholder="Enter a Side"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.side}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-2 w-full">
                                        <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>type</p>
                                          </div>
                                          <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  w-full">
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="dull"
                                                id=""
                                                checked={
                                                  formData_2.dull == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">DULLachING</label>
                                              </div>
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="cramp"
                                                id=""
                                                checked={
                                                  formData_2.cramp == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">cramping</label>
                                              </div>
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="sharpShoot"
                                                id=""
                                                checked={
                                                  formData_2.sharpShoot == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">Sharp shooting</label>
                                              </div>
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="burn"
                                                id=""
                                                checked={
                                                  formData_2.burn == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">burning</label>
                                              </div>
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="throb"
                                                id=""
                                                checked={
                                                  formData_2.throb == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">throbbing</label>
                                              </div>
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="numb"
                                                id=""
                                                checked={
                                                  formData_2.numb == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">numbness</label>
                                              </div>
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="tingling"
                                                id=""
                                                checked={
                                                  formData_2.tingling == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">tingling</label>
                                              </div>
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="typeother"
                                                id=""
                                                checked={
                                                  formData_2.typeother == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">others</label>
                                              </div>
                                              {formData_2.typeother == 1 && (
                                            <div className="w-full">
                                              <input
                                                className="bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                type="text"
                                                name="other_p_value_3"
                                                value={
                                                  formData_2.other_p_value_3
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                            </div>
                                          )}
                                          </div>
                                          
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>frequency/nature</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="freqNature"
                                            placeholder="frequency/nature"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.freqNature}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>Duration</p>
                                          </div>
                                          <div className="">
                                            <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="duration" id="" onChange={handleInputChange_2} value={formData_2.duration}required>
                                              <option value="acute" selected={formData_2.duration==='acute'}>acute</option>
                                              <option value="subacute"selected={formData_2.duration==='subacute'}>subacute</option>
                                              <option value="chrowic"selected={formData_2.duration==='chrowic'}>chronic</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>pain aggravating factor</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="painAgrFact"
                                            placeholder="pain aggravating factor"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.painAgrFact}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>pain relieving factor</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="painRelFact"
                                            placeholder="pain relieving factor"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.painRelFact}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>intensity:(nprs)=Numerical Pain Rating Scale</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="intensity"
                                            placeholder="intensity:(nprs)=Numerical Pain Rating Scale"
                                            onChange={handleInputChange_2}
                                            value={formData_2.intensity}
                                          ></textarea>
                                        </div>
                                        </div>
                                       
                                      <h1 className="text-blue-800 font-serif uppercase text-xl pt-3">
                                     (B) Objective Assessment
                                      </h1>
                                        <div className="col-span-2 flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>observation</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="observation"
                                            placeholder="observation"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.observation}
                                          ></textarea>
                                        </div>
                                        </div>
                                       
                                        <div className="col-span-2 flex flex-col gap-2 w-full">
                                        <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>PALPATION</p>
                                          </div>
                                          <div className="grid grid-flow-row gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  w-full">
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="tend"
                                                id=""
                                                checked={
                                                  formData_2.tend == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">tenderness</label>
                                              </div>

                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="crepitus"
                                                id=""
                                                checked={
                                                  formData_2.crepitus == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">crepitus</label>
                                              </div>
                                              <div className="flex flex-row items-center gap-2">
                                              <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                                  <p>Scar</p>
                                              </div>
                                              <div className="">
                                                <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="scar" id="" onChange={handleInputChange_2} value={formData_2.scar} required>
                                                <option value="heal" selected={formData_2.scar==="heal"}>heal</option>
                                                <option value="nonheal" selected={formData_2.scar==="nonheal"}>nonheal</option>
                                              </select>
                                            </div>
                                            </div>
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4"
                                                type="checkbox"
                                                name="swelling"
                                                id=""
                                                checked={
                                                  formData_2.swelling == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">swelling</label>
                                              </div>
                                              
                                              <div className="inline-flex gap-2 font-serif text-red-600 uppercase items-center w-full">
                                                <input
                                                className="h-4 w-4 "
                                                type="checkbox"
                                                name="palpOthers"
                                                id=""
                                                checked={
                                                  formData_2.palpOthers == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">Others</label>
                                              </div>
                                              {formData_2.palpOthers == 1 && (
                                            <div className="w-full">
                                              <input
                                                className=" bg-white px-2 rounded-md py-2 text-center shadow-lg h-10 shadow-slate-950 font-mono text-md uppercase w-full text-cyan-950"
                                                type="text"
                                                name="other_p_value_2"
                                                value={
                                                  formData_2.other_p_value_2
                                                }
                                                onChange={handleInputChange_2}
                                              />
                                            </div>
                                          )}
                                             
                                            
                                          </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>examination</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="examination"
                                            placeholder="examination"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.examination}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>investigation/radiological findings</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="investRadioFinding"
                                            placeholder="investigation/radiological findings"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.investRadioFinding}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>medical diagnosis</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="medDiagno"
                                            placeholder="medical diagnosis"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.medDiagno}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>physiotherapy diagnosis</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="phyDiagno"
                                            placeholder="physiotherapy diagnosis"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.phyDiagno}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>treatment</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="ObjTreatment"
                                            placeholder="Treatment"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.ObjTreatment}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>remarks</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="remark"
                                            placeholder="remarks"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.remark}
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
                                        {selectedImages && selectedImages.length>0 && selectedImages.map(
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
                                    <div className="grid grid-flow-row w-full md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-5 rounded-lg pt-5">
                                    {pdfFiles && pdfFiles.length > 0 && pdfFiles.map((fileName, index) => {
        const extractedDate = extractDate(fileName);
        return (
          <div className="w-full inline-flex gap-1 items-center border-2 rounded-md p-2 bg-cyan-900 font-sans font-bold text-center" key={index} onClick={() => openPdfInNewTab(fileName)}>
            <img className="w-5 rounded-sm h-5" src={pdf} alt="" srcset="" />
            <h1 className="cursor-pointer ">
              {extractedDate ? moment(extractedDate).format('DD-MM-YYYY') : "No date found"}
            </h1>
          </div>
        );
      })}
                                    </div>
                                    <div className="flex flex-row justify-between gap-3 font-serif uppercase mt-5">
                                      <div>
                                        <input
                                          type="checkbox"
                                          id="confirmCheckbox"
                                          checked={buttonEnabled}
                                          onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="confirmCheckbox" className="text-red-800 font-serif">
                                          Confirm Upload Report
                                        </label>
                                      </div>
                                      <div>
                                        <button
                                          className={`bg-cyan-950 text-white py-2 px-3 rounded-md uppercase ${buttonEnabled === false ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                                          type="submit"
                                          disabled={buttonEnabled === false}
                                        >
                                          {button ? "SUBMIT" : "UPDATE"}
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
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
            <div className="h-10  flex justify-center items-center bg-slate-200 w-full text-center font-serif font-thin overflow-hidden">
  <p className="">© 2024 . Arpan Advanced Physiotherapy & Fitness Center. Devloped By <Link to="https://codzcartinfotech.com/" className="text-blue-800">
    Codzcart Infotech
        </Link></p>
</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
