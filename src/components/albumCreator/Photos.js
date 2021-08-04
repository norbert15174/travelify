import React, { useState } from "react";
import styled from "styled-components";
import RadioButton from "../trinkets/RadioButton";
import "../trinkets/fileUpload.css";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import deleteWhiteIcon from "./assets/deleteWhiteIcon.svg";
import imageNotFoundIcon from "./assets/imageNotFoundIcon.svg";
import StatusMessage from "../trinkets/StatusMessage";

const fakeUploadedImages = [
    {
        id: 1,
        url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1599185475346-3fe52ae9366c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: 3,
        url: "data:image/jpeg;base64,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",
    },
    {
        id: 4,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd75P3Rcc-R0EvXsjYfvdvohBm6aU1sWIKgo2J4ZmoTNPLOlK3I90dNQe-FBKBfZDlZ5q7lSO2d7bInA&usqp=CAU",
    },
    {
        id: 5,
        url: "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
    },
    {
        id: 6,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtOIvAfawQcy5I2291j4MOWHZpQlkF7dAzUsmunCL4B06BQdWa-2eHA8kCov2J8X5kQ59_8U0oiIfeLQ&usqp=CAU",
    },
    {
        id: 7,
        url: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    },
    {
        id: 8,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRG94DFYk9wIxjeg798GzKJCTRv4Qv699mLfrYnat4ykXQc6wxxQqbdiDwmMHCDxIFd1h8PDVERf_NCA&usqp=CAU",
    },
    {
        id: 9,
        url: "https://media.istockphoto.com/photos/thanjavurbrihadeeswara-temple-image-picture-id1198023306?k=6&m=1198023306&s=612x612&w=0&h=P_klIaCJzjyPhz5IsLwR_rqpbpH-dOItRPv6ogDRykU=",
    },
    {
        id: 10,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9QHDJXlOEppaNUbl6lXnXTKu0W3beJ7dyhac-jxWs6RLCetSrrlalyWnUF5Z4YHnkBGfZA-OZZLGbA&usqp=CAU",
    },
]

const initialMainImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9QHDJXlOEppaNUbl6lXnXTKu0W3beJ7dyhac-jxWs6RLCetSrrlalyWnUF5Z4YHnkBGfZA-OZZLGbA&usqp=CAU";

const Photos = () => {

    const [ addType, setAddType ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ singleImage, setSingleImage ] = useState({
        image: undefined,
        description: description,
    });
    const [ multipleImages, setMultipleImages ] = useState([]);
    const [ mainImage, setMainImage ] = useState(initialMainImage);
    const [ albumImages, setAlbumImages ] = useState(fakeUploadedImages);
    const [ imagePreview, setImagePreview ] = useState([{url: "", name: ""}]); // name is needed for deleting images (at multiple files input only) 

    const [ sizeError, setSizeError ] = useState(false);
    const [ typeError, setTypeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ submitMessage, setSubmitMessage ] = useState("");
    const [ deletedFromAlbum, setDeletedFromAlbum ] = useState(false);

    const multipleFilesHandler = (e) => {
        
        let files = e.target.files;

        setTypeError(false);
        setSizeError(false);
        setErrorMessage("");
        setImagePreview([]);

        Array.from(files).every(file => {

            // if one error is found, we skip next files
            if (typeError || sizeError) {
                setMultipleImages([])
                return false;
            }

            if (file === undefined) {
                setMultipleImages([])
                document.getElementById(addType + "__input").value = null;
                return false;
            }
    
            if (file.size >= 5000000) {
                setSizeError(true);
                setErrorMessage("Maksymalny rozmiar zdjęcia to 5MB!");
                setMultipleImages([])
                document.getElementById(addType + "__input").value = null;
                return false;
            }
    
            if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
                setTypeError(true);
                setErrorMessage("Dozwolone formaty zdjęć to JPEG/JPG i PNG!");
                setMultipleImages([]);
                document.getElementById(addType + "__input").value = null;
                return false;
            }   
            
            setMultipleImages((prevState) => [...prevState, file]);
            
            // name is needed!
            setImagePreview((prevState) => [...prevState, {url: URL.createObjectURL(file), name: file.name}]);
            
            return true;

        })

    }

    const singleFileHandler = (e) => {
        
        let file = e.target.files[0];

        setTypeError(false);
        setSizeError(false);
        setErrorMessage("");
        setImagePreview([{url: "", name: ""}]);

        if (file === undefined) {
            setSingleImage({
                image: undefined,
                description: "",
            });
            setMainImage(initialMainImage);
            document.getElementById(addType + "__input").value = null;
            return;
        }

        if (file.size >= 5000000) {
            setSizeError(true);
            setErrorMessage("Maksymalny rozmiar zdjęcia to 5MB!");
            document.getElementById(addType + "__input").value = null;
            return;
        }

        if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
            setTypeError(true);
            setErrorMessage("Dozwolone formaty zdjęć to JPEG/JPG i PNG!");
            document.getElementById(addType + "__input").value = null;
            return;
        }

        if (addType === "single") {
            setSingleImage({
                image: file,
                description: description,
            });
        } else if (addType === "main") {
            setMainImage(file);
        }
        
        // name not needed!
        setImagePreview([{url: URL.createObjectURL(file), name: ""}]);

    }

    const formHandler = () => { 
        if (addType === "single") {
            console.log("Single image added: ");
            console.log(singleImage);
        } else if (addType === "multi") {
            console.log("Multiple images added: ");
            console.log(multipleImages);
        } else if (addType === "main") {
            console.log("Main image added: ");
            console.log(mainImage);
        } else if (addType === "delete") {
            console.log("Something has been deleted.");
        }
        setSubmitMessage("Zmiany zostały zapisane!");
        //clearForm()
    }

    // this function is used only at multi input
    const deleteImageFromAlbum = (imageToDelete, type) => {
        if (type === "multiPreview") {
            // deleting image with specific url from imagePreview state
            let images = imagePreview.filter((image) => image.url !== imageToDelete.url);
            setImagePreview(images);

            // deleting images with specific name from multipleImages
            images = multipleImages.filter((image) => image.name !== imageToDelete.name);
            setMultipleImages(images);
            
            if (imagePreview.length === 1) {
                // when everything from preview will be deleted
                setImagePreview([{url: "", name: ""}]);
                setMultipleImages([]);
                document.getElementById(addType + "__input").value = null;
            }

        } else if (type === "album") {

            // deleting images with specific id from album
            let images = albumImages.filter((image) => image.id !== imageToDelete );
            setAddType("delete")
            setAlbumImages(images);
            setDeletedFromAlbum(true);
        }
    }

    // TODO - dokończ logikę związaną z głównym zdjęciem, jedyne co zrobiłem 

    const clearForm = () => {
        if (document.getElementById(addType + "__input") !== null) {
            document.getElementById(addType + "__input").value = null;
        }
        setSingleImage({
            image: undefined,
            description: description,
        });
        setMultipleImages([])
        setMainImage(initialMainImage);
        setImagePreview([{url: "", name: ""}]);
        setAlbumImages(fakeUploadedImages);
        setTypeError(false);
        setSizeError(false);
        setErrorMessage("");
        setSubmitMessage("");
        setDeletedFromAlbum(false);
    };

    return (
        <>
            <Container>
                <h3>Co chcesz dodać?</h3>
                <RadioContainer onChange={(e) => {
                    setAddType(e.target.value);
                    console.log("length: " + imagePreview.length)
                    clearForm();
                }}>
                    <RadioButton name="radio" id="main" value="main" label="Zdjęcie główne"/>
                    <RadioButton name="radio" id="single" value="single" label="Pojedyncze zdjęcie"/>
                    <RadioButton name="radio" id="multi" value="multi" label="Wiele zdjęć"/>
                </RadioContainer>
                {
                    addType === "single" && (
                        <>
                            <h3>Opis zdjęcia (opcjonalny)</h3>
                            <Description
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Opis zdjęcia zawierający maksymalnie 300 znaków..."
                                maxLength={300}
                            />
                        </>
                    )   
                }
                {
                    (addType === "single" || addType === "multi" || addType === "main") && (
                        <>
                            <FileInput>
                                <input 
                                    className="file__upload" 
                                    type="file" 
                                    id={addType + "__input"} 
                                    multiple={addType === "multi" ? true : false} 
                                    onChange={(e) => {
                                        if (addType === "single" || addType === "main") {
                                            singleFileHandler(e);
                                        } else if (addType === "multi") {
                                            multipleFilesHandler(e);
                                        }
                                    }}
                                />
                                 { errorMessage && <ErrorMessage type="error">{errorMessage}</ErrorMessage> }
                            </FileInput>        
                        </>
                    )
                }
                <Line/>
                <InnerContainer>
                    {addType === "single" || addType === "main" ? (
                        <>
                            <h3>{addType === "main" ? "Zdjęcie główne:" : "Wybrane zdjęcie:"}</h3>
                            { 
                                imagePreview[0].url !== "" || (mainImage !== "" && addType === "main")
                                ?
                                    <SingleImageContainer>
                                        <SingleImage src={imagePreview[0].url || mainImage}/> 
                                        <SingleDeleteButton 
                                            src={deleteWhiteIcon}
                                            noDisplay={addType === "main" ? true : false}
                                            onClick={() => {
                                                if (addType === "single") {
                                                    setSingleImage({
                                                        image: undefined,
                                                        description: description,
                                                    });
                                                } else if (addType === "main") {
                                                    setMainImage(initialMainImage);
                                                }
                                                setImagePreview([{url: "", name: ""}]);
                                                document.getElementById(addType + "__input").value = null;
                                            }}/>
                                    </SingleImageContainer> 
                                : <ImageNotFound/>
                            }  
                        </>
                        ) : addType === "multi" ? (
                            <>
                                <h3>Wybrane zdjęcia:</h3>
                                <PhotoContainer>
                                {
                                    imagePreview[0].url !== "" 
                                    ? imagePreview.map((preview) => (
                                        <MultiImageContainer>
                                            <MultiImage 
                                                key={new Date().getTime() + preview.url.substr()} 
                                                src={preview.url}
                                            />
                                            <DeleteButton src={deleteWhiteIcon} onClick={() => deleteImageFromAlbum(preview, "multiPreview")}/>
                                        </MultiImageContainer> 
                                    )) : <p>Brak zdjęć w albumie...</p>
                                
                                }
                                </PhotoContainer>     
                            </>
                        ) : null}
                    <h3>Zdjęcia w albumie:</h3>
                    <PhotoContainer>
                        {
                            albumImages.length !== 0 
                            ? albumImages.map((image) => (
                                <MultiImageContainer>
                                    <MultiImage 
                                        key={image.id} 
                                        src={image.url}
                                    />
                                    <DeleteButton src={deleteWhiteIcon} onClick={() => deleteImageFromAlbum(image.id, "album")}/>
                                </MultiImageContainer> 
                            )) : <p>Brak zdjęć w albumie...</p>
                            
                        }
                    </PhotoContainer>
                </InnerContainer> 
                <Line/>   
            </Container>
            <Buttons>
                { submitMessage !== "" && <SubmitMessage>{submitMessage}</SubmitMessage>} 
                <Submit 
                    disabled={
                        singleImage.image === undefined && 
                        multipleImages.length === 0 && 
                        !deletedFromAlbum && mainImage === initialMainImage 
                        ? true : false
                    } 
                    type="submit" 
                    onClick={formHandler}
                >
                    Zapisz
                </Submit>
                <Cancel 
                    disabled={
                        singleImage.image === undefined && 
                        multipleImages.length === 0 && 
                        !deletedFromAlbum && mainImage === initialMainImage 
                        ? true : false
                    } 
                    onClick={clearForm}
                >
                        Anuluj
                </Cancel>
            </Buttons>
        </>
    );

}

const Container = styled.div`
    display: grid;
    grid-auto-rows: auto;
    grid-gap: 15px;
    margin: 20px 0px 0px 75px;
    font-size: 18px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    color: ${({theme}) => theme.color.greyFont};
    font-size: 18px;
    @media only screen and (max-width: 1220px) {
        margin: 20px 0px 0px 65px;
    }
    @media only screen and (max-width: 870px) {
        margin: 20px 0px 0px 55px;
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        margin: 15px 0px 0px 40px;
        font-size: 10px;
    }
    @media only screen and (max-width: 480px) {
        margin: 15px 0px 0px 15px;
    }
`;

const RadioContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 200px);
    @media only screen and (max-width: 910px) {
        grid-template-columns: repeat(3, 150px);
        grid-column-gap: 10px;
    }
    @media only screen and (max-width: 870px) {
        grid-template-columns: repeat(3, 100px);
    }
`;

const Description = styled.textarea`
    display: block;
    min-height: 50px;
    width: 40%;
    border-radius: 15px;
    padding: 10px;
    border: none;
    outline: none;
    resize: none;
    background-color:  ${({theme}) => theme.color.darkBackground};
    box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.3);
    text-decoration: none;
    margin-bottom: 12px;
    @media only screen and (max-width: 870px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 10px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 8px;
    }
    &::placeholder {
        color: #5c5b5b;
        @media only screen and (max-width: 870px) {
            font-size: 12px;
        }
        @media only screen and (max-width: 560px) {
            font-size: 10px;
        }
        @media only screen and (max-width: 480px) {
            font-size: 8px;
        }
    }
`;

const FileInput = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
`;

const Line = styled.div`
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const PhotoContainer = styled.div`
    margin: 20px 0px 10px 0px;
    padding: 15px 0px 15px 15px;
    color: #888;
    background: rgba(229, 229, 229, 0.8);
    box-shadow: inset 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    min-height: 100px;
    display: grid;
    grid-template-columns: repeat(13, 100px);
    grid-auto-rows: 100px;
    grid-gap: 10px;
    @media only screen and (max-width: 1880px) {
        grid-template-columns: repeat(12, 100px);
    }
    @media only screen and (max-width: 1750px) {
        grid-template-columns: repeat(11, 100px);
    }
    @media only screen and (max-width: 1625px) {
        grid-template-columns: repeat(10, 100px);
    }
    @media only screen and (max-width: 1525px) {
        grid-template-columns: repeat(9, 100px);
    }
    @media only screen and (max-width: 1360px) {
        grid-template-columns: repeat(8, 100px);
    }
    @media only screen and (max-width: 1240px) {
        grid-template-columns: repeat(7, 100px);
    }
    @media only screen and (max-width: 1115px) {
        grid-template-columns: repeat(6, 100px);
    }
    @media only screen and (max-width: 995px) {
        grid-template-columns: repeat(5, 100px);
    }
    @media only screen and (max-width: 910px) {
        grid-template-columns: repeat(7, 70px);
        grid-auto-rows: 70px;
    }
    @media only screen and (max-width: 860px) {
        grid-template-columns: repeat(6, 70px);
    }
    @media only screen and (max-width: 785px) {
        grid-template-columns: repeat(5, 70px);
    }
    @media only screen and (max-width: 720px) {
        grid-template-columns: repeat(6, 70px);
    }
    @media only screen and (max-width: 660px) {
        grid-template-columns: repeat(5, 70px);
    }
    @media only screen and (max-width: 570px) {
        grid-template-columns: repeat(4, 70px);
    }
`;

const Buttons = styled.div`
    display: flex;   
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 25px;
    height: 40px;
    @media only screen and (max-width: 1080px) {
        height: 25px;
    }
    @media only screen and (max-width: 560px) {
        margin-top: 15px;
        height: 20px;
    }
`;

const SingleImageContainer = styled.div`
    position: relative;
    margin: 10px 0px 20px 25%;
    width: 250px;
    height: 250px;
    @media only screen and (max-width: 870px) {
        width: 175px;
        height: 175px;
    }
    @media only screen and (max-width: 615px) {
        width: 150px;
        height: 150px;
    }
`;

const SingleImage = styled.img`
    width: 250px;
    height: 250px;
    object-fit: cover;
    border: 2px solid #12BFCE;
    @media only screen and (max-width: 870px) {
        width: 175px;
        height: 175px;
    }
    @media only screen and (max-width: 615px) {
        width: 150px;
        height: 150px;
    }
`;

const MultiImageContainer = styled.div`
    width: 100px;
    height: 100px;
    position: relative;
    @media only screen and (max-width: 910px) {
        width: 70px;
        height: 70px;
    }
`;

const MultiImage = styled.img`
    width: 100px; 
    height: 100px;
    border: 2px solid ${({theme}) => theme.color.lightTurquise};
    object-fit: cover;
    @media only screen and (max-width: 910px) {
        width: 70px;
        height: 70px;
    }
`;

const DeleteButton = styled.img`
    position: absolute;
    width: 20px;
    height: 20px;
    top: 5%;
    left: 80%;
    cursor: pointer;
    @media only screen and (max-width: 900px) {
        width: 15px;
        height: 15px;
    }
`;

const SingleDeleteButton = styled.img`
    position: absolute;
    width: 25px;
    height: 25px;
    top: 3%;
    left: 88%;
    cursor: pointer;
    display: ${({noDisplay}) => noDisplay ? "none" : "block"};
    @media only screen and (max-width: 870px) {
        width: 20px;
        height: 20px;
    }
    @media only screen and (max-width: 615px) {
        width: 15px;
        height: 15px;
    }
`;

const ErrorMessage = styled(StatusMessage)`
    position: absolute; 
    width: 300px;
    font-size: 12px;
    align-self: center;
    left: 20%;
`;

const SubmitMessage = styled(StatusMessage)`
    font-size: 12px;
    align-self: center;
    margin-right: 15px;
    @media only screen and (max-width: 1080px) {
        font-size: 8px;
        padding: 5px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 6px;
    }
`;

const ImageNotFound = styled.div`
    width: 250px;
    height: 250px;
    margin: 10px 0px 20px 25%;
    background-image: url(${imageNotFoundIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 75%;
    @media only screen and (max-width: 870px) {
        width: 175px;
        height: 175px;
    }
    @media only screen and (max-width: 615px) {
        width: 150px;
        height: 150px;
    }
`;

export default Photos;