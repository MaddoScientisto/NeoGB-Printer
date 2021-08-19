/*******************************************************************************
  Initialize File System and SD Card
*******************************************************************************/
bool fs_setup() {
  spiSD.begin(SD_SCK, SD_MISO, SD_MOSI, SD_CS); //SCK,MISO,MOSI,SS //HSPI1

  FSYS.begin(SD_CS, spiSD);
  if (!FSYS.begin(true)) {
    Serial.println("SD Card Mount Failed");
    #ifdef USE_OLED
      oled_msg("ERROR", "Can't init FileSystem");
    #endif
    return false;
  }else{
    uint8_t cardType = SD.cardType();
    if(cardType == CARD_NONE){
        Serial.println("No SD card attached");
        #ifdef USE_OLED
          oled_msg("No SD Card","Rebooting...");
        #endif
        delay(3000);
        ESP.restart();
    }
  
    Serial.print("SD Card Type: ");
    if(cardType == CARD_MMC){
        Serial.println("MMC");
    } else if(cardType == CARD_SD){
        Serial.println("SDSC");
    } else if(cardType == CARD_SDHC){
        Serial.println("SDHC");
    } else {
        Serial.println("UNKNOWN");
    }
  
    uint64_t cardSize = SD.cardSize() / (1024 * 1024);
    Serial.printf("SD Card Size: %lluMB\n", cardSize);

    File root = FSYS.open("/temp");
    if(!root){
        Serial.println("- failed to open Temp directory");
        if(FSYS.mkdir("/temp")){
            Serial.println("Temp Dir created");
        } else {
            Serial.println("mkdir failed");
        }
    }else{
      Serial.println("Temp folder already exist.");
    }
  
    root = FSYS.open("/dumps");
    if(!root){
        Serial.println("- failed to open Dump directory");
        if(FSYS.mkdir("/dumps")){
            Serial.println("Dump Dir created");
        } else {
            Serial.println("mkdir failed");
        }
    }else{
      Serial.println("Dump folder already exist.");
    }
  
    root = FSYS.open("/output");
    if(!root){
        Serial.println("- failed to open Output directory");
        if(FSYS.mkdir("/output")){
            Serial.println("Output Dir created");
        } else {
            Serial.println("mkdir failed");
        }
    }else{
      Serial.println("Output folder already exist.");
    }

    for (int i = 0; i < 100; i++) {
      if (i % 10 == 0) {
        Serial.print(".");
      }
    }
    Serial.println(" done"); 
    
    return true;
  }
}

/*******************************************************************************
  Get Next File Name
*******************************************************************************/
unsigned int nextFreeFileIndex() {
  int totFiles = 0;
  File root = FSYS.open("/dumps");
  File file = root.openNextFile();
  while (file) {
    if (file) {
      totFiles++;
    }
    file = root.openNextFile();
  }
  return totFiles + 1;
}

/*******************************************************************************
  "Printer Full" function
*******************************************************************************/
void full() {
  Serial.println("no more space on printer");
  digitalWrite(LED_STATUS_PIN, HIGH);
#ifdef USE_OLED
  oled_msg("Printer is full!", "Rebooting...");
#endif
  delay(5000);
  ESP.restart();
}