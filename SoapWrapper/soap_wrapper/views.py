from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from spyne.application import Application
from spyne.decorator import rpc
from spyne.model.primitive import Unicode, Integer, Double, Date
from spyne.protocol.soap import Soap11
from spyne.server.django import DjangoApplication
from spyne.service import ServiceBase

import requests
import json

CAMUNDA_URL = 'http://localhost:8080/engine-rest'

class LogisticService(ServiceBase):
    @rpc(Integer, Integer, Integer, Unicode, Double, Unicode, Integer, _returns=Unicode)
    def create_shipping(ctx, fee, quantity, customerId, location, weight, destinationAddress, courierId):
        payload = {
            'messageName': 'shipping details',
            'processVariables': {
                'fee' : {
                    'value': fee,
                }, 'quantity' : {
                    'value': quantity,
                }, 'customerId': {
                    'value': customerId,
                }, 'location': {
                    'value': location,
                }, 'weight': {
                    'value': weight,
                }, 'destinationAddress': {
                    'value': destinationAddress,
                }, 'courierId': {
                    'value': courierId,
                }
            }
        }
        headers = { 'Content-type': 'application/json' }
        json_payload = json.dumps(payload)
        r = requests.post(
            'http://localhost:8080/engine-rest/message',
            headers = headers,
            data = json_payload
        )
        if (r.status_code == 200 or r.status_code == 204):
            return 'Shipping Created'
        else:
            return 'Failed to Create Shipping'

    @rpc(Integer, Integer, Integer, Integer, Unicode, Unicode, Unicode, Double, Unicode, Integer, _returns=Unicode)
    def create_warehousing(ctx, fee, quantity, customerId, warehouseId, startDate, endDate, location, weight, destinationAddress, courierId):
        payload = {
            'messageName': 'warehousing details',
            'processVariables': {
                'fee' : {
                    'value': fee,
                }, 'quantity' : {
                    'value': quantity,
                }, 'customerId': {
                    'value': customerId,
                }, 'warehouseId': {
                    'value': warehouseId,
                }, 'startDate': {
                    'value': startDate
                }, 'endDate': {
                    'value': endDate
                }, 'location': {
                    'value': location,
                }, 'weight': {
                    'value': weight,
                }, 'destinationAddress': {
                    'value': destinationAddress,
                }, 'courierId': {
                    'value': courierId,
                }
            }
        }
        headers = { 'Content-type': 'application/json' }
        json_payload = json.dumps(payload)
        r = requests.post(
            'http://localhost:8080/engine-rest/message',
            headers = headers,
            data = json_payload
        )
        print(r.status_code)
        if (r.status_code == 200 or r.status_code == 204):
            return 'Warehousing Created'
        else:
            return 'Failed to Create Warehousing'

    @rpc(Integer, _returns=Unicode)
    def create_insurance(ctx, requestId):
        payload = {
            'messageName': 'insurance details',
            'processVariables': {
                'requestId': {
                    'value': requestId,
                }, 'checkpoint': {
                    'value': False,
                }, 'destination': {
                    'value': False
                }
            }
        }
        headers = { 'Content-type': 'application/json' }
        json_payload = json.dumps(payload)
        r = requests.post(
            'http://localhost:8080/engine-rest/message',
            headers = headers,
            data = json_payload
        )

        if (r.status_code == 200 or r.status_code == 204):
            return 'Insurance Created'
        else:
            return 'Failed to Create Insurance'
    

logistic_service = Application(
     [LogisticService], 
    tns='com.if4150.logistic',
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11()
)

django_logistic_service = DjangoApplication(logistic_service)
logistic_service = csrf_exempt(django_logistic_service)


