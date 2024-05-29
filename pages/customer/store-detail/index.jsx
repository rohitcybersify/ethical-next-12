import React, { useState } from 'react'
import Layout from '../../../components/super-adminLayout/Layout'
import Styles from './Store.module.css'
import { Store_Detail_Data } from '../../../constants/data'
import images from '../../../constants/images'
import Image from 'next/image'

const Store = () => {
  const [store, setStore] = useState(false)
  const [selectedFile, setSelectedFile] = useState('')

  const handleFileChange = (event) => {
    // Access the selected file from event.target.files
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  return (
    <>
      <Layout>
        {store ? (
          <div className={Styles.planning_section}>
            <p>What do you plan to do first ?</p>
            <div className={Styles.planning_section_content}>
              {Store_Detail_Data.map((data) => (
                <>
                  <div className={Styles.detail_content} key={data.id}>
                    <input type="radio" name="questions" id="" />
                    <p>{data.text}</p>
                  </div>
                </>
              ))}
            </div>
            <div className={Styles.bottom_buttons}>
              <button onClick={() => setStore(false)}>Back</button>
              <button>Next</button>
            </div>
          </div>
        ) : (
          <div className={Styles.middle_section}>
            <div className={Styles.middle_section_container}>
              <div className={Styles.text_content}>
                <p>Add your store name</p>
                <input type="text" placeholder="Enter store name here" />
              </div>
              <div className={Styles.middle_content}>
                <p>Upload store logo here</p>
                <div className={Styles.file_Container}>
                  <div className={Styles.add_icon}>
                    <label htmlFor="file">
                      <input
                        type="file"
                        id="file"
                        // onChange={handleFileChange}
                      />
                      <div className={Styles.add_buton}>
                        <Image src={images.Plus_Icon} width={60} height={60} />
                      </div>
                      {selectedFile && (
                        <>
                          <div className={Styles.preview_image}>
                            <Image
                              src={URL.createObjectURL(selectedFile)}
                              layout="fill"
                              alt="selected_image"
                            />
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                  {selectedFile && (
                    <div className={Styles.selectedFile}>
                      <p>{selectedFile.name}</p>
                    </div>
                  )}
                </div>
                <div className={Styles.desc_container}>
                  <p>Let’s get started. Which of these best describes you?</p>
                  <div className={Styles.desc}>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident.
                    </span>
                  </div>
                </div>
                <div className={Styles.bottom_buttons}>
                  <button onClick={() => setStore(true)}>Next</button>
                  <button>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Store
