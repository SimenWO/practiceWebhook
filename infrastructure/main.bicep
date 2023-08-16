targetScope = 'subscription'

param location string = deployment().location
param rgname string

resource rg 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: rgname
  location: location
}
