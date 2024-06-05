import React, { useState } from 'react'
import Styles from './Input.module.css'
import Image from 'next/image'
import images from '../../constants/images'
import Info_svg from '../../constants/images'
// import cybersifyApi from '../../utils/cybersifyApi'
const Input = () => {
  // const [imgContent, setImgContent] = useState('')

  // const selectdFile = (event) => {
  //   const file = event.target.files[0]
  //   if (file.size / (1024 * 1024) > 2) {
  //     setImgContent(null)
  //     alert('Please select an image file less than 2MB.')
  //   } else {
  //     setImgContent(file)
  //   }
  // }

  // const delete_image = () => {
  //   setImgContent('')
  // }
  const [imgContent, setImgContent] = useState('');

  const selectdFile = (event) => {
    const file = event.target.files[0];
    if (file.size / (1024 * 1024) > 2) {
      setImgContent(null);
      alert('Please select an image file less than 2MB.');
    } else {
      setImgContent(file);
    }
  };

  const delete_image = () => {
    setImgContent('');
  };

  const uploadFile = async () => {
    if (!imgContent) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', imgContent);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.content}>
          <div className={Styles.details}>
            <div className={Styles.inner_content}>
              {Boolean(!imgContent) && (
                <>
                  <p>Upload Artwork  <Image src={images.Info_svg} width={18} height={18} /> </p>
                  <label htmlFor="file">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={selectdFile}
                    />
                    <span>Browse...</span>No file selected.
                  </label>

                  <div className={Styles.bottom_content}>
                    <input type="checkbox" name="" id="" checked="false" />
                    <p>Contact me about artwork</p>
                  </div>
                </>
              )}
              {imgContent && (
                <>
                  <Image
                    src={URL.createObjectURL(imgContent)}
                    className={Styles.img}
                    width={200}
                    height={150}
                  />
                  <span className={Styles.cross_icon} onClick={delete_image}>
                    +
                  </span>
                  <div className={Styles.img_name}>{imgContent.name}</div>
                </>
              )}
            </div>
          </div>
          <button onClick={uploadFile}>Shop Swag</button>
        </div>
      </div>
    </>
  )
}

export default Input
