# LIVE EXAMPLE #

[Live Example](https://stahls.github.io/wh-example/)


# API DOCUMENTATION #

## MATERIALS API ##

### Description ###

Provides a list of configured materials, rendering colors and production applicability restrictions (e.g, cannotApply, unsupportedSizes, modes).

### EndPoint ###

`/materials`

### Method ###

GET

### Parameters ###

None

### Response ###

```
[
	{
	"material":[TEXT],
	"materialDescription":[TEXT],
	"cannotApply":[],
	"unsupportedSizes":{"names":[],"numbers":[],"playerPerfect":[]},
	"pricingClass":[ID],"width":14,
	"colors":[
		{"color": [ID] ,"hex": [HEX Value],"colorDescription": [TEXT]},
		...
	]
	...
}
```

## PRICING API / FRONT END ##

### Description ###

Pricing end point used by WH's front end. Will return a pricing structure for a given design described by a cxJob object. This end point is intended to be used by the web application.

### EndPoint ###

`/pricing`

### Method ###

POST

### Parameters ###

`cxJob object`

### Response ###

JSON object:

`{"unitPrice": [price] ,"quantity": [quantity], "jobData": [object] }`

## PRICING API / BACK END ##

### Description ###

Pricing validation end point that should be implemented on the back end to verify that a given order's price is valid. This call should be done on the checkout process, server to server to prevent client side pricing hi-jacking.

### EndPoint ###

`/pricing`

### Parameters ###

`jobid` as appearing in cxObject

### Response ### 

`{"unitPrice": [price] ,"quantity": [quantity] }`

## PDF EXPORT ##

### Description ###

Production PDF export

### EndPoint ###

`/Doc/ExportWHCxJob`

### Method ###

GET

### Parameters ### 

Note: theser parameters shouldn't use other values than the given on the sample app as they will affect export's output.

UserID: authenticates the request
jobmode: singlepagepdf
SinglePageMargin: 0.25 

### Response ###

Binary stream describing a PDF for a given export ID

## JOB DATA OBJECT ##

### EndPoint ###

`/Json/Read`

### Method ###

GET

### Parameters ### 

Id: Containing job's ID

### Response ###

JSON object with job description

## Job object JSON structure example ##

```
{  
   "Json":
   {
    "cxVariableData":[  
      {  
         "cxProperties":{  
            "name":"RIVERSIDE",
            "number":"88"
         },
         "cxQuantity":1
      }
   ],
   "cxJobType":"CMETeamsPlayerPerfect",
   "cxDocumentId":"88d63fe4-0bfc-4151-a152-8e241d84d45f",
   "cxQuantity":1,
   "description":{  
      "firstMaterial":"FLM",
      "firstMaterialDescription":"Thermo-FILM",
      "firstMaterialClass":"A",
      "firstColor":"002",
      "firstColorDescription":"Black",
      "secondMaterial":"NO-COLOR",
      "secondMaterialDescription":"None",
      "secondMaterialClass":"",
      "secondColorDescription":"",
      "fontSize":"2|8",
      "fontName":"Varsity",
      "style":"straight",
      "maxLength":"14",
      "nameHeight":"2",
      "numberHeight":"8",
      "originalTemplate":"team-template",
      "docName":"team-template"
   }
}
```

## EXTERNAL LOGIN ##

### Description ###

Maintains a user's map between CadWorX login system and any external login system by returning a GUID for a specific external/client login.

This User GUID is later used to any cadworx interface.

Should be called server to server, implemented in a server side login process. A secure ID with admin credentials should be provided so this call can be authenticated.

### EndPoint ###

`User/ExternalLogin`

### Method ###

GET

### Parameters ### 

Namespace: "WellingtonHouse"
UserID : Client system's user identifier.  Could be Guid, integer, string etc. 

### Response ###

CadWorX UserID, mapping internally client's UserID

### Sample request ###

URL

```
http://cadworx-dev-edge.azurewebsites.net/Core2/User/ExternalLogin
```

Request Payload

```
{
   "config":"cmestage",
   "model":{
      "NameSpace":"Shopper",
      "UserId":"H0JMX1U08CP48LTSWD9S038UTDFTEKF1-dev"
   },
   "log":{
      "Environment":"local",
      "ServerAccessToken":null
   },
   "ident":{
      "SessionId":"1cd3cb35-6e3a-43ae-98de-94b3d9f8466c",
      "SuperUser":false
   }
}
```

Response

```
{
   "Model":{
      "Namespace":"Shopper",
      "UserId":"02cf1026-e7f5-4439-99b5-980ab19eed16",
      "SessionId":"cddcca77-1d35-4bf4-b5be-3f3fe71bc945"
   },
   "Success":true,
   "Error":null,
   "Log":null
}
```

Model.SessionId in the response is the value that you will use on your URL when embeding app's front end, which maps to Model.UserId from the response.
