import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Bisection from '../Root/Bisection.js'
import FalsePosition from '../Root/FalsePosition.js'
import OnePointIteration from '../Root/One-PointIteration.js'
import NewtonRaphson from '../Root/Newton-Raphson.js'
import SecantMethod from '../Root/SecantMethod.js'

import Cramer from '../Linear/Cramer.js'
import GaussElimination from '../Linear/GaussElimination.js'
import GaussJordan from '../Linear/GaussJordan.js'
import LU from '../Linear/LU.js'
import Jacobi from '../Linear/Jacobi.js'
import GaussSeidel from '../Linear/GaussSeidel.js'
import ConjugateGradient from '../Linear/ConjugateGradient.js'

import NewtonDivide from '../Interpolation/NewtonDivide.js'
import Lagrange from '../Interpolation/Lagrange.js'
import Spline from '../Interpolation/Spline.js'

import Linear from '../LeastSquare/Linear.js'
import Polynomial from '../LeastSquare/Polynomial.js'
import Multiple from '../LeastSquare/Multiple.js'

import Trapezoidal from '../Integration/Trapezoidal.js'
import Simpson from '../Integration/Simpson.js'

import FWOh from '../Derivative/FWOh.js'
import BWOh from '../Derivative/BWOh.js'
import FWOh2 from '../Derivative/FWOh2.js'
import BWOh2 from '../Derivative/BWOh2.js'
import Oh2 from '../Derivative/Oh2.js'
import Oh4 from '../Derivative/Oh4.js'

export default () => (
  <Switch>
    <Route exact path="/bisection" component={Bisection} />
    <Route exact path="/falseposition" component={FalsePosition} />
    <Route exact path="/onepointiteration" component={OnePointIteration} />
    <Route exact path="/newtonraphson" component={NewtonRaphson} />
    <Route exact path="/secantmethod" component={SecantMethod} />
    
    <Route exact path="/cramer" component={Cramer} />
    <Route exact path="/gausseli" component={GaussElimination} />
    <Route exact path="/gaussjordan" component={GaussJordan} />
    <Route exact path="/lu" component={LU} />
    <Route exact path="/jacobi" component={Jacobi} />
    <Route exact path="/gaussseidel" component={GaussSeidel} />
    <Route exact path="/conjugate" component={ConjugateGradient} />

    <Route exact path="/newtondivide" component={NewtonDivide} />
    <Route exact path="/lagrange" component={Lagrange} />
    <Route exact path="/spline" component={Spline} />

    <Route exact path="/linear" component={Linear} />
    <Route exact path="/polynomial" component={Polynomial} />
    <Route exact path="/multiple" component={Multiple} />

    <Route exact path="/trapezoidal" component={Trapezoidal} />
    <Route exact path="/simpson" component={Simpson} />

    <Route exact path="/fwh" component={FWOh} />
    <Route exact path="/bwh" component={BWOh} />
    <Route exact path="/fwh2" component={FWOh2} />
    <Route exact path="/bwh2" component={BWOh2} />
    <Route exact path="/oh2" component={Oh2} />
    <Route exact path="/oh4" component={Oh4} />

  </Switch>
)