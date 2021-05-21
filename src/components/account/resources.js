import React, { useState } from "react";
import styled from "styled-components";
import url from "./../../url";

const Rescources = ({ pos, val }) => {

    const [resource, setResource] = useState("no");

    const myHeaders = new Headers({
        Authorization: "Bearer " + localStorage.getItem("Bearer"),
        "Content-Type": "application/json"
    });

    async function getHelloWorld(){
            await fetch(
                url + "/resources",
                {
                  method: "get",
                  headers: myHeaders,
                }
              ).then(response => {if(response.status === 200){
                response.text().then(text => setResource(text));
              } else{
                console.log("Unauthorized")
              }}).catch();
    
              
        }

  return (
    <>
        <Button onClick={e => getHelloWorld()}>CLICK ME</Button>
        {resource === "no" ? null : <Response>{resource}</Response>}
    
    </>
  );
};

const Response = styled.h1`

    display: block;
    position: absolute;
    top: 60vh;
    width: 100vw;
    text-align:center;

`;

const Button = styled.div`
    cursor: pointer;
    position: absolute;
    left: calc(50vw - 150px);
    top: calc(50vh - 20px);
    width: 300px;
    padding-bottom: 20px;
    padding-top: 20px;
    text-align: center;
    background-color: #0fa3b1;
    font-size: 30px;
    color: white;
    border-radius: 15px;
    vertical-align: middle;


`;


export default Rescources;
