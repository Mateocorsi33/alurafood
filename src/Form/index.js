import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { LogoSpace, FormSpace, Img } from "./styles";
import DatosUsuario from "./DatosUsuario";
import DatosPersonales from "./DatosPersonales";
import DatosEntrega from "./DatosEntrega";
import Complete from "./Complete";
import Stepper from "../Stepper";
import { getValue } from "@testing-library/user-event/dist/utils";
import Step from "./Step";

// Validaciones
import { validarEmail, validarPassword } from "./DatosUsuario/validaciones";


const Form = () => {
  const [step,setStep] = useState(0);
  const [pasos, setPasos] = useState({})

  

  // useEffect(async () => {
  //     try{
  //       const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  //       const posts = await data.json()
  //     }catch(e){
  //       console.log(e)
  //     }
  // })
  


  const updateStep = (step) => {
    setStep(step);
  }

  const steps = {
    0: <DatosUsuario updateStep={updateStep}/>,
    1: <DatosPersonales updateStep={updateStep}/>,
    2: <DatosEntrega updateStep={updateStep}/>,
    3: <Complete /> 
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newStep = step + 1;
    setStep(newStep);
  };

  const handleChange = (element, position, currentStep, validator) => {
    const value = element.target.value
    const valid = validator(value);
    console.log(value);
    stepsFlow[0].inputs[0].label = "Nombre"
  }

  const stepsFlow = {
    0: {
      inputs: [
        {
          label: "Correo Electrónico",
          type: "email",
          value: "",
          valid: null,
          onChange: handleChange,
          helperTex: "Ingresa un correo electrónico válido.",
          validator: validarEmail,
        },
        {
          label: "Contraseña",
          type: "password",
          value: "",
          valid: null,
          onChange: handleChange,
          helperTex: "Ingresa una contraseña válida, Al menos 8 caracteres y máximo 20.",
          validator: validarPassword,
        }
      ],
      buttonText: "Siguiente",
      onSubmit,
    },
  };

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flexbox",
        flexDirection: "column",
      }}
    >
      <LogoSpace>
        <Img src={"/favicon.png"} />
        <Typography variant="h3">AluraFood</Typography>
      </LogoSpace>
      <FormSpace>
      {(step < 3) && <Stepper step={step} />} 
        {/* {steps[step]} */}
      <Step data={stepsFlow[step]} step={step}/>
      </FormSpace>
    </Box>
  );
};

export default Form;
