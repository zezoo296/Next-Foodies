'use client'
import { useRef, useState } from 'react';
import style from './image-picker.module.css';
import Image from 'next/image';

const ImagePicker = ({ label, name }) => {
    const [pickedImage, setPickedImage] = useState(null);
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(e){
        const file = e.target.files[0];
        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
    }

    return (
        <div className={style.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={style.control}>
                <div className={style.preview}>
                    {pickedImage ? <Image src={pickedImage} alt="the image selected by the user" fill /> : <p>No image picked yet</p>}
                    
                </div>
                <input
                    className={style.input}
                    type='file'
                    id={name}
                    accept='image/png, image/jpeg'
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button className={style.button} type='button' onClick={handlePickClick}>Pick an image</button>
            </div>
        </div>
    )
}

export default ImagePicker
