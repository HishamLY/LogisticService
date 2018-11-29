# IF44050 PPLBS

## Logistic Service

## 13515023 | 13515069 | 13515123

### Task Service
1. Shipment service
   Servis bertujuan untuk menyediakan `layanan pengiriman barang` dari pelanggan ke suatu alamat tujuan.
   - URL : /engine-rest/message
   - Method : POST
   - Payload :
   ```json
   {
    "messageName": "shipping details",
    "processVariables": {
      "status": {
        "value": <Integer>
       }, "fee": {
        "value": <Integer>
       }, "quantity": {
        "value": <Integer>
       }, "customerId": {
        "value": <Integer>
       }, "location" : {
        "value": <String>
       }, "weight" : {
        "value": <Float>
       }, "destinationAddress" : {	
        "value": <String>
       }, "courierId" : {
        "value": <Integer>
       }
    }
   }
   ```
2. Warehousing service
   Servis bertujuan untuk menyediakan `layanan penyimpanan barang dalam jumlah besar` pada suatu gudang pada pelanggan
   - URL : /engine-rest/message
   - Method : POST
   - Payload :
   ```json
   {
    "messageName": "warehousing details",
    "processVariables": {
      "status": {
        "value": <Integer>
      }, "fee": {
        "value": <Integer>
      }, "quantity": {
        "value": <Integer>
      }, "customerId": {
        "value": <Integer>
      }, "warehouseId": {
        "value": <Integer>
      }, "startDate": {
        "value": <Date>
      }, "endDate": {
        "value": <Date>
      }, "location": {
        "value": <String> - optional
      }, "weight": {
        "value": 1
      }, "destinationAddress": {
        "value": <String> - optional
      }, "courierId": {
        "value": <Integer> - optional
      }
    }
   }
   ```
3. Insurance service
   Servis bertujuan untuk memberikan `layanan asuransi terhadap barang yang dikirimkan atau disimpan` pada gudang oleh pelanggan
   - URL : /engine-rest/message
   - Method : POST
   - Payload :
  ```json
  {
    "messageName": "insurance details",
    "processVariables": {
      "requestId": {
        "value": <Integer>
      }, "checkpoint": {
        "value": <Boolean>
      }, "destination": {
        "value": <Boolean>
      }
    }
  }
  ```
