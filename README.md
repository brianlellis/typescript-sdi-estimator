# How to Use?
```shell
$ npm install
$ npm run serve
```

# What is going on?
1. Custom SPA for simplicity
2. Resource estimators
3. API Endpoint Scaffold

## Resource Estimators
### Databases
# MySQL ( Other SQL data types are rough estimates )
These values are done by the GUI
```
table:ROW_COUNT {
  col_name:DATA_TYPE
}
```

## Capacity & Bandwidth
### Bandwidth
```javascript
CalculatorBandwidth.calcWithDownloads();
CalculatorBandwidth.calcWithoutDownloads();
```

### Capacities
#### File
```javascript
CalculatorBandwidth.calcFileStream();
```
## API Endpoint Scaffold
### Global Options
```
use_subdomain: yes|no // will remove /api/ url path prefix
use_domain: yes|no // will remove /api/ url path prefix
allow_all_search: yes|no // makes the id segment of the path optional
api_version: number // updates the version segment of the path
```

### Creation
```
endpoint {
  method: GET|POST|PUT|DELETE
  param: {name}={type} ?:optional
}

EXAMPLE:
users {
  method: get
  param: name=string?
}

TRANSLATES TO:
Methods:
GET

Params:
name=string?
/api/v1/users/{id}
```
# TODO
1. Expand database calcs beyond MySQL relational