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
import pdf from "../element/pdf.jpg";
import { Form } from "react-bootstrap";

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
    return images[category];
  };
  const [formData, setFormData] = useState({
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
    dob:''
  });
  const [formData_1, setFormData_1] = useState({
    acidity: "",
    address: "",
    contact: "",
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
  });
  const [formData_2, setFormData_2] = useState({
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
    dob:''
  });
  const [formData_3, setFormData_3] = useState({
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
    dob:''
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
    setFormData({
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
      duration: '',
      painAgrFact: '',
      painRelFact: '',
      intensity: '',
      observation: '',
      tend: 0,
      crepitus: 0,
      scar: '',
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
      dob:''
    });
    setFormData_1({
      acidity: "",
      address: "",
      contact: "",
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
    });
    setFormData_2({
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
      duration: '',
      painAgrFact: '',
      painRelFact: '',
      intensity: '',
      observation: '',
      tend: 0,
      crepitus: 0,
      scar: '',
      swelling: 0,
      typeother:'',
      other_p_value_3:'',
      palpOthers: 0,
      examination: '',
      investRadioFinding: '',
      medDiagno: '',
      phyDiagno: '',
      ObjTreatment: '',
      remark: '',
      dob:''
    });
    setFormData_3({
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
      duration: '',
      painAgrFact: '',
      painRelFact: '',
      intensity: '',
      observation: '',
      tend: 0,
      crepitus: 0,
      scar: '',
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
      dob:''
    });
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
    if (selectedDiv === "weight_loss") {
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
          contact: appointmentData.contact,
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
    if (selectedDiv === "pain_management") {
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
    const MAX_TEXT_WIDTH = 550;
    if (selectedDiv == "weight_loss") {
      try {
       
        const doc = new jsPDF();
        doc.setTextColor(255, 0, 0);
        doc.text("* PATIENT REPORT *", doc.internal.pageSize.getWidth() / 2, 12, {
          align: "center",
        });
        doc.setTextColor(255, 0, 0); // Set text color to red (RGB: 255, 0, 0)
        doc.text(
          moment(selectedPatientId.appointment_date).format("DD-MM-YYYY"),
          190,
          12,
          { align: "center" }
        );
        doc.setTextColor(0, 0, 0);
        let y = 20;

        function addText(text, x, y, fontStyle, fontSize) {
          doc.setFont(fontStyle);
          doc.setFontSize(fontSize);
          doc.text(text, x, y);
        }

        function addPageBorder() {
          doc.setDrawColor(0); // Border color (black)
          doc.setLineWidth(0.5); // Border line width
          doc.rect(
            5,
            5,
            doc.internal.pageSize.getWidth() - 10,
            doc.internal.pageSize.getHeight() - 10
          ); // Add a border around the page
        }

        const truncateText = (text) => {
          if (doc.getStringUnitWidth(text) * 14 > MAX_TEXT_WIDTH) {
            let truncatedText = '';
            for (let i = 0; i < text.length; i++) {
              truncatedText += text[i];
              if (doc.getStringUnitWidth(truncatedText + '...') * 14 > MAX_TEXT_WIDTH) {
                truncatedText = truncatedText.slice(0, -1) + '...';
                break;
              }
            }
            return truncatedText;
          }
          return text;
        };

        const fields = [
          {
            label: "Name",
            value: selectedPatientId.name,
            labelX: 10,
            labelY: y,
            valueX: 10,
            valueY: y + 7,
          },
          {
            label: "Age",
            value: selectedPatientId.age,
            labelX: 80,
            labelY: y,
            valueX: 80,
            valueY: y + 7,
          },
          {
            label: "Gender",
            value: selectedPatientId.gender,
            labelX: 102,
            labelY: y,
            valueX: 102,
            valueY: y + 7,
          },
          {
            label: "Contact",
            value: formData_1.contact,
            labelX: 138,
            labelY: y,
            valueX: 138,
            valueY: y + 7,
          },
          {
            label: "Occupation",
            value: formData_1.occupation,
            labelX: 174,
            labelY: y,
            valueX: 174,
            valueY: y + 7,
          },
          {
            label: "Address",
            value: formData_1.address,
            labelX: 10,
            labelY: y + 15,
            valueX: 10,
            valueY: y + 22,
          },
          { title: "* History", titleX: 90, titleY: y + 29 },
          {
            label: "1)Asthma",
            value: formData_1.acidity == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 35,
            valueX: 55,
            valueY: y + 35,
          },
          {
            label: "2)dliatetes",
            value: formData_1.kabajiyat == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 42,
            valueX: 55,
            valueY: y + 42,
           
          },
          {
            label: "3)Heart Disease",
            value: formData_1.heart == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 49,
            valueX: 55,
            valueY: y + 49,
           
          },
          {
            label: "4)Hypertension",
            value: formData_1.blood == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 56,
            valueX: 55,
            valueY: y + 56,
           
          },
          {
            label: "5)Thairoid",
            value: formData_1.thairoid == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 63,
            valueX: 55,
            valueY: y + 63,
          
          },
          {
            label: "6)Dayabitis",
            value: formData_1.dayabitis!== "" ? formData_1.dayabitis : " --- ",
            labelX: 10,
            labelY: y + 70,
            valueX: 55,
            valueY: y + 70,
          },
          {
            label: "7)Other Problem",
            value:
              formData_1.other_p_value !== "" ? formData_1.other_p_value : " --- ",
            labelX: 10,
            labelY: y + 77,
            valueX: 55,
            valueY: y + 77,
          },
          { title: "* Need", titleX: 90, titleY: y + 84 },
          {
            label: "1)Fat Loss",
            value: formData_1.fact_loss == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 90,
            valueX: 55,
            valueY: y + 90,
          },
          {
            label: "2)Fitness",
            value: formData_1.fitness == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 97,
            valueX: 55,
            valueY: y + 97,
           
          },
          {
            label: "3)Health",
            value: formData_1.health == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 104,
            valueX: 55,
            valueY: y + 104,
           
          },
          {
            label: "4)Physique",
            value: formData_1.phy == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 111,
            valueX: 55,
            valueY: y + 111,
           
          },
          {
            label: "5)Weight Gain",
            value: formData_1.weight__up == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 118,
            valueX: 55,
            valueY: y + 118,
          
            
          },
          {
            label: "6)Weight loss",
            value: formData_1.weight_down == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 125,
            valueX: 55,
            valueY: y + 125,
           
          },
          {
            label: "7)Other Problem",
            value: formData_1.dia !== "" ? formData_1.dia : " --- ",
            labelX: 10,
            labelY: y + 132,
            valueX: 55,
            valueY: y + 132,
           
          },
          { title: "* Diet History", titleX: 80, titleY: y + 147 },
          { title: "Diet", titleX: 10, titleY: y + 154 },
          { title: "What", titleX: 50, titleY: y + 154 },
          { title: "Time", titleX: 160, titleY: y + 154 },
          { label: "Breakfast", labelX: 10, labelY: y + 162 },
          {
            value: formData_1.m_what !== "" ? formData_1.m_what : " --- ",
            valueX: 50,
            valueY: y + 162,
          },
          {
            value: formData_1.m_time !== "" ? formData_1.m_time : " --- ",
            valueX: 160,
            valueY: y + 162,
          },
          { label: "Lunch", labelX: 10, labelY: y + 169 },
          {
            value: formData_1.l_what !== "" ? formData_1.l_what : " --- ",
            valueX: 50,
            valueY: y + 169,
          },
          {
            value: formData_1.l_time !== "" ? formData_1.l_time : " --- ",
            valueX: 160,
            valueY: y + 169,
          },
          { label: "Dinner", labelX: 10, labelY: y + 176 },
          {
            value: formData_1.d_what !== "" ? formData_1.d_what : " --- ",
            valueX: 50,
            valueY: y + 176,
          },
          {
            value: formData_1.d_time !== "" ? formData_1.d_time : " --- ",
            valueX: 160,
            valueY: y + 176,
          },
          { label: "In beetween diet", labelX: 10, labelY: y + 183 },
          {
            value: formData_1.o_what !== "" ? formData_1.o_what : " --- ",
            valueX: 50,
            valueY: y + 183,
          },
          {
            value: formData_1.o_time !== "" ? formData_1.o_time : " --- ",
            valueX: 160,
            valueY: y + 183,
          },
          { label: "Water", labelX: 10, labelY: y + 190 },
          {
            value: formData_1.w_what !== "" ? formData_1.w_what : " --- ",
            valueX: 50,
            valueY: y + 190,
          },
          {
            value: formData_1.w_time !== "" ? formData_1.w_time : " --- ",
            valueX: 160,
            valueY: y + 190,
          },
          { title: "* Extra/routine Activities", titleX: 70, titleY: y + 198 },
          { title: "Activity", titleX: 10, titleY: y + 204 },
          { title: "yes/no", titleX: 50, titleY: y + 204 },
          { label: "Cycleling", labelX: 10, labelY: y + 211 },
          {
            value: formData_1.cyc == 1 ? "Yes" : "No",
            valueX: 50,
            valueY: y + 211,
          },
         
          { label: "Walking", labelX: 10, labelY: y + 218 },
          {
            value: formData_1.walk == 1 ? "Yes" : "No",
            valueX: 50,
            valueY: y + 218,
          },
         
          { label: "Yoga", labelX: 10, labelY: y + 225 },
          {
            value: formData_1.yoga == 1 ? "Yes" : "No",
            valueX: 50,
            valueY: y + 225,
          },
         
          { label: "Swimming", labelX: 10, labelY: y + 232 },
          {
            value: formData_1.swe == 1 ? "Yes" : "No",
            valueX: 50,
            valueY: y + 232,
          },
          
          { label: "Running", labelX: 10, labelY: y + 239 },
          {
            value: formData_1.run == 1 ? "Yes" : "No",
            valueX: 50,
            valueY: y + 239,
          },
        
          { label: "Aerobiks", labelX: 10, labelY: y + 246 },
          {
            value: formData_1.machine == 1 ? "Yes" : "No",
            valueX: 50,
            valueY: y + 246,
          },
          { label: "Gym/Tredmill", labelX: 10, labelY: y + 253},
          {
            value: formData_1.o == 1 ? "Yes" : "No",
            valueX: 50,
            valueY: y + 253,
          },
          { label: "Other_Extra_Activities", labelX: 10, labelY: y+260},
          {
            value:  formData_1.other_p!== "" ?`=> ${formData_1.other_p}` : " --- ",
            valueX: 10,
            valueY: y + 267,
          },
          { label: "_", labelX:0, labelY: y+266},
          { label: "Stair Climing", labelX: 10, labelY: y },
          {
            value: formData_1.dada== 1 ? "Yes" : "No",
            valueX: 55,
            valueY: y ,
          },
          { label: "Household Work", labelX: 10, labelY: y+7},
          {
            value: formData_1.work== 1 ? "Yes" : "No",
            valueX: 55,
            valueY: y +7,
          },
          { label: "Other_Routine_Activities", labelX: 10, labelY: y+14},
          {
            value: formData_1.other_p_1!== "" ?`=> ${formData_1.other_p_1}` : " --- ",
            valueX: 10,
            valueY: y + 21,
          },];
        let addToNextPage = false;

        fields.forEach((field) => {
          if (addToNextPage) {
            doc.addPage();
            addPageBorder();
            y = 20; // Reset y-coordinate
            addToNextPage = false; // Reset flag to avoid multiple page additions
          }
          addPageBorder();
          if (field.title !== undefined) {
            doc.setTextColor(21, 94, 117);
            
            addText(`${field.title}`, field.titleX, field.titleY, "bold", 15);
          }
          if (field.label !== undefined) {
            doc.setTextColor(97, 3, 22);
            addText(`${field.label}:`, field.labelX, field.labelY, "italic", 16);
          }
          if (field.value !== undefined) {
            doc.setTextColor(0);
            const truncatedText = truncateText(field.value);
            addText(truncatedText, field.valueX, field.valueY, "normal", 14);
          }
          if (field.label === "_") {
            addToNextPage = true;
          }
        });
        const pdfBlob = doc.output("blob");
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
        formDataObject.append("contact", formData_1.contact);
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
        formDataObject.append("other_P_1", formData_1.other_p_1);
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
        setSelectedImages([]);
        setSelectedPatientId({ patient_id: "", appointment_id: "", name: "", age: "", gender: "", appointment_date: "", appointment_time: "" });
        setFormData_1({
          acidity: "",
          address: "",
          contact: "",
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
        });
        setButtonEnabled(false);
        setPdfFiles([]);
        closeModal();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
    else if (selectedDiv == "physiotherapy") {
      try {
        const doc = new jsPDF();
        doc.setTextColor(255, 0, 0);
        doc.text("* PATIENT REPORT *", doc.internal.pageSize.getWidth() / 2, 12, {
          align: "center",
        });
        doc.setTextColor(255, 0, 0); 
        doc.text(
          moment(selectedPatientId.appointment_date).format("DD-MM-YYYY"),
          190,
          12,
          { align: "center" }
        );
        doc.setTextColor(0, 0, 0);
        let y = 20;

        function addText(text, x, y, fontStyle, fontSize) {
          doc.setFont(fontStyle);
          doc.setFontSize(fontSize);
          doc.text(text, x, y);
        }

        function addPageBorder() {
          doc.setDrawColor(0); // Border color (black)
          doc.setLineWidth(0.5); // Border line width
          doc.rect(
            5,
            5,
            doc.internal.pageSize.getWidth() - 10,
            doc.internal.pageSize.getHeight() - 10
          ); // Add a border around the page
        }

        const truncateText = (text) => {
          if (doc.getStringUnitWidth(text) * 14 > MAX_TEXT_WIDTH) {
            while (doc.getStringUnitWidth(text + '...') * 14 > MAX_TEXT_WIDTH) {
              text = text.slice(0, -1);
            }
            text += '...';
          }
          return text;
        };

        const fields = [
          {
            label: "Name",
            value: selectedPatientId.name,
            labelX: 10,
            labelY: y,
            valueX: 10,
            valueY: y + 7,
          },
          {
            label: "Age",
            value: selectedPatientId.age,
            labelX: 80,
            labelY: y,
            valueX: 80,
            valueY: y + 7,
          },
          {
            label: "Gender",
            value: selectedPatientId.gender,
            labelX: 102,
            labelY: y,
            valueX: 102,
            valueY: y + 7,
          },
          {
            label: "Dob",
            value: moment(formData.dob).format('DD-MM-YYYY'),
            labelX: 138,
            labelY: y,
            valueX: 138,
            valueY: y + 7,
          },
          {
            label: "Occupation",
            value: formData.occupation,
            labelX: 174,
            labelY: y,
            valueX: 174,
            valueY: y + 7,
          },
          
          {
            label: "* Address",
            value: `=> ${formData.address}`,
            labelX: 10,
            labelY: y + 14,
            valueX: 10,
            valueY: y + 19,
          },
          {
            label: "* Dominant Side",
            value: `=> ${formData.domSide}`,
            labelX: 10,
            labelY: y + 26,
            valueX: 10,
            valueY: y + 31,
          },
          {
            label: "* Chief Complaint",
            value: `=> ${formData.chfCmp}`,
            labelX: 10,
            labelY: y + 38,
            valueX: 10,
            valueY: y + 43,
          },
          { title: "* History", titleX: 90, titleY: y + 50},
          {
            label: "1)Asthma",
            value: formData.asthama == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 56,
            valueX: 55,
            valueY: y + 56,
          },
          {
            label: "2)dliatetes",
            value: formData.diabetes == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 63,
            valueX: 55,
            valueY: y + 63,
           
          },
          {
            label: "3)Thayroid",
            value: formData.thyroid == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 70,
            valueX: 55,
            valueY: y + 70,
           
          },
          {
            label: "4)Hypertension",
            value: formData.hyperTense == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 77,
            valueX: 55,
            valueY: y + 77,
          },
          {
            label: "5)Other History",
            value: formData.other_p_value!== "" ? formData.other_p_value : " --- ",
            labelX: 10,
            labelY: y + 84,
            valueX: 55,
            valueY: y + 84,
          },
          {
            label: "6)Past History",
            value: formData.pastSurg!== "" ? formData.pastSurg : " --- ",
            labelX: 10,
            labelY: y + 91,
            valueX: 55,
            valueY: y + 91,
          },
          {
            label: "7)Present History",
            value: formData.presentSurg!== "" ? formData.presentSurg : " --- ",
            labelX: 10,
            labelY: y + 98,
            valueX: 55,
            valueY: y + 98,
          },
          { title: "* PAIN EVALUATION", titleX: 75, titleY: y + 105 },
          {
            label: "* Site/Location",
            value: formData.siteLoca!== "" ? `=> ${formData.siteLoca}` : " --- ",
            labelX: 10,
            labelY: y + 111,
            valueX: 10,
            valueY: y + 116,
          },
          {
            label: "* Side",
            value: formData.side!== "" ? `=> ${formData.side}` : " --- ",
            labelX: 10,
            labelY: y + 123,
            valueX: 10,
            valueY: y + 128,
          },
          {
            label: "* Frequency/Nature",
            value: formData.freqNature!== "" ? `=> ${formData.freqNature}` : " --- ",
            labelX: 10,
            labelY: y + 135,
            valueX: 10,
            valueY: y + 140,
          },
          {
            label: "* Pain Aggravating Factor",
            value: formData.painAgrFact!== "" ? `=> ${formData.painAgrFact}` : " --- ",
            labelX: 10,
            labelY: y + 147,
            valueX: 10,
            valueY: y + 152,
          },
          {
            label: "* Pain Relieving Factor",
            value: formData.painRelFact!== "" ? `=> ${formData.painRelFact}` : " --- ",
            labelX: 10,
            labelY: y + 159,
            valueX: 10,
            valueY: y + 164,
          },
          {
            label: "* Intensity(NPRS)",
            value: formData.intensity!== "" ? `=> ${formData.intensity

            }` : " --- ",
            labelX: 10,
            labelY: y + 171,
            valueX: 10,
            valueY: y + 176,
          },
          {label: "* Type", labelX: 10, labelY: y + 183},
          {
            label: "1)Dullaaying",
            value: formData.dull== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 189,
            valueX: 55,
            valueY: y + 189,
          },
          {
            label: "2)Cramping",
            value: formData.cramp== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 196,
            valueX: 55,
            valueY: y + 196,
          },
          {
            label: "3)Sharp Shooting",
            value: formData.sharpShoot== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 203,
            valueX: 55,
            valueY: y + 203,
          },
          {
            label: "4)Burning ",
            value: formData.burn== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 210,
            valueX: 55,
            valueY: y + 210,
          },
          {
            label: "5)Throbbing",
            value: formData.throb== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 217,
            valueX: 55,
            valueY: y + 217,
          },
          {
            label: "6)Numbness",
            value: formData.numb== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 225,
            valueX: 55,
            valueY: y + 225,
          },
          {
            label: "7)Tingling",
            value: formData.tingling== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 232,
            valueX: 55,
            valueY: y + 232,
          },
          {
            label: "8)Other",
            value: formData.other_p_value_3!== "" ? `${formData.other_p_value_3
            }` : " --- ",
            labelX: 10,
            labelY: y + 239,
            valueX: 55,
            valueY: y + 239,
          },
          {
            label: "* Duaration",
            value: formData.duration!== "" ? `${formData.duration
            }` : " --- ",
            labelX: 10,
            labelY: y + 246,
            valueX: 55,
            valueY: y + 246,
          },
          { title: "* OBJECTIVE ASSESSMENT", titleX: 70, titleY: y + 253},
          {
            label: "* Observation",
            value: formData.observation!== "" ? `=> ${formData.observation
            }` : " --- ",
            labelX: 10,
            labelY: y + 260,
            valueX: 10,
            valueY: y + 265,
          },
          { label: "* Palpation", labelX: 10, labelY: y},
          {
            label: "1)Tenderness",
            value: formData.tend== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 7,
            valueX: 55,
            valueY: y + 7,
          },
          {
            label: "2)Crepitus",
            value: formData.crepitus== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 14,
            valueX: 55,
            valueY: y + 14,
          },
          {
            label: "3)Scar",
            value: formData.scar!== "" ? `${formData.scar
            }` : " --- ",
            labelX: 10,
            labelY: y + 21,
            valueX: 55,
            valueY: y + 21,
          },
          {
            label: "4)Swelling ",
            value: formData.swelling== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 28,
            valueX: 55,
            valueY: y + 28,
          },
          {
            label: "5)other_p_value_2",
            value: formData.other_p_value_2!== "" ? `=> ${formData.other_p_value_2
            }` : " --- ",
            labelX: 10,
            labelY: y +35,
            valueX: 55,
            valueY: y + 35,
          },
          {
            label: "* Examination",
            value: formData.examination!== "" ? `=> ${formData.examination
            }` : " --- ",
            labelX: 10,
            labelY: y +42,
            valueX: 10,
            valueY: y + 47,
          },
          {
            label: "* Innestigation/Radiological Findings",
            value: formData.investRadioFinding!== "" ? `=> ${formData.investRadioFinding
            }` : " --- ",
            labelX: 10,
            labelY: y +54,
            valueX: 10,
            valueY: y + 59,
          },
          {
            label: "* Medical Diagnosis",
            value: formData.medDiagno!== "" ? `=> ${formData.medDiagno
            }` : " --- ",
            labelX: 10,
            labelY: y +66,
            valueX: 10,
            valueY: y + 71,
          },
          {
            label: "* Physiotherapy Diagnosis",
            value: formData.phyDiagno!== "" ? `=> ${formData.phyDiagno
            }` : " --- ",
            labelX: 10,
            labelY: y +78,
            valueX: 10,
            valueY: y + 84,
          },
          {
            label: "* Treatment",
            value: formData.ObjTreatment!== "" ? `=> ${formData.ObjTreatment
            }` : " --- ",
            labelX: 10,
            labelY: y +91,
            valueX: 10,
            valueY: y + 96,
          },
          {
            label: "* Remark",
            value: formData.remark!== "" ? `=> ${formData.remark
            }` : " --- ",
            labelX: 10,
            labelY: y +103,
            valueX: 10,
            valueY: y + 108,
          },
        ];
        let addToNextPage = false;
        fields.forEach((field,index) => {
          if (addToNextPage) {
            // Start a new page for all fields after * Observation
            doc.addPage();
            addPageBorder();
            y = 20; // Reset y-coordinate
            addToNextPage = false; // Reset flag to avoid multiple page additions
          }
          addPageBorder();
          if (field.title !== undefined) {
            doc.setTextColor(21, 94, 117);
            addText(`${field.title}`, field.titleX, field.titleY, "bold", 15);
          }
          if (field.label !== undefined) {
            doc.setTextColor(97, 3, 22);
            addText(`${field.label}:`, field.labelX, field.labelY, "italic", 15);
          }
          if (field.value !== undefined) {
            doc.setTextColor(0);
            const truncatedText = truncateText(field.value);
            addText(truncatedText, field.valueX, field.valueY, "normal", 13);
          }
          if (field.label === "* Observation") {
            addToNextPage = true;
          }
        });
        const pdfBlob = doc.output("blob");
        const formDataObject = new FormData();
        formDataObject.append("patient_id", selectedPatientId.patient_id);
        formDataObject.append(
          "appointment_id",
          selectedPatientId.appointment_id
        );
        formDataObject.append("name", selectedPatientId.name);
        formDataObject.append("age", selectedPatientId.age);
        formDataObject.append("gender", selectedPatientId.gender);
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
        setSelectedImages([]);
        setSelectedPatientId({ patient_id: "", appointment_id: "", name: "", age: "", gender: "", appointment_date: "", appointment_time: "" });
        setFormData({
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
          dob:'',
          dull: 0,
          cramp: 0,
          sharpShoot: 0,
          burn: 0,
          throb: 0,
          numb: 0,
          tingling: 0,
          freqNature: '',
          duration: '',
          painAgrFact: '',
          painRelFact: '',
          intensity: '',
          observation: '',
          tend: 0,
          crepitus: 0,
          scar: '',
          swelling: 0,
          palpOthers: 0,
          examination: '',
          investRadioFinding: '',
          medDiagno: '',
          phyDiagno: '',
          ObjTreatment: '',
          remark: '',
          typeother:'',
          other_p_value_3:''
        });
        setButtonEnabled(false);
        setPdfFiles([]);
        closeModal();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
    else if (selectedDiv == "pain_management") {
      try {
        const doc = new jsPDF();
        doc.setTextColor(255, 0, 0);
        doc.text("* PATIENT REPORT *", doc.internal.pageSize.getWidth() / 2, 12, {
          align: "center",
        });
        doc.setTextColor(255, 0, 0); 
        doc.text(
          moment(selectedPatientId.appointment_date).format("DD-MM-YYYY"),
          190,
          12,
          { align: "center" }
        );
        doc.setTextColor(0, 0, 0);
        let y = 20;
        
        function addText(text, x, y, fontStyle, fontSize) {
          doc.setFont(fontStyle);
          doc.setFontSize(fontSize);
          doc.text(text, x, y);
        }
        
        function addPageBorder() {
          doc.setDrawColor(0); // Border color (black)
          doc.setLineWidth(0.5); // Border line width
          doc.rect(
            5,
            5,
            doc.internal.pageSize.getWidth() - 10,
            doc.internal.pageSize.getHeight() - 10
          ); // Add a border around the page
        }
        const truncateText = (text) => {
          if (doc.getStringUnitWidth(text) * 14 > MAX_TEXT_WIDTH) {
            while (doc.getStringUnitWidth(text + '...') * 14 > MAX_TEXT_WIDTH) {
              text = text.slice(0, -1);
            }
            text += '...';
          }
          return text;
        };
        
        const fields = [
          {
            label: "Name",
            value: selectedPatientId.name,
            labelX: 10,
            labelY: y,
            valueX: 10,
            valueY: y + 7,
          },
          {
            label: "Age",
            value: selectedPatientId.age,
            labelX: 80,
            labelY: y,
            valueX: 80,
            valueY: y + 7,
          },
          {
            label: "Gender",
            value: selectedPatientId.gender,
            labelX: 102,
            labelY: y,
            valueX: 102,
            valueY: y + 7,
          },
          {
            label: "Dob",
            value: moment(formData_2.dob).format('DD-MM-YYYY'),
            labelX: 138,
            labelY: y,
            valueX: 138,
            valueY: y + 7,
          },
          {
            label: "Occupation",
            value: formData_2.occupation,
            labelX: 174,
            labelY: y,
            valueX: 174,
            valueY: y + 7,
          },
          
          {
            label: "* Address",
            value: `=> ${formData_2.address}`,
            labelX: 10,
            labelY: y + 14,
            valueX: 10,
            valueY: y + 19,
          },
          {
            label: "* Dominant Side",
            value: `=> ${formData_2.domSide}`,
            labelX: 10,
            labelY: y + 26,
            valueX: 10,
            valueY: y + 31,
          },
          {
            label: "* Chief Complaint",
            value: `=> ${formData_2.chfCmp}`,
            labelX: 10,
            labelY: y + 38,
            valueX: 10,
            valueY: y + 43,
          },
          { title: "* History", titleX: 90, titleY: y + 50},
          {
            label: "1)Asthma",
            value: formData_2.asthama == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 56,
            valueX: 55,
            valueY: y + 56,
          },
          {
            label: "2)dliatetes",
            value: formData_2.diabetes == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 63,
            valueX: 55,
            valueY: y + 63,
           
          },
          {
            label: "3)Thayroid",
            value: formData_2.thyroid == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 70,
            valueX: 55,
            valueY: y + 70,
           
          },
          {
            label: "4)Hypertension",
            value: formData_2.hyperTense == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 77,
            valueX: 55,
            valueY: y + 77,
          },
          {
            label: "5)Other History",
            value: formData_2.other_p_value!== "" ? formData_2.other_p_value : " --- ",
            labelX: 10,
            labelY: y + 84,
            valueX: 55,
            valueY: y + 84,
          },
          {
            label: "6)Past History",
            value: formData_2.pastSurg!== "" ? formData_2.pastSurg : " --- ",
            labelX: 10,
            labelY: y + 91,
            valueX: 55,
            valueY: y + 91,
          },
          {
            label: "7)Present History",
            value: formData_2.presentSurg!== "" ? formData_2.presentSurg : " --- ",
            labelX: 10,
            labelY: y + 98,
            valueX: 55,
            valueY: y + 98,
          },
          { title: "* PAIN EVALUATION", titleX: 75, titleY: y + 105 },
          {
            label: "* Site/Location",
            value: formData_2.siteLoca!== "" ? `=> ${formData_2.siteLoca}` : " --- ",
            labelX: 10,
            labelY: y + 111,
            valueX: 10,
            valueY: y + 116,
          },
          {
            label: "* Side",
            value: formData_2.side!== "" ? `=> ${formData_2.side}` : " --- ",
            labelX: 10,
            labelY: y + 123,
            valueX: 10,
            valueY: y + 128,
          },
          {
            label: "* Frequency/Nature",
            value: formData_2.freqNature!== "" ? `=> ${formData_2.freqNature}` : " --- ",
            labelX: 10,
            labelY: y + 135,
            valueX: 10,
            valueY: y + 140,
          },
          {
            label: "* Pain Aggravating Factor",
            value: formData_2.painAgrFact!== "" ? `=> ${formData_2.painAgrFact}` : " --- ",
            labelX: 10,
            labelY: y + 147,
            valueX: 10,
            valueY: y + 152,
          },
          {
            label: "* Pain Relieving Factor",
            value: formData_2.painRelFact!== "" ? `=> ${formData_2.painRelFact}` : " --- ",
            labelX: 10,
            labelY: y + 159,
            valueX: 10,
            valueY: y + 164,
          },
          {
            label: "* Intensity(NPRS)",
            value: formData_2.intensity!== "" ? `=> ${formData_2.intensity
        
            }` : " --- ",
            labelX: 10,
            labelY: y + 171,
            valueX: 10,
            valueY: y + 176,
          },
          {label: "* Type", labelX: 10, labelY: y + 183},
          {
            label: "1)Dullaaying",
            value: formData_2.dull== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 189,
            valueX: 55,
            valueY: y + 189,
          },
          {
            label: "2)Cramping",
            value: formData_2.cramp== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 196,
            valueX: 55,
            valueY: y + 196,
          },
          {
            label: "3)Sharp Shooting",
            value: formData_2.sharpShoot== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 203,
            valueX: 55,
            valueY: y + 203,
          },
          {
            label: "4)Burning ",
            value: formData_2.burn== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 210,
            valueX: 55,
            valueY: y + 210,
          },
          {
            label: "5)Throbbing",
            value: formData_2.throb== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 217,
            valueX: 55,
            valueY: y + 217,
          },
          {
            label: "6)Numbness",
            value: formData_2.numb== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 225,
            valueX: 55,
            valueY: y + 225,
          },
          {
            label: "7)Tingling",
            value: formData_2.tingling== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 232,
            valueX: 55,
            valueY: y + 232,
          },
          {
            label: "8)Other",
            value: formData_2.other_p_value_3!== "" ? `${formData_2.other_p_value_3
            }` : " --- ",
            labelX: 10,
            labelY: y + 239,
            valueX: 55,
            valueY: y + 239,
          },
          {
            label: "* Duaration",
            value: formData_2.duration== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 246,
            valueX: 55,
            valueY: y + 246,
          },
          { title: "* OBJECTIVE ASSESSMENT", titleX: 70, titleY: y + 253},
          {
            label: "* Observation",
            value: formData_2.observation!== "" ? `=> ${formData_2.observation
            }` : " --- ",
            labelX: 10,
            labelY: y + 260,
            valueX: 10,
            valueY: y + 265,
          },
          { label: "* Palpation", labelX: 10, labelY: y},
          {
            label: "1)Tenderness",
            value: formData_2.tend== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 7,
            valueX: 55,
            valueY: y + 7,
          },
          {
            label: "2)Crepitus",
            value: formData_2.crepitus== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 14,
            valueX: 55,
            valueY: y + 14,
          },
          {
            label: "3)Scar",
            value: formData_2.scar!== "" ? `${formData_2.scar
            }` : " --- ",
            labelX: 10,
            labelY: y + 21,
            valueX: 55,
            valueY: y + 21,
          },
          {
            label: "4)Swelling ",
            value: formData_2.swelling== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 28,
            valueX: 55,
            valueY: y + 28,
          },
          {
            label: "5)other_p_value_2",
            value: formData_2.other_p_value_2!== "" ? `=> ${formData_2.other_p_value_2
            }` : " --- ",
            labelX: 10,
            labelY: y +35,
            valueX: 55,
            valueY: y + 35,
          },
          {
            label: "* Examination",
            value: formData_2.examination!== "" ? `=> ${formData_2.examination
            }` : " --- ",
            labelX: 10,
            labelY: y +42,
            valueX: 10,
            valueY: y + 47,
          },
          {
            label: "* Innestigation/Radiological Findings",
            value: formData_2.investRadioFinding!== "" ? `=> ${formData_2.investRadioFinding
            }` : " --- ",
            labelX: 10,
            labelY: y +54,
            valueX: 10,
            valueY: y + 59,
          },
          {
            label: "* Medical Diagnosis",
            value: formData_2.medDiagno!== "" ? `=> ${formData_2.medDiagno
            }` : " --- ",
            labelX: 10,
            labelY: y +66,
            valueX: 10,
            valueY: y + 71,
          },
          {
            label: "* Physiotherapy Diagnosis",
            value: formData_2.phyDiagno!== "" ? `=> ${formData_2.phyDiagno
            }` : " --- ",
            labelX: 10,
            labelY: y +78,
            valueX: 10,
            valueY: y + 84,
          },
          {
            label: "* Treatment",
            value: formData_2.ObjTreatment!== "" ? `=> ${formData_2.ObjTreatment
            }` : " --- ",
            labelX: 10,
            labelY: y +91,
            valueX: 10,
            valueY: y + 96,
          },
          {
            label: "* Remark",
            value: formData_2.remark!== "" ? `=> ${formData_2.remark
            }` : " --- ",
            labelX: 10,
            labelY: y +103,
            valueX: 10,
            valueY: y + 108,
          },
        ];
        let addToNextPage = false;
        fields.forEach((field,index) => {
          if (addToNextPage) {
            // Start a new page for all fields after * Observation
            doc.addPage();
            addPageBorder();
            y = 20; // Reset y-coordinate
            addToNextPage = false; // Reset flag to avoid multiple page additions
          }
          addPageBorder();
          if (field.title !== undefined) {
            doc.setTextColor(21, 94, 117);
            addText(`${field.title}`, field.titleX, field.titleY, "bold", 15);
          }
          if (field.label !== undefined) {
            doc.setTextColor(97, 3, 22);
            addText(`${field.label}:`, field.labelX, field.labelY, "italic", 15);
          }
          if (field.value !== undefined) {
            doc.setTextColor(0);
            const truncatedText = truncateText(field.value);
            addText(truncatedText, field.valueX, field.valueY, "normal", 13);
          }
          if (field.label === "* Observation") {
            addToNextPage = true;
          }
        });
        const pdfBlob = doc.output("blob");
        
        const formDataObject = new FormData();
        formDataObject.append("patient_id", selectedPatientId.patient_id);
        formDataObject.append(
          "appointment_id",
          selectedPatientId.appointment_id
        );
        formDataObject.append("name", selectedPatientId.name);
        formDataObject.append("age", selectedPatientId.age);
        formDataObject.append("gender", selectedPatientId.gender);
        formDataObject.append("dob", formData_2.dob);
        formDataObject.append("contact", formData_2.contact);
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
        formDataObject.append("other_p_value_3", formData.other_p_value_3);
        formDataObject.append("typeother", formData.typeother);
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
        setSelectedImages([]);
        setSelectedPatientId({ patient_id: "", appointment_id: "", name: "", age: "", gender: "", appointment_date: "", appointment_time: "" });
        setFormData_2({
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
          other_p_value_2:'',
          typeother:'',
          other_p_value_3:'',
          pastSurg: '',
          presentSurg: '',
          siteLoca: '',
          dob:'',
          side: '',
          dull: 0,
          cramp: 0,
          sharpShoot: 0,
          burn: 0,
          throb: 0,
          numb: 0,
          tingling: 0,
          freqNature: '',
          duration: '',
          painAgrFact: '',
          painRelFact: '',
          intensity: '',
          observation: '',
          tend: 0,
          crepitus: 0,
          scar: '',
          swelling: 0,
          palpOthers: 0,
          examination: '',
          investRadioFinding: '',
          medDiagno: '',
          phyDiagno: '',
          ObjTreatment: '',
          remark: ''
        });
        setButtonEnabled(false);
        setPdfFiles([]);
        closeModal();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
    else {
      try {
        const doc = new jsPDF();
        doc.setTextColor(255, 0, 0);
        doc.text("* PATIENT REPORT *", doc.internal.pageSize.getWidth() / 2, 12, {
          align: "center",
        });
        doc.setTextColor(255, 0, 0); 
        doc.text(
          moment(selectedPatientId.appointment_date).format("DD-MM-YYYY"),
          190,
          12,
          { align: "center" }
        );
        doc.setTextColor(0, 0, 0);
        let y = 20;
        
        function addText(text, x, y, fontStyle, fontSize) {
          doc.setFont(fontStyle);
          doc.setFontSize(fontSize);
          doc.text(text, x, y);
        }
        
        function addPageBorder() {
          doc.setDrawColor(0); // Border color (black)
          doc.setLineWidth(0.5); // Border line width
          doc.rect(
            5,
            5,
            doc.internal.pageSize.getWidth() - 10,
            doc.internal.pageSize.getHeight() - 10
          ); // Add a border around the page
        }
        const truncateText = (text) => {
          if (doc.getStringUnitWidth(text) * 14 > MAX_TEXT_WIDTH) {
            while (doc.getStringUnitWidth(text + '...') * 14 > MAX_TEXT_WIDTH) {
              text = text.slice(0, -1);
            }
            text += '...';
          }
          return text;
        };
        
        const fields = [
          {
            label: "Name",
            value: selectedPatientId.name,
            labelX: 10,
            labelY: y,
            valueX: 10,
            valueY: y + 7,
          },
          {
            label: "Age",
            value: selectedPatientId.age,
            labelX: 80,
            labelY: y,
            valueX: 80,
            valueY: y + 7,
          },
          {
            label: "Gender",
            value: selectedPatientId.gender,
            labelX: 102,
            labelY: y,
            valueX: 102,
            valueY: y + 7,
          },
          {
            label: "Dob",
            value: moment(formData_3.dob).format('DD-MM-YYYY'),
            labelX: 138,
            labelY: y,
            valueX: 138,
            valueY: y + 7,
          },
          {
            label: "Occupation",
            value: formData_3.occupation,
            labelX: 174,
            labelY: y,
            valueX: 174,
            valueY: y + 7,
          },
          
          {
            label: "* Address",
            value: `=> ${formData_3.address}`,
            labelX: 10,
            labelY: y + 14,
            valueX: 10,
            valueY: y + 19,
          },
          {
            label: "* Dominant Side",
            value: `=> ${formData_3.domSide}`,
            labelX: 10,
            labelY: y + 26,
            valueX: 10,
            valueY: y + 31,
          },
          {
            label: "* Chief Complaint",
            value: `=> ${formData_3.chfCmp}`,
            labelX: 10,
            labelY: y + 38,
            valueX: 10,
            valueY: y + 43,
          },
          { title: "* History", titleX: 90, titleY: y + 50},
          {
            label: "1)Asthma",
            value: formData_3.asthama == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 56,
            valueX: 55,
            valueY: y + 56,
          },
          {
            label: "2)dliatetes",
            value: formData_3.diabetes == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 63,
            valueX: 55,
            valueY: y + 63,
           
          },
          {
            label: "3)Thayroid",
            value: formData_3.thyroid == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 70,
            valueX: 55,
            valueY: y + 70,
           
          },
          {
            label: "4)Hypertension",
            value: formData_3.hyperTense == 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 77,
            valueX: 55,
            valueY: y + 77,
          },
          {
            label: "5)Other History",
            value: formData_3.other_p_value!== "" ? formData_3.other_p_value : " --- ",
            labelX: 10,
            labelY: y + 84,
            valueX: 55,
            valueY: y + 84,
          },
          {
            label: "6)Past History",
            value: formData_3.pastSurg!== "" ? formData_3.pastSurg : " --- ",
            labelX: 10,
            labelY: y + 91,
            valueX: 55,
            valueY: y + 91,
          },
          {
            label: "7)Present History",
            value: formData_3.presentSurg!== "" ? formData_3.presentSurg : " --- ",
            labelX: 10,
            labelY: y + 98,
            valueX: 55,
            valueY: y + 98,
          },
          { title: "* PAIN EVALUATION", titleX: 75, titleY: y + 105 },
          {
            label: "* Site/Location",
            value: formData_3.siteLoca!== "" ? `=> ${formData_3.siteLoca}` : " --- ",
            labelX: 10,
            labelY: y + 111,
            valueX: 10,
            valueY: y + 116,
          },
          {
            label: "* Side",
            value: formData_3.side!== "" ? `=> ${formData_3.side}` : " --- ",
            labelX: 10,
            labelY: y + 123,
            valueX: 10,
            valueY: y + 128,
          },
          {
            label: "* Frequency/Nature",
            value: formData_3.freqNature!== "" ? `=> ${formData_3.freqNature}` : " --- ",
            labelX: 10,
            labelY: y + 135,
            valueX: 10,
            valueY: y + 140,
          },
          {
            label: "* Pain Aggravating Factor",
            value: formData_3.painAgrFact!== "" ? `=> ${formData_3.painAgrFact}` : " --- ",
            labelX: 10,
            labelY: y + 147,
            valueX: 10,
            valueY: y + 152,
          },
          {
            label: "* Pain Relieving Factor",
            value: formData_3.painRelFact!== "" ? `=> ${formData_3.painRelFact}` : " --- ",
            labelX: 10,
            labelY: y + 159,
            valueX: 10,
            valueY: y + 164,
          },
          {
            label: "* Intensity(NPRS)",
            value: formData_3.intensity!== "" ? `=> ${formData_3.intensity
        
            }` : " --- ",
            labelX: 10,
            labelY: y + 171,
            valueX: 10,
            valueY: y + 176,
          },
          {label: "* Type", labelX: 10, labelY: y + 183},
          {
            label: "1)Dullaaying",
            value: formData_3.dull== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 189,
            valueX: 55,
            valueY: y + 189,
          },
          {
            label: "2)Cramping",
            value: formData_3.cramp== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 196,
            valueX: 55,
            valueY: y + 196,
          },
          {
            label: "3)Sharp Shooting",
            value: formData_3.sharpShoot== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 203,
            valueX: 55,
            valueY: y + 203,
          },
          {
            label: "4)Burning ",
            value: formData_3.burn== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 210,
            valueX: 55,
            valueY: y + 210,
          },
          {
            label: "5)Throbbing",
            value: formData_3.throb== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 217,
            valueX: 55,
            valueY: y + 217,
          },
          {
            label: "6)Numbness",
            value: formData_3.numb== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 225,
            valueX: 55,
            valueY: y + 225,
          },
          {
            label: "7)Tingling",
            value: formData_3.tingling== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 232,
            valueX: 55,
            valueY: y + 232,
          },
          {
            label: "8)Other",
            value: formData_3.other_p_value_3!== "" ? `${formData_3.other_p_value_3
            }` : " --- ",
            labelX: 10,
            labelY: y + 239,
            valueX: 55,
            valueY: y + 239,
          },
          {
            label: "* Duaration",
            value: formData_3.duration== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 246,
            valueX: 55,
            valueY: y + 246,
          },
          { title: "* OBJECTIVE ASSESSMENT", titleX: 70, titleY: y + 253},
          {
            label: "* Observation",
            value: formData_3.observation!== "" ? `=> ${formData_3.observation
            }` : " --- ",
            labelX: 10,
            labelY: y + 260,
            valueX: 10,
            valueY: y + 265,
          },
          { label: "* Palpation", labelX: 10, labelY: y},
          {
            label: "1)Tenderness",
            value: formData_3.tend== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 7,
            valueX: 55,
            valueY: y + 7,
          },
          {
            label: "2)Crepitus",
            value: formData_3.crepitus== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 14,
            valueX: 55,
            valueY: y + 14,
          },
          {
            label: "3)Scar",
            value: formData_3.scar!== "" ? `${formData_3.scar
            }` : " --- ",
            labelX: 10,
            labelY: y + 21,
            valueX: 55,
            valueY: y + 21,
          },
          {
            label: "4)Swelling ",
            value: formData_3.swelling== 1 ? "Yes" : "No",
            labelX: 10,
            labelY: y + 28,
            valueX: 55,
            valueY: y + 28,
          },
          {
            label: "5)other_p_value_2",
            value: formData_3.other_p_value_2!== "" ? `=> ${formData_3.other_p_value_2
            }` : " --- ",
            labelX: 10,
            labelY: y +35,
            valueX: 55,
            valueY: y + 35,
          },
          {
            label: "* Examination",
            value: formData_3.examination!== "" ? `=> ${formData_3.examination
            }` : " --- ",
            labelX: 10,
            labelY: y +42,
            valueX: 10,
            valueY: y + 47,
          },
          {
            label: "* Innestigation/Radiological Findings",
            value: formData_3.investRadioFinding!== "" ? `=> ${formData_3.investRadioFinding
            }` : " --- ",
            labelX: 10,
            labelY: y +54,
            valueX: 10,
            valueY: y + 59,
          },
          {
            label: "* Medical Diagnosis",
            value: formData_3.medDiagno!== "" ? `=> ${formData_3.medDiagno
            }` : " --- ",
            labelX: 10,
            labelY: y +66,
            valueX: 10,
            valueY: y + 71,
          },
          {
            label: "* Physiotherapy Diagnosis",
            value: formData_3.phyDiagno!== "" ? `=> ${formData_3.phyDiagno
            }` : " --- ",
            labelX: 10,
            labelY: y +78,
            valueX: 10,
            valueY: y + 84,
          },
          {
            label: "* Treatment",
            value: formData_3.ObjTreatment!== "" ? `=> ${formData_3.ObjTreatment
            }` : " --- ",
            labelX: 10,
            labelY: y +91,
            valueX: 10,
            valueY: y + 96,
          },
          {
            label: "* Remark",
            value: formData_3.remark!== "" ? `=> ${formData_3.remark
            }` : " --- ",
            labelX: 10,
            labelY: y +103,
            valueX: 10,
            valueY: y + 108,
          },
        ];
        let addToNextPage = false;
        fields.forEach((field,index) => {
          if (addToNextPage) {
            // Start a new page for all fields after * Observation
            doc.addPage();
            addPageBorder();
            y = 20; // Reset y-coordinate
            addToNextPage = false; // Reset flag to avoid multiple page additions
          }
          addPageBorder();
          if (field.title !== undefined) {
            doc.setTextColor(21, 94, 117);
            addText(`${field.title}`, field.titleX, field.titleY, "bold", 15);
          }
          if (field.label !== undefined) {
            doc.setTextColor(97, 3, 22);
            addText(`${field.label}:`, field.labelX, field.labelY, "italic", 15);
          }
          if (field.value !== undefined) {
            doc.setTextColor(0);
            const truncatedText = truncateText(field.value);
            addText(truncatedText, field.valueX, field.valueY, "normal", 13);
          }
          if (field.label === "* Observation") {
            addToNextPage = true;
          }
        });
        const pdfBlob = doc.output("blob");        
        const formDataObject = new FormData();
        formDataObject.append("patient_id", selectedPatientId.patient_id);
        formDataObject.append(
          "appointment_id",
          selectedPatientId.appointment_id
        );
        formDataObject.append("name", selectedPatientId.name);
        formDataObject.append("age", selectedPatientId.age);
        formDataObject.append("gender", selectedPatientId.gender);
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
        setSelectedImages([]);
        setSelectedPatientId({ patient_id: "", appointment_id: "", name: "", age: "", gender: "", appointment_date: "", appointment_time: "" });
        setFormData_3({
          occupation: '',
          address: '',
          domSide: '',
          chfCmp: '',
          hyperTense: 0,
          diabetes: 0,
          thyroid: 0,
          asthama: 0,
          others: 0,
          dob:'',
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
          duration: '',
          painAgrFact: '',
          painRelFact: '',
          intensity: '',
          observation: '',
          tend: 0,
          crepitus: 0,
          scar: '',
          swelling: 0,
          palpOthers: 0,
          examination: '',
          investRadioFinding: '',
          medDiagno: '',
          phyDiagno: '',
          ObjTreatment: '',
          remark: '',
          typeother:'',
          other_p_value_3:''
        });
        setButtonEnabled(false);
        setPdfFiles([]);
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
                                        
                                        value={selectedDiv}
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
                                    className={`rounded-md border-2 p-2 cursor-pointer text-center w-full  inline-flex items-center justify-center gap-2 ${selectedDiv === "weight_loss"
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
                                    className={`rounded-md border-2 p-2 cursor-pointer text-center w-full inline-flex items-center justify-center gap-2 ${selectedDiv === "pain_management"
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
                                  <div className="rounded-md flex flex-col gap-3 p-2 bg-slate-200 overflow-auto text-white">
                                    
                                    <form
                                      onSubmit={handleSubmit}
                                      enctype="multipart/form-data">
                                      <h1 className="text-blue-800 font-serif uppercase text-xl pb-3">
                                        (A) Subjective Assessment
                                      </h1>
                                      <div className="grid grid-flow-row md:grid-cols-1 lg:grid-cols-3 w-full gap-2">
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
                                              <p>Chief Complaint</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="chfCmp"
                                              placeholder="Chief Complaint"
                                              
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
                                              <p>history</p>
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
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">asthama</label>
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
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">other</label>
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
                                              <p>past surgical</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="pastSurg"
                                              placeholder="past surgical"
                                              
                                              onChange={handleInputChange}
                                              value={formData.pastSurg}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left  font-serif text-red-600 uppercase tracking-wider">
                                              <p>present Surgical</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="presentSurg"
                                              placeholder="present surgial"
                                              
                                              onChange={handleInputChange}
                                              value={formData.presentSurg}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>site/Location</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="siteLoca"
                                              placeholder="present surgial"
                                              
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
                                              placeholder="present surgial"
                                              
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
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">dull aaying</label>
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
                                                <option value="chrowic"selected={formData.duration==="chrowic"}>chrowic</option>
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
                                              <p>intensity</p>
                                            </div>
                                            <div className="w-full">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="intensity"
                                              placeholder="Numerical Pain Rating Scale(NPRS)"
                                              
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
                                                <label className="text-red-600 uppercase font-serif" htmlFor="">tenderess</label>
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
                                                <div>
                                                <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="scar" id="" onChange={handleInputChange} value={formData.scar} required>
                                                <option hidden selected >SCAR</option>
                                                <option value="acute" selected={formData.scar === 'acute'}>heal</option>
                                                <option value="subacute"selected={ formData.scar === 'subacute'}>nonheal</option>
                                              </select>
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
                                                  name="other_p_value"
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
                                              <p>innestigation/radiological finings</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="investRadioFinding"
                                              placeholder="innestigation/radiological finings"
                                              
                                              onChange={handleInputChange}
                                              value={formData.investRadioFinding}
                                            ></textarea>
                                          </div>
                                          </div>
                                          <div className="flex flex-col gap-2 w-full">
                                            <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                              <p>medical dipgnosis</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="medDiagno"
                                              placeholder="medical dipgnosis"
                                              
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
                                              <p>remark</p>
                                            </div>
                                            <div className="">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="remark"
                                              placeholder="remark"
                                              
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
                                {selectedDiv === "fitness" && (
                                   <div className="rounded-md flex flex-col gap-3 p-2 bg-slate-200 overflow-auto text-white">
                                  
                                   <form
                                     onSubmit={handleSubmit}
                                     enctype="multipart/form-data">
                                       <h1 className="text-blue-800 font-serif uppercase text-xl pb-3">
                                        (A) Subjective Assessment
                                      </h1>
                                     <div className="grid grid-flow-row md:grid-cols-1 lg:grid-cols-3 w-full gap-2">
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
                                             <p>Chief Complaint</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="chfCmp"
                                             placeholder="Chief Complaint"
                                             
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
                                             <p>history</p>
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
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">asthama</label>
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
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">other</label>
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
                                             <p>past surgical</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="pastSurg"
                                             placeholder="past surgical"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.pastSurg}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left  font-serif text-red-600 uppercase tracking-wider">
                                             <p>present Surgical</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="presentSurg"
                                             placeholder="present surgial"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.presentSurg}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>site/Location</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="siteLoca"
                                             placeholder="present surgial"
                                             
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
                                             placeholder="present surgial"
                                             
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
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">dull aaying</label>
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
                                                <option value="chrowic"selected={formData_3.duration==="chrowic"}>chrowic</option>
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
                                             <p>intensity</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="intensity"
                                             placeholder="Numerical Pain Rating Scale(NPRS)"
                                             
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
                                               <label className="text-red-600 uppercase font-serif" htmlFor="">tenderess</label>
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
                                               <div>
                                               <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="scar" id="" onChange={handleInputChange_3} value={formData_3.scar} >
                                                <option hidden selected >SCAR</option>
                                               <option value="acute" selected={formData_3.scar === 'acute'}>heal</option>
                                               <option value="subacute"selected={ formData_3.scar === 'subacute'}>nonheal</option>
                                             </select>
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
                                                 name="other_p_value"
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
                                             <p>innestigation/radiological finings</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="investRadioFinding"
                                             placeholder="innestigation/radiological finings"
                                             
                                             onChange={handleInputChange_3}
                                             value={formData_3.investRadioFinding}
                                           ></textarea>
                                         </div>
                                         </div>
                                         <div className="flex flex-col gap-2 w-full">
                                           <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                             <p>medical dipgnosis</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="medDiagno"
                                             placeholder="medical dipgnosis"
                                             
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
                                             <p>remark</p>
                                           </div>
                                           <div className="">
                                           <textarea
                                             className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                             name="remark"
                                             placeholder="remark"
                                             
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
                                                <p>(3) Dialetes</p>
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
                                              placeholder="Enter past History"
                                              onChange={handleInputChange_1}
                                              value={formData_1.dayabitis}
                                            ></textarea>
                                            </div>
                                            <div className="w-full">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="other_p_value"
                                              placeholder="Enter a Other History"
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
                                              <p>(5) weight Gain</p>
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
                                              <p>(6) fat loss</p>
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
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                              <p>(1) Food</p>
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
                                            <div className="text-left text-sm font-extrabold text-gray-500 uppercase  tracking-wider ">
                                              <p>(2) water</p>
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
                                                  <p>• Cycleling</p>
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
                                                  <p>• Aerobiks</p>
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
                                                    <p>• stair climing </p>
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
                                            <p>* Remark</p>
                                          </div>
                                          <div className="w-full">
                                            <textarea
                                              className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                              name="remark"
                                              placeholder="remark"
                                              
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
                                {selectedDiv === "pain_management" && (
                                  <div className="rounded-md flex flex-col gap-3 p-2 bg-slate-200 overflow-auto text-white">
                                
                                  <form
                                    onSubmit={handleSubmit}
                                    enctype="multipart/form-data">
                                       <h1 className="text-blue-800 font-serif uppercase text-xl pb-3">
                                        (A) Subjective Assessment
                                      </h1>
                                    <div className="grid grid-flow-row md:grid-cols-1 lg:grid-cols-3 w-full gap-2">
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
                                            <p>Chief Complaint</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="chfCmp"
                                            placeholder="Chief Complaint"
                                            
                                            onChange={handleInputChange}
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
                                            
                                            onChange={handleInputChange}
                                            value={formData_2.domSide}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="col-span-2 flex flex-col w-full">
                                          <div className="text-left text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                                            <p>history</p>
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
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">asthama</label>
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
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">other</label>
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
                                            <p>past surgical</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="pastSurg"
                                            placeholder="past surgical"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.pastSurg}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left  font-serif text-red-600 uppercase tracking-wider">
                                            <p>present Surgical</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="presentSurg"
                                            placeholder="present surgial"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.presentSurg}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>site/Location</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="siteLoca"
                                            placeholder="present surgial"
                                            
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
                                            placeholder="present surgial"
                                            
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
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">dull aaying</label>
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
                                              <option value="chrowic"selected={formData_2.duration==='chrowic'}>chrowic</option>
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
                                            <p>intensity</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="col-span-2 w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="intensity"
                                            placeholder="Numerical Pain Rating Scale(NPRS)"
                                            
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
                                              <label className="text-red-600 uppercase font-serif" htmlFor="">tenderess</label>
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
                                              <div className="w-full">
                                              <select className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10" name="scar" id="" onChange={handleInputChange_2} value={formData_2.scar} >
                                              <option hidden selected >SCAR</option>
                                              <option value="acute" selected={formData_2.scar === 'acute'}>heal</option>
                                              <option value="subacute"selected={ formData_2.scar === 'subacute'}>nonheal</option>
                                            </select>
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
                                                name="other_p_value"
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
                                            <p>innestigation/radiological finings</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="investRadioFinding"
                                            placeholder="innestigation/radiological finings"
                                            
                                            onChange={handleInputChange_2}
                                            value={formData_2.investRadioFinding}
                                          ></textarea>
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="text-left text-sm font-extrabold  text-gray-600 uppercase tracking-wider">
                                            <p>medical dipgnosis</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="medDiagno"
                                            placeholder="medical dipgnosis"
                                            
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
                                            <p>remark</p>
                                          </div>
                                          <div className="">
                                          <textarea
                                            className="w-full rounded-md text-cyan-950 font-medium p-2 shadow-lg shadow-slate-950 text-sm font-serif uppercase h-10"
                                            name="remark"
                                            placeholder="remark"
                                            
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
                                          onChange={handleInputChange_2}
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
