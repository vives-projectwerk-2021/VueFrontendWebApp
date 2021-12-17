# Vue-Frontend-WepApp

This is the Frontend of the Pulu project.

You can find our production build [here](https://pulu.devbitapp.be/).

The frontend contains the following implementations:

 - A homepage where:
    - A product description
    - There is an interactive map to show all devices in the field
    - A beatiful layout.
 - A add sensor page where:
    - You can add sensors with the following information:
        - Device ID
        - Device Name
        - Location
        - First Name
        - Last Name
 - A sensor page where:
    - You see a list of all registered devices.
    - On each device-card basic information is shown about that specific device.
    - One can click on "SEE DATA" to:
        - See all information about a device.
        - Live data that comes in from that specific device.
 - A map page where:
    - All devices are listed on an interactive map based on coordinates.
    - One can click on the wished device and one will get redirected to the Sensor page with the specific device already selected.
 - A about page where one can find information about us.
 
## For developers

Clone the project

Install all dependencies:

```zsh
npm install
```

Add the .env file to project (ask software team).

Run the project by running:

```zsh
npm run serve
```

## QR codes

Our devices make use of QR codes. This QR codes are mounted on the device and give the possibility to be used in two ways. You can scan the qr code with your mobile phone (Camera app or in Google Chrome camera) or you can use the online website which has a tab "qr-scanner".

When you scan a device that is already registered on our website, you will see the sensor details of the device. When the scanned device is not registered, you will be send to the "addsensor" page. Here you can register your device and the device id is already filled in.

The QR codes are added in the img folder.
