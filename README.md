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
### Entity-centric service

1. Shipping
```json
{
	"status": <Integer>,
	"fee": <Integer,
	"quantity": <Integer>,
	"customerId": <Integer>,
	"location": <String>,
	"weight": <Float>,
	"destinationAddress": <String>,
	"courierId": <Integer>
}
```

   - Create `POST` `/api/v1/shipping-request`
   - Get `GET` `/api/v1/shipping-request/:id`
   - Tracking `GET` `/api/v1/shipping-request/tracking/:id/`
   - Update `PUT` `/api/v1/shipping-request/:id`
   - Delete `DELETE` `/api/v1/shipping-request/:id`

2. Warehouse
```json
{
	"status": <Integer>,
	"fee": <Integer,
	"quantity": <Integer>,
	"customerId": <Integer>,
	"warehouseId": <Integer>,
	"startDate": <Date>,
	"endDate": <Date>,
}
```

   - Create `POST` `/api/v1/warehousing-request`
   - Get `GET` `/api/v1/warehousing-request/:id`
   - Update `PUT` `/api/v1/warehousing-request/:id`
   - Delete `DELETE` `/api/v1/warehousing-request/:id`
   
3. Customer
```json
{
	"id": <Integer>,
	"name": <String>,
	"customerType": <Integer>,
	"address": <String>
}
```

   - Create `POST` `/api/v1/customer`
   - Get `GET` `/api/v1/customer/:id`
   - Update `PUT` `/api/v1/customer/:id`
   - Delete `DELETE` `/api/v1/customer/:id`
   
4. Courier
```json
{
	"id": <Integer>,
	"name": <String>,
	"courierType": <Integer>
}
```
   - Create `POST` `/api/v1/courier`
   - Get `GET` `/api/v1/courier/:id`
   - Update `PUT` `/api/v1/courier/:id`
   - Delete `DELETE` `/api/v1/courier/:id`

5. Invoice
```json
{
	"id": <Integer>,
	"amount": <Integer>,
	"requestId": <Integer>,
	"customerId": <Integer>
}
```
   - Create `POST` `/api/v1/invoice`
   - Get `GET` `/api/v1/invoice/:id`
   - Update `PUT` `/api/v1/invoice/:id`
