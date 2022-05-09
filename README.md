## MotorqAssignment: Vehicle Management

#### Live (hosted) at: [https://motorq-fend.vercel.app](https://motorq-fend.vercel.app)

#### Video Demo: [https://www.youtube.com/watch?v=JtDhxVmmp_Q](https://www.youtube.com/watch?v=JtDhxVmmp_Q)

- Stack used: MongoDB, Express, React, Node (MERN)

## UI Snippets

![Home Page](screenshots/Dashboard.png)

![Tooltip Popup](screenshots/Tooltip.png)

![Vehicles Data](screenshots/Table.png)

![Vehicles Add](screenshots/AddNew.png)

![Vehicles Edit](screenshots/Edit.png)

![Vehicles Filter](screenshots/Filter.png)

![Dark mode](screenshots/DarkMode.png)

---

### API Endpoints

#### `GET` `/api/vehicles`

Request

`http://localhost:9000/api/vehicles?count=1&vin=nagAbcd132`

Response

```json
[
  {
    "status": {
      "location": {
        "lat": 33.3545345345,
        "lon": 77.4535345
      },
      "ignition": false,
      "speed": 103
    },
    "_id": "619173491329bf9dbfddb238",
    "vin": "WED78E",
    "licensePlate": "GH12H2345",
    "driver": "Mijitu Kishli",
    "mmy": "2020, BMW, X5",
    "customerName": "Chizht Duinah",
    "office": "S12, Place, Name",
    "__v": 0
  }
]
```

## `PATCH` `/api/vehicles/:id`

Request

`localhost:9000/api/vehicles/619173491329bf9dbfddb238`

Body

```json
{
  "licensePlate": "AA11BB1234",
  "Driver": "Rohan",
  "customerName": "Ali",
  "Office": "Chennai"
}
```

Response

```json
{
  "Status": {
    "location": {
      "lat": 18.560512231893355,
      "lon": 73.87061340023229
    },
    "ignition": true,
    "speed": 87
  },
  "_id": "619173491329bf9dbfddb238",
  "Vin": "puneAbcd30",
  "LicensePlate": "TN23HH30",
  "Driver": "Peter",
  "MMY": "2020, Audi, Q7",
  "CustomerName": "Tony",
  "Office": "Chennai",
  "__v": 0
}
```

---

## Run the Project

Clone the repository first.

```bash
git clone https://github.com/rajaabhaysingh/motorq-assignment.git
```

Navigate to server `cd/server`

```bash
$ npm i
$ npm start
```

In new terminal Navigate to client `cd/client`

```bash
$ npm i
$ npm start
```

On browser
[http://localhost:3000](http://localhost:3000) will open the application
