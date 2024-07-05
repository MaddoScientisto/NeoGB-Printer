import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import Button from './components/Button';
import './App.css';
import MergedCanvas from './components/MergedCanvas'

function App() {
  const [images, setImages] = useState([]);
  const [folderInfo, setFolderInfo] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColors, setSelectedColors] = useState({
    Red: null,
    Green: null,
    Blue: null,
  });
  
  async function fetchImages() {
    console.log("Refetching images");
    // if (process.env.NODE_ENV === "development")
    // {
    //
    //   const result = [{"ImageFolder":{"1":{"ImageName":"00237","id":1,"bmp":1,"png":1},"2":{"ImageName":"00238","id":2,"bmp":1,"png":1},"3":{"ImageName":"00239","id":3,"bmp":1,"png":1},"4":{"ImageName":"00240","id":4,"bmp":1,"png":1},"5":{"ImageName":"00241","id":5,"bmp":1,"png":1},"6":{"ImageName":"00242","id":6,"bmp":1,"png":1},"7":{"ImageName":"00243","id":7,"bmp":1,"png":1},"8":{"ImageName":"00244","id":8,"bmp":1,"png":1},"9":{"ImageName":"00245","id":9,"bmp":1,"png":1},"10":{"ImageName":"00246","id":10,"bmp":1,"png":1},"11":{"ImageName":"00247","id":11,"bmp":1,"png":1},"12":{"ImageName":"00248","id":12,"bmp":1,"png":1},"13":{"ImageName":"00249","id":13,"bmp":1,"png":1},"14":{"ImageName":"00250","id":14,"bmp":1,"png":1},"15":{"ImageName":"00251","id":15,"bmp":1,"png":1},"16":{"ImageName":"00252","id":16,"bmp":1,"png":1},"17":{"ImageName":"00253","id":17,"bmp":1,"png":1},"18":{"ImageName":"00254","id":18,"bmp":1,"png":1},"19":{"ImageName":"00255","id":19,"bmp":1,"png":1},"20":{"ImageName":"00256","id":20,"bmp":1,"png":1},"21":{"ImageName":"00257","id":21,"bmp":1,"png":1},"22":{"ImageName":"00258","id":22,"bmp":1,"png":1}},"FolderInfo":{"totImages":22,"haveDumps":0}}];
    //   setImages(Object.values(result[0].ImageFolder));
    //   setFolderInfo(result[0].FolderInfo);
    // }
    // else {
      const response = await fetch('ImgList.json');
      const result = await response.json();
      setImages(Object.values(result[0].ImageFolder));
      setFolderInfo(result[0].FolderInfo);
    // }
    
  }
  
  async function fetchJson(jsonLink) {
    try {
      const response = await fetch(jsonLink);
      const result = await response.text();
      console.log("Data Fetched:", result);
      
      switch (jsonLink) {
        case 'refreshlist':
          await fetchImages();
          break;
        default:
          console.log("Done.");
      }
    }
    catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      // const response = await fetch('ImgList.json');
      // const result = await response.json();
      // setImages(Object.values(result[0].ImageFolder));
      // setFolderInfo(result[0].FolderInfo);
      await fetchImages();
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
  
  const onDelete = (imageName) => {
    closeModal();
    console.log(`Deleting ${imageName}`)
    fetchJson(`delete/${imageName}`).then();
  }
  
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Game Boy Printer Gallery</h1>
      <hr />
      <div id="msgDumps" style={{ display: 'none' }}>
        You still have some dumps to convert into image. Please reboot your Printer to <b>Printer Mode</b> and convert then holding the button. Then reboot again to boot in <b>Server Mode</b> to see your new pics.
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button text="Refresh List" onClick={() => fetchImages()} />
      </div>
      <Gallery images={images} onImageClick={openModal} selectedColors={selectedColors} setSelectedColors={setSelectedColors} />
      {modalVisible && <Modal image={selectedImage} onClose={closeModal} onDelete={onDelete}  />}
      {(selectedColors.Red || selectedColors.Green || selectedColors.Blue) && (
        <MergedCanvas selectedColors={selectedColors} />
      )}
    </div>
  );
}

export default App;
