# How to Use?
```shell
$ npm install
$ npm run serve
```

# What is going on?
1. Custom SPA for simplicity
2. Resource estimators

## Resource Estimators
### Databases
# MySQL ( Expansion to other SQL DBs are rough estimates )
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

# TODO
1. Expand database calcs beyond MySQL relational