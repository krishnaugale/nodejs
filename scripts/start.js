/* eslint-disable import/no-dynamic-require */
const services = ['customers', 'recommendations']

services.forEach(service => require(`../src/services/${service}`))
