import React from 'react'
import { Grid, GridCell } from 'rmwc/Grid'

import '../scss/components/_hero.scss'

export default ({ title, intro }) => (
  <div className="hero">
    <Grid>
      <GridCell span="12">
        <h1 className="hero__title">{title}</h1>
        <div className="hero__intro">{intro}</div>
      </GridCell>
    </Grid>
  </div>
)
