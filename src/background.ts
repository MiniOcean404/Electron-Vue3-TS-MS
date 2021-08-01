'use strict'

import { app, protocol } from 'electron'

import './mainProcess/load'
import './mainProcess/ip-main-event'
import './mainProcess/context-bridge'

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])
