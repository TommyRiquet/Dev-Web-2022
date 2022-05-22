import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import bcrypt from 'bcryptjs';




const Registration = () => {
    let navigate = useNavigate();
    const [validated, setValidated] = useState(false);  

    function testValues(event){
        if(!(checkNameValidity(event.target[0].value,event.target[1].value))){
            document.getElementById('errorDiv').innerText= "Nom et/ou prénom erroné(s)";
            return false;
        
        }
        else if(!(isNameCharactersEnough(event.target[0].value,event.target[1].value))){
            document.getElementById('errorDiv').innerText= "La longueur de votre nom et/ou votre prénom n'est pas suffisante";
            return false;
        }
        else if(!(isEmailCharactersEnough(event.target[2].value))){
            document.getElementById('errorDiv').innerText= "La longueur de votre email n'est pas suffisante";
            return false;
        }
        else if(!(checkEmailValidity(event.target[2].value))){
            document.getElementById('errorDiv').innerText= "Votre email n'est pas valide";
            return false;
        }
        else if(!(checkPasswordValidity(event.target[3].value,event.target[4].value))){
            document.getElementById('errorDiv').innerText= "La confirmation du mot de passe a échoué";
            return false;
        }
        else if(!(isPasswordCharactersEnough(event.target[3].value))){
            document.getElementById('errorDiv').innerText= "La longueur de votre mot de passe n'est pas suffisante";
            return false;
        }
        else if(!(isNewsletterBoolean(event.target[5].checked))){
            document.getElementById('errorDiv').innerText= "Problème avec la newsletter";
            return false;
        }
        else{
            return true;
        }
    }

    function checkNameValidity(prenom,nom){ 
        
        if(isStringCorrect(prenom) && isStringCorrect(nom)){
            return true;
        }
        return false;   
    }

    function isNameCharactersEnough(prenom, nom){
        if(prenom.length >= 2 && nom.length >= 2){
            return true;
        }
        return false;
    }
    function isEmailCharactersEnough(email){
        if(email.length >= 5){
            return true;
        }
        return false;
    }
    function checkEmailValidity(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return true;
        }else{
            return false;
        }
            
    }
    function isPasswordCharactersEnough(password){
        if(password.length >= 8){
            return true;
        }
        return false;
    }

    function  checkPasswordValidity(mdp1,mdp2){ 
        if(mdp1 === mdp2){
            return true;
        }
        return false;   
    }

    function isNewsletterBoolean(newsletter){
        if(typeof newsletter === "boolean"){
            return true;
        }
        else{
            return false;
        }
    }

    function isStringCorrect(str){
        for(let i=0;i<str.length;i++){
            if(!((str[i].charCodeAt()>=65 && str[i].charCodeAt()<=90) || ( str[i].charCodeAt()>=97 && str[i].charCodeAt()<=122))){ //65:90 - 97:122
                return false;
            }
        }
        return true;
    }



   

    const handleSubmit = (event) => {
        /*Cette fonction vérifie si le champ est rempli
        PRE : les informations envoyé par le formulaire
        POST : /
        */ 
       
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();

            if (testValues(event)){
                sendForm(event);  
                navigate('/accueil')

            }
            
        }
        setValidated(true);
        
    };


    const sendForm = (event) =>{
        /*Cette fonction va envoyer les informations sur un utilisateur à la base de données
        PRE : les informations envoyé par le formulaire
        POST : /
        */ 
       let passwordSecu = hashPassword(event.target[3].value)
        const user ={
            lastname: event.target[1].value,
            firstname: event.target[0].value,
            password: passwordSecu,
            email: event.target[2].value,
            newsletter:event.target[5].checked
        };
        function hashPassword(password) {
            return bcrypt.hashSync(password, "$2a$10$G1aQn.Tn1jDpUJPLJ2JnEO") // hash created previously created upon sign up
        }
        

        axios
        .post("/users/register", user)
        .then(res => console.log(res) )
        .catch(err => console.log(err));
  };


    return (
        <div>
            <Container>   
                <Row className='mb-5'></Row>
                <Row className="justify-content-md-center mb-4">
                    <Col md="auto">
                        <h2>Inscription</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-4">
                    <Col md="auto">
                        <h4 id="errorDiv" style={{color:"red", fontWeight:"bold" }}> </h4>
                    </Col>
                </Row>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="justify-content-md-center mb-4">
                        <Col xs lg="3">
                            <Form.Group  controlId="validationCustom01">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control required type="text" placeholder="Jean" minLength="2"/>
                            <Form.Control.Feedback type="invalid">
                                Veuillez entrer un prénom
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs lg="3">
                            <Form.Group controlId="validationCustom02">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control required type="text" placeholder="Dupont" minLength="2"/>
                            <Form.Control.Feedback type="invalid">
                                Veuillez entrer un nom
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-4">
                        <Col xs lg="6">
                            <Form.Group controlId="validationCustom03">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" placeholder="jean@gmail.com" required minLength="5"/>
                            <Form.Control.Feedback type="invalid">
                                Votre e-mail n'est pas valide
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-4">
                        <Col xs lg="3">
                            <Form.Group  controlId="validationCustom04">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control required type="password" placeholder="Mot de passe" minLength="8"/>
                            <Form.Control.Feedback type="invalid">
                                Veuillez entrer un mot de passe
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs lg="3">
                            <Form.Group controlId="validationCustom05">
                            <Form.Label>Entrez à nouveau votre mot de passe</Form.Label>
                            <Form.Control required type="password" placeholder="Mot de passe" minLength="8"/>
                            <Form.Control.Feedback type="invalid">
                                Veuillez à nouveau entrer un mot de passe
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Form.Group className="mb-3">
                                <Form.Check
                                label="Je souhaite m'inscrire à la newsletter" defaultChecked={true} 
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button type="submit" variant="success">S'inscrire</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export {Registration}
