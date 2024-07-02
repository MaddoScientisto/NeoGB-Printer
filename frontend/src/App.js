import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import Button from './components/Button';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [folderInfo, setFolderInfo] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('ImgList.json');
      const result = await response.json();
      setImages(Object.values(result[0].ImageFolder));
      setFolderInfo(result[0].FolderInfo);
    }
    fetchData();
  }, []);
  
  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };
  
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Game Boy Printer Gallery</h1>
      <hr />
      <div id="msgDumps" style={{ display: 'none' }}>
        You still have some dumps to convert into image. Please reboot your Printer to <b>Printer Mode</b> and convert then holding the button. Then reboot again to boot in <b>Server Mode</b> to see your new pics.
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button text="Refresh List" onClick={() => window.location.reload()} />
      </div>
      <Gallery images={images} onImageClick={openModal} />
      {modalVisible && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default App;
