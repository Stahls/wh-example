### Live Example ###

[Live Example](https://stahls.github.io/wh-example/)


### API DOCUMENTATION ###

## Materials API ##

# Description #

Provides a list of configured materials, rendering colors and production applicability restrictions (e.g, cannotApply, unsupportedSizes, modes).

EndPoint 

`/materials`

# Method #

GET

# Parameters #

None

# Response #

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

## Pricing API for Front End ##

# Description #

Pricing end point used by WH's front end. Will return a pricing structure for a given design described by a cxJob object. This end point is intended to be used by the web application.

# EndPoint #

`/pricing`

# Method #

POST

# Parameters #

`cxJob object`

# Response #

JSON object:

`{"unitPrice": [price] ,"quantity": [quantity], "jobData": [object] }`

## Pricing API for Back End ##

# Description #

Pricing validation end point that should be implemented on the back end to verify that a given order's price is valid. This call should be done on the checkout process, server to server to waranty data's 

# EndPoint #

`/pricing`

# Parameters #

`jobid` as appearing in cxObject

# Response # 

`{"unitPrice": [price] ,"quantity": [quantity] }`

## PDF Export ##

# EndPoint #

`/Doc/ExportWHCxJob`

# Method #

GET

# Parameters # 

Note: this parameters shouldn't use other values than the given on the sample app

UserID: authenticates the request
jobmode: singlepagepdf
SinglePageMargin: 0.25 

# Response #

Binary stream describing a PDF for a given export ID

## External Login ##


