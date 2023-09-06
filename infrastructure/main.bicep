targetScope = 'subscription'

param location string = deployment().location
param rgname string
param prefix string = ''

var testname = '${rgname}-${prefix}'

resource rg 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: testname
  location: location
}
