import React from 'react'
import {render} from 'react-dom'

import Home from './Home'
import App from './App'
import Students from './Students'
import Parents from './Parents'

render(<Home/>, document.getElementById('app'))
render(<App/>, document.getElementById('app'))
render(<Students/>, document.getElementById('app'))
render(<Parents/>, document.getElementById('app'))
//creando App para montarlo en donde esta el id app